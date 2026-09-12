import {
  Corridor,
  Archetype,
  CorridorArchetypeScore,
  RiskTolerance,
  CalculatedFitMetrics,
  DaypartKey,
  DaypartDensity,
} from '../models/types';
import { SCORING_CONFIG, DAYPART_MAPPINGS, DAYPART_LABELS } from '../config/scoringConfig';
import { clamp } from '../validation/schema';

export function calculateResilienceScore(corridor: Corridor): number {
  const r = corridor.resilience;
  const cfg = SCORING_CONFIG.resilience;

  const shockPart = cfg.shock_resilience * r.shock_resilience;
  const seasPart = cfg.seasonality_penalty * (100 - r.seasonality_amplitude);
  const eventPart = cfg.event_dependency_penalty * (100 - r.event_dependency);
  const devPart = cfg.development_dependency_penalty * (100 - r.development_dependency);

  return Math.round(shockPart + seasPart + eventPart + devPart);
}

export function calculateTimeFit(
  archetype: Archetype,
  dayparts: DaypartDensity
): number {
  const targetKeys = new Set<DaypartKey>();
  for (const clock of archetype.demand_clocks) {
    const mapped = DAYPART_MAPPINGS[clock];
    if (mapped) {
      for (const k of mapped) {
        targetKeys.add(k);
      }
    }
  }

  // Fallback to all daytime if unmapped
  if (targetKeys.size === 0) {
    targetKeys.add('weekday_am');
    targetKeys.add('weekday_midday');
    targetKeys.add('weekday_evening');
  }

  let sum = 0;
  for (const k of targetKeys) {
    sum += dayparts[k];
  }
  return Math.round(sum / targetKeys.size);
}

export function calculatePeakDependency(dayparts: DaypartDensity): {
  peakDependency: number;
  dominantDaypart: { key: DaypartKey; label: string; density: number; sharePercent: number };
  weakestDaypart: { key: DaypartKey; label: string; density: number };
} {
  const keys: DaypartKey[] = [
    'weekday_am',
    'weekday_midday',
    'weekday_evening',
    'late_night',
    'weekend_day',
  ];

  let total = 0;
  let maxVal = -1;
  let maxKey: DaypartKey = 'weekday_am';
  let minVal = 999;
  let minKey: DaypartKey = 'late_night';

  for (const k of keys) {
    const val = dayparts[k];
    total += val;
    if (val > maxVal) {
      maxVal = val;
      maxKey = k;
    }
    if (val < minVal) {
      minVal = val;
      minKey = k;
    }
  }

  const safeTotal = total > 0 ? total : 1;
  const share = Math.round((maxVal / safeTotal) * 100);

  return {
    peakDependency: share,
    dominantDaypart: {
      key: maxKey,
      label: DAYPART_LABELS[maxKey],
      density: maxVal,
      sharePercent: share,
    },
    weakestDaypart: {
      key: minKey,
      label: DAYPART_LABELS[minKey],
      density: minVal,
    },
  };
}

export function calculateOccasionBreadth(dayparts: DaypartDensity): number {
  const threshold = SCORING_CONFIG.peakDependency.minDaypartDensityForBreadth;
  let count = 0;
  for (const val of Object.values(dayparts)) {
    if (val >= threshold) {
      count++;
    }
  }
  return count;
}

