import { describe, it, expect } from 'vitest';
import {
  getCorridorById,
  getArchetypeById,
  getCorridorScore,
} from '../src/data/loader';
import {
  evaluateOperatingFit,
  findAlternativeArchetypes,
  runPeakTrapStressTest,
  generateExplainabilityReport,
} from '../src/engine';

describe('Scoring & Engine Tests (Phases 2-5)', () => {
  const grandCentral = getCorridorById('N0oRUzSGS4hi')!;
  const deepEllum = getCorridorById('04C97C1C31A5')!;
  const chelsea = getCorridorById('9EjtYPylWJ6W')!;

  const seatedCafe = getArchetypeById('us.cafe.neighborhood_seated.v1')!;
  const streetExpress = getArchetypeById('us.cafe.office_district_street_express.v1')!;
  const airportConcession = getArchetypeById('us.cafe.airport_terminal_concession.v1')!;

  it('evaluates Grand Central seated cafe and detects the Peak Trap warning', () => {
    const scoreRec = getCorridorScore(grandCentral.corridor_id, seatedCafe.archetype_id);
    const metrics = evaluateOperatingFit(grandCentral, seatedCafe, scoreRec, 'CONSERVATIVE');

    expect(metrics.opportunityFit).toBeGreaterThan(60);
    expect(metrics.dominantDaypart.key).toBe('weekday_am');
    expect(metrics.dominantDaypart.density).toBe(97);
    expect(metrics.weakestDaypart.key).toBe('late_night');
    expect(metrics.weakestDaypart.density).toBe(30);

    // Peak dependency should be high
    expect(metrics.peakDependency).toBeGreaterThanOrEqual(30);
    // Peak trap warning must trigger because spread is 67 and peak dependency is high
    expect(metrics.peakTrapWarning).toBe(true);
    expect(metrics.verdict).toBe('PEAK_TRAP_FRAGILE');
  });

  it('evaluates Chelsea seated cafe and confirms balanced resilience', () => {
    const scoreRec = getCorridorScore(chelsea.corridor_id, seatedCafe.archetype_id);
    const metrics = evaluateOperatingFit(chelsea, seatedCafe, scoreRec, 'MODERATE');

    expect(metrics.peakTrapWarning).toBe(false);
    expect(metrics.occasionBreadth).toBeGreaterThanOrEqual(4);
    expect(metrics.resilienceScore).toBeGreaterThanOrEqual(60);
  });

  it('enforces controlled host gating for airport concession in a non-airport corridor', () => {
    const scoreRec = getCorridorScore(grandCentral.corridor_id, airportConcession.archetype_id);
    const metrics = evaluateOperatingFit(grandCentral, airportConcession, scoreRec, 'MODERATE');

    // Grand Central does not have an airport concession host context
    expect(metrics.verdict).toBe('GATED_OUT');
    expect(metrics.verdictLabel).toContain('Gated Out');
  });

  it('finds superior alternative operating models for Grand Central', () => {
    const alternatives = findAlternativeArchetypes(grandCentral, seatedCafe, 'MODERATE');
    expect(alternatives.length).toBeGreaterThan(0);

    // Office-district street express should rank highly among alternatives
    const expressAlt = alternatives.find((a) => a.archetype.archetype_id === streetExpress.archetype_id);
    expect(expressAlt).toBeDefined();
    expect(expressAlt?.isGated).toBe(false);
    expect(expressAlt?.resilienceAdjustedFit).toBeGreaterThan(0);
  });

  it('simulates a peak trap stress test on Grand Central and demonstrates model pivot', () => {
    const stressResult = runPeakTrapStressTest(grandCentral, seatedCafe, 'CONSERVATIVE', 40);

    expect(stressResult.shockApplied.targetDaypart).toBe('weekday_am');
    expect(stressResult.shockApplied.reductionPercentage).toBe(40);
    expect(stressResult.before.dominantDaypart.key).toBe('weekday_am');
    expect(stressResult.before.dominantDaypart.density).toBe(97);
    // After morning peak shock, dominant shifts to midday (90)
    expect(stressResult.after.dominantDaypart.key).toBe('weekday_midday');
    expect(stressResult.fitDelta).toBeLessThanOrEqual(-4);

    // Surviving alternatives must be available
    expect(stressResult.survivingAlternatives.length).toBeGreaterThan(0);
    expect(stressResult.stressSummary).toContain('contraction');
  });

  it('generates deterministic explainability with all 5 mandatory rationales and caveats', () => {
    const scoreRec = getCorridorScore(grandCentral.corridor_id, seatedCafe.archetype_id);
    const metrics = evaluateOperatingFit(grandCentral, seatedCafe, scoreRec, 'MODERATE');
    const alts = findAlternativeArchetypes(grandCentral, seatedCafe, 'MODERATE');
    const report = generateExplainabilityReport(grandCentral, seatedCafe, metrics, alts);

    expect(report.whyThisModel.length).toBeGreaterThan(0);
    expect(report.whyThisTime.length).toBeGreaterThan(0);
    expect(report.whyThisCorridor.length).toBeGreaterThan(0);
    expect(report.whyNotAlternative.length).toBeGreaterThan(0);
    expect(report.thesisBreakers.length).toBeGreaterThan(0);
    expect(report.dataCaveats.length).toBeGreaterThan(0);

    // Caveat must mention expert estimates
    const auditCaveat = report.dataCaveats.find((c) => c.includes('expert estimates'));
    expect(auditCaveat).toBeDefined();
  });
});
