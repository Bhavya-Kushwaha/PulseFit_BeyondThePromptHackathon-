import {
  Corridor,
  Archetype,
  RiskTolerance,
  StressScenarioResult,
  DaypartKey,
  DaypartDensity,
} from '../models/types';
import { getCorridorScore } from '../data/loader';
import { evaluateOperatingFit } from './scoring';
import { findAlternativeArchetypes } from './substitution';
import { DAYPART_LABELS } from '../config/scoringConfig';

export function runPeakTrapStressTest(
  corridor: Corridor,
  archetype: Archetype,
  riskTolerance: RiskTolerance = 'MODERATE',
  reductionPercent: number = 40,
  overrideDaypart?: DaypartKey
): StressScenarioResult {
  const scoreRecord = getCorridorScore(corridor.corridor_id, archetype.archetype_id);

  // 1. Baseline Evaluation
  const beforeMetrics = evaluateOperatingFit(corridor, archetype, scoreRecord, riskTolerance);

  // 2. Identify Target Daypart to stress (dominant by default)
  const targetDaypart = overrideDaypart || beforeMetrics.dominantDaypart.key;
  const targetLabel = DAYPART_LABELS[targetDaypart];

  // 3. Create Shocked Daypart Density
  const multiplier = Math.max(0, 1 - reductionPercent / 100);
  const shockedDayparts: DaypartDensity = {
    ...corridor.dayparts,
    [targetDaypart]: Math.round(corridor.dayparts[targetDaypart] * multiplier),
  };

  // 4. Recalculate After Metrics
  const afterMetrics = evaluateOperatingFit(
    corridor,
    archetype,
    scoreRecord,
    riskTolerance,
    shockedDayparts
  );

  const fitDelta = afterMetrics.resilienceAdjustedFit - beforeMetrics.resilienceAdjustedFit;
  const verdictChanged = beforeMetrics.verdict !== afterMetrics.verdict;

  // 5. Evaluate Alternative Operating Models under the shock
  const survivingAlternatives = findAlternativeArchetypes(
    corridor,
    archetype,
    riskTolerance,
    shockedDayparts
  );

  // 6. Formulate Stress Summary
  let stressSummary = '';
  if (fitDelta <= -12) {
    stressSummary = `Severe vulnerability: A ${reductionPercent}% contraction in ${targetLabel} slashes operating fit by ${Math.abs(
      fitDelta
    )} points. Fixed labor and rental drag make this format unsustainable.`;
  } else if (fitDelta <= -5) {
    stressSummary = `Moderate shock absorption: A ${reductionPercent}% dip in ${targetLabel} dampens fit by ${Math.abs(
      fitDelta
    )} points, but the model remains viable with adjusted staffing.`;
  } else {
    stressSummary = `High structural resilience: Even with a ${reductionPercent}% contraction in ${targetLabel}, the model only loses ${Math.abs(
      fitDelta
    )} points due to balanced multi-daypart coverage.`;
  }

  return {
    shockApplied: {
      targetDaypart,
      targetDaypartLabel: targetLabel,
      reductionPercentage: reductionPercent,
    },
    before: beforeMetrics,
    after: afterMetrics,
    fitDelta,
    verdictChanged,
    survivingAlternatives,
    stressSummary,
  };
}