export function evaluateOperatingFit(
  corridor: Corridor,
  archetype: Archetype,
  scoreRecord: CorridorArchetypeScore | undefined,
  riskTolerance: RiskTolerance = 'MODERATE',
  customDayparts?: DaypartDensity
): CalculatedFitMetrics {
  const activeDayparts = customDayparts || corridor.dayparts;

  // 1. Opportunity Fit (Base score scaled to 100)
  const baseOpportunity = scoreRecord?.score !== null && scoreRecord?.score !== undefined
    ? Math.round(scoreRecord.score * 100)
    : 45; // Default if unmeasured

  // 2. Time Fit
  const timeFit = calculateTimeFit(archetype, activeDayparts);

  // 3. Resilience
  const resilienceScore = calculateResilienceScore(corridor);

  // 4. Peak Dependency & Daypart extrema
  const { peakDependency, dominantDaypart, weakestDaypart } = calculatePeakDependency(activeDayparts);

  // 5. Occasion Breadth
  const occasionBreadth = calculateOccasionBreadth(activeDayparts);

  // 6. Resilience-Adjusted Fit
  const riskCfg = SCORING_CONFIG.riskProfiles[riskTolerance];
  const excessPeak = Math.max(0, peakDependency - SCORING_CONFIG.peakDependency.baselineThreshold);
  const peakPenaltyMultiplier = 1 - (riskCfg.peakPenaltyGamma * (excessPeak / 100));
  const resilienceMultiplier = Math.pow(clamp(resilienceScore / 100, 0.2, 1.0), riskCfg.resilienceBeta);

  // Combined score blending base opportunity with time fit, dampened by volatility
  const blendedBase = (baseOpportunity * 0.70) + (timeFit * 0.30);
  const adjusted = Math.round(clamp(blendedBase * peakPenaltyMultiplier * resilienceMultiplier, 1, 100));

  // Determine Peak Trap Warning: high peak share (>= 30%) and steep daypart spread (>= 40 points)
  const spread = dominantDaypart.density - weakestDaypart.density;
  const peakTrapWarning = peakDependency >= SCORING_CONFIG.peakDependency.severeThreshold && spread >= 35;

  // Track / Host Gating check
  const isGatedOut = archetype.decision_track === 'CONTROLLED_HOST' && !scoreRecord?.host_context_present;
  const isInsufficient = scoreRecord?.tier === 'INSUFFICIENT_CONTEXT';

  // Verdict Assignment
  let verdict: CalculatedFitMetrics['verdict'] = 'VIABLE_CONSTRAINED';
  let verdictLabel = 'Viable With Constraints';
  let verdictDescription = 'Opportunity is supported, but requires operational focus on key demand windows.';

  if (isGatedOut) {
    verdict = 'GATED_OUT';
    verdictLabel = 'Gated Out: Host Required';
    verdictDescription = `Requires a verified institutional or private host contract (${archetype.required_gate}). Not viable as open market.`;
  } else if (isInsufficient) {
    verdict = 'INSUFFICIENT_CONTEXT';
    verdictLabel = 'Insufficient Context';
    verdictDescription = 'Limited corridor audience evidence for this specific concept; higher exploratory risk.';
  } else if (peakTrapWarning && adjusted < riskCfg.optimalThreshold) {
    verdict = 'PEAK_TRAP_FRAGILE';
    verdictLabel = 'Fragile: Peak Trap Detected';
    verdictDescription = `Demand is heavily locked in ${dominantDaypart.label} (${dominantDaypart.sharePercent}% share). Off-peak rent and fixed labor create substantial downside.`;
  } else if (adjusted >= riskCfg.optimalThreshold && !peakTrapWarning) {
    verdict = 'OPTIMAL';
    verdictLabel = 'Optimal Operating Model';
    verdictDescription = 'Robust fit across active dayparts with solid shock resilience and diversified demand.';
  } else if (adjusted < riskCfg.minFitThreshold) {
    verdict = 'PEAK_TRAP_FRAGILE';
    verdictLabel = 'Sub-Optimal Fit';
    verdictDescription = 'Operating model has low alignment with corridor activity timing or exhibits excessive fragility.';
  }

  return {
    opportunityFit: baseOpportunity,
    timeFit,
    resilienceScore,
    peakDependency,
    occasionBreadth,
    resilienceAdjustedFit: adjusted,
    dominantDaypart,
    weakestDaypart,
    peakTrapWarning,
    verdict,
    verdictLabel,
    verdictDescription,
  };
}
