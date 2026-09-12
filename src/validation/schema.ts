import { Corridor, Archetype, CorridorArchetypeScore, DaypartDensity, ResilienceMetrics } from '../models/types';

export function clamp(val: number, min: number, max: number): number {
  if (isNaN(val) || val === null || val === undefined) return min;
  return Math.min(Math.max(val, min), max);
}

export function validateDayparts(dayparts: Partial<DaypartDensity>): DaypartDensity {
  return {
    weekday_am: clamp(dayparts?.weekday_am ?? 50, 0, 100),
    weekday_midday: clamp(dayparts?.weekday_midday ?? 50, 0, 100),
    weekday_evening: clamp(dayparts?.weekday_evening ?? 50, 0, 100),
    late_night: clamp(dayparts?.late_night ?? 20, 0, 100),
    weekend_day: clamp(dayparts?.weekend_day ?? 50, 0, 100),
  };
}

export function validateResilience(res: Partial<ResilienceMetrics>): ResilienceMetrics {
  return {
    shock_resilience: clamp(res?.shock_resilience ?? 50, 0, 100),
    seasonality_amplitude: clamp(res?.seasonality_amplitude ?? 30, 0, 100),
    event_dependency: clamp(res?.event_dependency ?? 20, 0, 100),
    development_dependency: clamp(res?.development_dependency ?? 30, 0, 100),
  };
}

export function validateCorridor(c: unknown): Corridor {
  if (!c || typeof c !== 'object') {
    throw new Error('Invalid corridor record: must be an object');
  }
  const rec = c as Record<string, any>;
  if (!rec.corridor_id || typeof rec.corridor_id !== 'string') {
    throw new Error('Corridor missing valid corridor_id');
  }
  if (!rec.name || typeof rec.name !== 'string') {
    throw new Error(`Corridor ${rec.corridor_id} missing name`);
  }

  return {
    corridor_id: rec.corridor_id,
    legacy_id: rec.legacy_id,
    name: rec.name,
    metro_id: rec.metro_id === 'dallas-fort-worth' ? 'dallas-fort-worth' : 'nyc',
    district: rec.district || 'Unassigned',
    level: rec.level || 'MACRO',
    character: rec.character || '',
    dominant_audience: Array.isArray(rec.dominant_audience) ? rec.dominant_audience : [],
    dayparts: validateDayparts(rec.dayparts),
    resilience: validateResilience(rec.resilience),
    timing_alpha: clamp(rec.timing_alpha ?? 50, 0, 100),
    neighborhood_momentum: clamp(rec.neighborhood_momentum ?? 50, 0, 100),
    crime_safety: rec.crime_safety || {},
    transit_car_orientation: clamp(rec.transit_car_orientation ?? 50, 0, 100),
    whitespace_quality: rec.whitespace_quality || {},
    demand_magnets: rec.demand_magnets || {},
    magnet_diversity: clamp(rec.magnet_diversity ?? 0.5, 0, 1),
    occasions: Array.isArray(rec.occasions) ? rec.occasions : [],
    data_quality: rec.data_quality || {},
    h3_cell_count: rec.h3_cell_count ?? 0,
  };
}

export function validateArchetype(a: unknown): Archetype {
  if (!a || typeof a !== 'object') {
    throw new Error('Invalid archetype record: must be an object');
  }
  const rec = a as Record<string, any>;
  if (!rec.archetype_id || typeof rec.archetype_id !== 'string') {
    throw new Error('Archetype missing valid archetype_id');
  }
  if (!rec.name || typeof rec.name !== 'string') {
    throw new Error(`Archetype ${rec.archetype_id} missing name`);
  }

  return {
    archetype_id: rec.archetype_id,
    category_id: rec.category_id === 'RESTAURANT' ? 'RESTAURANT' : 'CAFE',
    number: rec.number ?? 0,
    name: rec.name,
    decision_track: ['OPEN_MARKET_SITE', 'CONTROLLED_HOST', 'LIVE_OPPORTUNITY'].includes(rec.decision_track)
      ? rec.decision_track
      : 'OPEN_MARKET_SITE',
    mission: rec.mission || '',
    decision_object: rec.decision_object || '',
    required_gate: rec.required_gate || '',
    access_contract: rec.access_contract || '',
    primary_signals: Array.isArray(rec.primary_signals) ? rec.primary_signals : [],
    supporting_signals: Array.isArray(rec.supporting_signals) ? rec.supporting_signals : [],
    context_only_signals: Array.isArray(rec.context_only_signals) ? rec.context_only_signals : [],
    demand_clocks: Array.isArray(rec.demand_clocks) ? rec.demand_clocks : [],
    prohibited_substitutions: Array.isArray(rec.prohibited_substitutions) ? rec.prohibited_substitutions : [],
    computation_state: rec.computation_state || '',
  };
}

export function validateScore(s: unknown): CorridorArchetypeScore {
  if (!s || typeof s !== 'object') {
    return {
      score: null,
      tier: 'INSUFFICIENT_CONTEXT',
      score_kind: 'CONTEXT_PULL',
      screening_eligible: false,
      host_context_present: false,
      location_check: 'UNKNOWN',
      contributions: [],
    };
  }
  const rec = s as Record<string, any>;
  const rawScore = rec.score !== null && rec.score !== undefined ? Number(rec.score) : null;
  const validScore = rawScore !== null && !isNaN(rawScore) ? clamp(rawScore, 0, 1) : null;

  return {
    score: validScore,
    tier: rec.tier || (validScore === null ? 'INSUFFICIENT_CONTEXT' : 'MODERATE_FIT'),
    score_kind: rec.score_kind || 'CONTEXT_PULL',
    screening_eligible: rec.screening_eligible !== false,
    host_context_present: Boolean(rec.host_context_present),
    location_check: rec.location_check || '',
    contributions: Array.isArray(rec.contributions) ? rec.contributions : [],
  };
}
