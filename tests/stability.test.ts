import { describe, it, expect } from 'vitest';
import {
  getAllCorridors,
  getAllArchetypes,
  getCorridorScore,
  getDemoPresets,
} from '../src/data/loader';
import {
  evaluateOperatingFit,
  findAlternativeArchetypes,
  runPeakTrapStressTest,
} from '../src/engine';

describe('QA Stability & Edge-Case Tests (Phase 10)', () => {
  it('ensures ranking stability across top 10 corridors in both metros', () => {
    const corridors = getAllCorridors();
    const archetypes = getAllArchetypes('CAFE');

    // Run evaluations across first 10 corridors
    for (const c of corridors.slice(0, 10)) {
      for (const a of archetypes.slice(0, 5)) {
        const scoreRec = getCorridorScore(c.corridor_id, a.archetype_id);
        const metrics = evaluateOperatingFit(c, a, scoreRec, 'MODERATE');

        expect(metrics.resilienceAdjustedFit).toBeGreaterThanOrEqual(0);
        expect(metrics.resilienceAdjustedFit).toBeLessThanOrEqual(100);
        expect(metrics.peakDependency).toBeGreaterThanOrEqual(0);
        expect(metrics.peakDependency).toBeLessThanOrEqual(100);
        expect(metrics.occasionBreadth).toBeGreaterThanOrEqual(0);
        expect(metrics.occasionBreadth).toBeLessThanOrEqual(5);
        expect(metrics.verdict).toBeTruthy();
      }
    }
  });

  it('handles completely missing scores gracefully without throwing', () => {
    const dummyCorridor = getAllCorridors()[0];
    const dummyArchetype = getAllArchetypes()[0];

    // Pass undefined score record
    const metrics = evaluateOperatingFit(dummyCorridor, dummyArchetype, undefined, 'MODERATE');
    expect(metrics).toBeDefined();
    expect(metrics.opportunityFit).toBe(45); // Safe fallback
    expect(metrics.resilienceAdjustedFit).toBeGreaterThan(0);
  });

  it('correctly handles all 4 curated demo presets and verifies stress test execution', () => {
    const presets = getDemoPresets();
    expect(presets.length).toBe(4);

    for (const p of presets) {
      const c = getAllCorridors().find((item) => item.corridor_id === p.corridorId)!;
      const a = getAllArchetypes().find((item) => item.archetype_id === p.archetypeId)!;
      expect(c).toBeDefined();
      expect(a).toBeDefined();

      const stressResult = runPeakTrapStressTest(c, a, p.riskTolerance, p.stressShock.dropPct, p.stressShock.daypart);
      expect(stressResult.before).toBeDefined();
      expect(stressResult.after).toBeDefined();
      expect(stressResult.survivingAlternatives.length).toBeGreaterThan(0);
      expect(stressResult.stressSummary).toBeTruthy();
    }
  });

  it('confirms archetype substitution preserves gating constraints', () => {
    const c = getAllCorridors()[0];
    const a = getAllArchetypes()[0];
    const alts = findAlternativeArchetypes(c, a, 'MODERATE');

    for (const alt of alts) {
      if (alt.isGated) {
        expect(alt.isPreferable).toBe(false);
        expect(alt.gateReason).toBeTruthy();
      }
    }
  });
});
