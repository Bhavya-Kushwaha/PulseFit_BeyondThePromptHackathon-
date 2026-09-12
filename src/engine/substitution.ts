import {
  Corridor,
  Archetype,
  AlternativeArchetype,
  RiskTolerance,
  DaypartDensity,
} from '../models/types';
import { getAllArchetypes, getCorridorScore } from '../data/loader';
import { evaluateOperatingFit } from './scoring';

export function findAlternativeArchetypes(
  corridor: Corridor,
  selectedArchetype: Archetype,
  riskTolerance: RiskTolerance = 'MODERATE',
  customDayparts?: DaypartDensity
): AlternativeArchetype[] {
  // Find candidates within same business category (or compatible format)
  const allArchetypes = getAllArchetypes(selectedArchetype.category_id);
  const selectedScoreRec = getCorridorScore(corridor.corridor_id, selectedArchetype.archetype_id);
  const selectedMetrics = evaluateOperatingFit(
    corridor,
    selectedArchetype,
    selectedScoreRec,
    riskTolerance,
    customDayparts
  );

  const alternatives: AlternativeArchetype[] = [];

  for (const candidate of allArchetypes) {
    // Exclude the currently selected archetype
    if (candidate.archetype_id === selectedArchetype.archetype_id) {
      continue;
    }

    const candidateScoreRec = getCorridorScore(corridor.corridor_id, candidate.archetype_id);
    const candidateMetrics = evaluateOperatingFit(
      corridor,
      candidate,
      candidateScoreRec,
      riskTolerance,
      customDayparts
    );

    const isGated =
      candidate.decision_track === 'CONTROLLED_HOST' &&
      !candidateScoreRec?.host_context_present;

    const deltaFit = candidateMetrics.resilienceAdjustedFit - selectedMetrics.resilienceAdjustedFit;

    // Determine why it might be better
    const whyBetter: string[] = [];
    const tradeoffs: string[] = [];

    if (candidateMetrics.resilienceAdjustedFit > selectedMetrics.resilienceAdjustedFit) {
      whyBetter.push(
        `Higher overall operating fit (+${deltaFit} pts) adjusted for corridor fragility.`
      );
    }
    if (candidateMetrics.timeFit > selectedMetrics.timeFit) {
      whyBetter.push(
        `Superior clock alignment (+${candidateMetrics.timeFit - selectedMetrics.timeFit} pts) with corridor activity windows.`
      );
    }
    if (
      candidate.decision_track === 'OPEN_MARKET_SITE' &&
      selectedArchetype.decision_track === 'CONTROLLED_HOST'
    ) {
      whyBetter.push(
        'Open-market storefront without dependence on institutional landlord concessions.'
      );
    }
    if (candidateMetrics.peakDependency < selectedMetrics.peakDependency) {
      whyBetter.push(
        `Lower peak concentration (${candidateMetrics.peakDependency}% vs ${selectedMetrics.peakDependency}%), reducing off-peak rent exposure.`
      );
    }

    // Tradeoffs
    if (candidateMetrics.opportunityFit < selectedMetrics.opportunityFit) {
      tradeoffs.push(
        `Slightly lower raw corridor affinity (-${selectedMetrics.opportunityFit - candidateMetrics.opportunityFit} pts base opportunity).`
      );
    }
    if (isGated) {
      tradeoffs.push(
        `Requires controlled host access: ${candidate.required_gate}.`
      );
    }

    // Is it preferable?
    const isPreferable = !isGated && (deltaFit > 0 || (candidateMetrics.timeFit > selectedMetrics.timeFit + 5 && deltaFit >= -3));

    alternatives.push({
      archetype: candidate,
      baseScore: candidateMetrics.opportunityFit,
      resilienceAdjustedFit: candidateMetrics.resilienceAdjustedFit,
      timeFit: candidateMetrics.timeFit,
      peakDependency: candidateMetrics.peakDependency,
      deltaFit,
      isPreferable,
      whyBetter,
      tradeoffs,
      isGated,
      gateReason: isGated ? candidate.required_gate : undefined,
    });
  }

  // Sort: prefer ungated, then highest adjusted fit
  alternatives.sort((a, b) => {
    if (a.isGated !== b.isGated) return a.isGated ? 1 : -1;
    return b.resilienceAdjustedFit - a.resilienceAdjustedFit;
  });

  return alternatives.slice(0, 4);
}
