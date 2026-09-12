import rawCorridors from './generated/corridors.json';
import rawArchetypes from './generated/archetypes.json';
import rawScores from './generated/scores.json';
import {
  Corridor,
  Archetype,
  CorridorArchetypeScore,
  MetroId,
  BusinessCategory,
} from '../models/types';
import { validateCorridor, validateArchetype, validateScore } from '../validation/schema';

// Parse and validate loaded records
const corridorsList: Corridor[] = (rawCorridors as unknown[]).map(validateCorridor);
const archetypesList: Archetype[] = (rawArchetypes as unknown[]).map(validateArchetype);
const scoresMap: Record<string, CorridorArchetypeScore> = {};

for (const [key, val] of Object.entries(rawScores as Record<string, unknown>)) {
  scoresMap[key] = validateScore(val);
}

// Index caches
const corridorMap = new Map<string, Corridor>();
for (const c of corridorsList) {
  corridorMap.set(c.corridor_id, c);
}

const archetypeMap = new Map<string, Archetype>();
for (const a of archetypesList) {
  archetypeMap.set(a.archetype_id, a);
}

export function getAllCorridors(metroId?: MetroId): Corridor[] {
  if (!metroId) return corridorsList;
  return corridorsList.filter((c) => c.metro_id === metroId);
}

export function getCorridorById(id: string): Corridor | undefined {
  return corridorMap.get(id);
}

export function getAllArchetypes(category?: BusinessCategory): Archetype[] {
  if (!category) return archetypesList;
  return archetypesList.filter((a) => a.category_id === category);
}

export function getArchetypeById(id: string): Archetype | undefined {
  return archetypeMap.get(id);
}

export function getCorridorScore(
  corridorId: string,
  archetypeId: string
): CorridorArchetypeScore | undefined {
  const key = `${corridorId}__${archetypeId}`;
  return scoresMap[key];
}

export function getAllScoresForCorridor(
  corridorId: string
): Array<{ archetypeId: string; scoreData: CorridorArchetypeScore }> {
  const prefix = `${corridorId}__`;
  const result: Array<{ archetypeId: string; scoreData: CorridorArchetypeScore }> = [];
  for (const [key, val] of Object.entries(scoresMap)) {
    if (key.startsWith(prefix)) {
      const archetypeId = key.substring(prefix.length);
      result.push({ archetypeId, scoreData: val });
    }
  }
  return result;
}

export function getDemoPresets(): Array<{
  id: string;
  name: string;
  tagline: string;
  corridorId: string;
  archetypeId: string;
  riskTolerance: 'CONSERVATIVE' | 'MODERATE' | 'AGGRESSIVE';
  metroId: MetroId;
  category: BusinessCategory;
  stressShock: { daypart: 'weekday_am' | 'weekday_midday' | 'weekday_evening' | 'late_night' | 'weekend_day'; dropPct: number };
}> {
  return [
    {
      id: 'demo-midtown-peak-trap',
      name: 'Commuter peak trap',
      tagline: 'Morning seated cafe exposed to severe 67-point daypart spread & off-peak rent drag',
      corridorId: 'N0oRUzSGS4hi', // Midtown East - Grand Central
      archetypeId: 'us.cafe.neighborhood_seated.v1', // Neighborhood seated coffeehouse
      riskTolerance: 'CONSERVATIVE',
      metroId: 'nyc',
      category: 'CAFE',
      stressShock: { daypart: 'weekday_am', dropPct: 40 },
    },
    {
      id: 'demo-deep-ellum-nightlife',
      name: 'Nightlife inverted corridor',
      tagline: 'Early morning coffee struggling against night/weekend-dominated corridor timing',
      corridorId: '04C97C1C31A5', // Deep Ellum
      archetypeId: 'us.cafe.office_district_coffeehouse.v1',
      riskTolerance: 'MODERATE',
      metroId: 'dallas-fort-worth',
      category: 'CAFE',
      stressShock: { daypart: 'weekend_day', dropPct: 35 },
    },
    {
      id: 'demo-chelsea-resilience',
      name: 'All-day resilient neighborhood',
      tagline: 'Balanced multi-daypart demand yielding high shock resilience under disruption',
      corridorId: '9EjtYPylWJ6W', // Chelsea - Meatpacking
      archetypeId: 'us.cafe.neighborhood_seated.v1',
      riskTolerance: 'MODERATE',
      metroId: 'nyc',
      category: 'CAFE',
      stressShock: { daypart: 'weekday_evening', dropPct: 30 },
    },
    {
      id: 'demo-watters-creek-weekend',
      name: 'Weekend-heavy corridor',
      tagline: 'Extreme weekend concentration (85) vs sluggish weekday daytime (15)',
      corridorId: 'A1582E267364', // Allen - Watters Creek
      archetypeId: 'us.restaurant.neighborhood_casual_full_service.v1',
      riskTolerance: 'CONSERVATIVE',
      metroId: 'dallas-fort-worth',
      category: 'RESTAURANT',
      stressShock: { daypart: 'weekend_day', dropPct: 45 },
    },
  ];
}
