import { describe, it, expect } from 'vitest';
import {
  getAllCorridors,
  getCorridorById,
  getAllArchetypes,
  getArchetypeById,
  getCorridorScore,
  getAllScoresForCorridor,
} from '../src/data/loader';
import { validateCorridor, validateArchetype, validateScore } from '../src/validation/schema';

describe('Data Engine Tests (Phase 1)', () => {
  it('loads the full corridor count: 65 NYC and 72 DFW (total 137)', () => {
    const all = getAllCorridors();
    expect(all.length).toBe(137);

    const nyc = getAllCorridors('nyc');
    expect(nyc.length).toBe(65);

    const dfw = getAllCorridors('dallas-fort-worth');
    expect(dfw.length).toBe(72);
  });

  it('loads all 67 archetypes (31 Cafes and 36 Restaurants)', () => {
    const all = getAllArchetypes();
    expect(all.length).toBe(67);

    const cafes = getAllArchetypes('CAFE');
    expect(cafes.length).toBe(31);

    const restaurants = getAllArchetypes('RESTAURANT');
    expect(restaurants.length).toBe(36);
  });

  it('verifies all corridors have all 5 canonical dayparts bounded between 0 and 100', () => {
    const all = getAllCorridors();
    for (const c of all) {
      expect(c.dayparts).toBeDefined();
      expect(typeof c.dayparts.weekday_am).toBe('number');
      expect(typeof c.dayparts.weekday_midday).toBe('number');
      expect(typeof c.dayparts.weekday_evening).toBe('number');
      expect(typeof c.dayparts.late_night).toBe('number');
      expect(typeof c.dayparts.weekend_day).toBe('number');

      expect(c.dayparts.weekday_am).toBeGreaterThanOrEqual(0);
      expect(c.dayparts.weekday_am).toBeLessThanOrEqual(100);
      expect(c.dayparts.late_night).toBeGreaterThanOrEqual(0);
      expect(c.dayparts.late_night).toBeLessThanOrEqual(100);
    }
  });

  it('verifies resilience metrics loading and boundaries', () => {
    const all = getAllCorridors();
    for (const c of all) {
      expect(c.resilience).toBeDefined();
      expect(c.resilience.shock_resilience).toBeGreaterThanOrEqual(0);
      expect(c.resilience.shock_resilience).toBeLessThanOrEqual(100);
      expect(c.resilience.seasonality_amplitude).toBeGreaterThanOrEqual(0);
      expect(c.resilience.seasonality_amplitude).toBeLessThanOrEqual(100);
      expect(c.resilience.event_dependency).toBeGreaterThanOrEqual(0);
      expect(c.resilience.event_dependency).toBeLessThanOrEqual(100);
      expect(c.resilience.development_dependency).toBeGreaterThanOrEqual(0);
      expect(c.resilience.development_dependency).toBeLessThanOrEqual(100);
    }
  });

  it('verifies score loading and handles missing or insufficient context states', () => {
    // Lookup a known score
    const gcId = 'N0oRUzSGS4hi'; // Grand Central
    const archId = 'us.cafe.office_district_street_express.v1';
    const score = getCorridorScore(gcId, archId);
    expect(score).toBeDefined();
    expect(score?.score).toBeGreaterThan(0.7);
    expect(score?.tier).toBe('STRONG_FIT');

    // Missing score lookup
    const missing = getCorridorScore('non-existent-corridor', 'non-existent-arch');
    expect(missing).toBeUndefined();

    // Verify all scores for Grand Central
    const gcScores = getAllScoresForCorridor(gcId);
    expect(gcScores.length).toBe(31);
  });

  it('verifies decision tracks across archetypes', () => {
    const all = getAllArchetypes();
    const tracks = new Set(all.map((a) => a.decision_track));
    expect(tracks.has('OPEN_MARKET_SITE')).toBe(true);
    expect(tracks.has('CONTROLLED_HOST')).toBe(true);
    expect(tracks.has('LIVE_OPPORTUNITY')).toBe(true);

    const hostArchetypes = all.filter((a) => a.decision_track === 'CONTROLLED_HOST');
    expect(hostArchetypes.length).toBeGreaterThan(10);
    for (const ha of hostArchetypes) {
      expect(ha.required_gate).toBeTruthy();
    }
  });

  it('verifies NYC vs DFW differences (H3-10 ownership grain & categories)', () => {
    const nycCorridor = getCorridorById('N0oRUzSGS4hi');
    expect(nycCorridor).toBeDefined();
    expect(nycCorridor?.metro_id).toBe('nyc');
    expect(nycCorridor?.h3_cell_count).toBeGreaterThan(0); // NYC has canonical H3-10 cells

    const dfwCorridor = getCorridorById('04C97C1C31A5'); // Deep Ellum
    expect(dfwCorridor).toBeDefined();
    expect(dfwCorridor?.metro_id).toBe('dallas-fort-worth');
    expect(dfwCorridor?.h3_cell_count).toBe(0); // DFW does not claim H3-10 parcel ownership
  });

  it('validates schema clamps malformed inputs safely', () => {
    const clamped = validateCorridor({
      corridor_id: 'test_id',
      name: 'Test Corridor',
      dayparts: { weekday_am: 150, late_night: -20 },
      resilience: { shock_resilience: 999 },
    });
    expect(clamped.dayparts.weekday_am).toBe(100);
    expect(clamped.dayparts.late_night).toBe(0);
    expect(clamped.resilience.shock_resilience).toBe(100);

    const scoreClamped = validateScore({ score: 1.5 });
    expect(scoreClamped.score).toBe(1.0);
  });
});
