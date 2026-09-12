import json
import os

def normalize():
    os.makedirs('src/data/generated', exist_ok=True)
    
    with open('NYC_CORRIDORS.full.json', encoding='utf-8') as f:
        nyc = json.load(f)
    with open('DALLAS_FORT_WORTH_CORRIDORS.full.json', encoding='utf-8') as f:
        dfw = json.load(f)

    # Corridors
    corridors = []
    for c in nyc['corridors']:
        corridors.append({
            'corridor_id': c['corridor_id'],
            'legacy_id': c.get('legacy_corridor_id'),
            'name': c['name'],
            'metro_id': 'nyc',
            'district': c.get('district') or c.get('borough', 'NYC'),
            'level': c.get('level', 'MACRO'),
            'character': c.get('character', ''),
            'dominant_audience': c.get('dominant_audience', []),
            'dayparts': c['behavior']['daypart_occasion_density'],
            'resilience': c['behavior']['resilience'],
            'timing_alpha': c['behavior'].get('timing_alpha', 50),
            'neighborhood_momentum': c['behavior'].get('neighborhood_momentum', 50),
            'crime_safety': c['behavior'].get('crime_safety', {}),
            'transit_car_orientation': c['behavior'].get('transit_car_orientation', 50),
            'whitespace_quality': c['behavior'].get('whitespace_quality', {}),
            'demand_magnets': c.get('demand_magnets', {}),
            'magnet_diversity': c.get('magnet_diversity', 0.5),
            'occasions': c.get('occasions') or [],
            'data_quality': c.get('data_quality', {}),
            'h3_cell_count': c.get('h3_10', {}).get('cell_count', 0),
        })

    for c in dfw['corridors']:
        corridors.append({
            'corridor_id': c['corridor_id'],
            'legacy_id': c.get('legacy_corridor_id'),
            'name': c['name'],
            'metro_id': 'dallas-fort-worth',
            'district': c.get('district', 'Dallas-Fort Worth'),
            'level': c.get('level', 'MACRO'),
            'character': c.get('character', ''),
            'dominant_audience': c.get('dominant_audience', []),
            'dayparts': c['behavior']['daypart_occasion_density'],
            'resilience': c['behavior']['resilience'],
            'timing_alpha': c['behavior'].get('timing_alpha', 50),
            'neighborhood_momentum': c['behavior'].get('neighborhood_momentum', 50),
            'crime_safety': c['behavior'].get('crime_safety', {}),
            'transit_car_orientation': c['behavior'].get('transit_car_orientation', 50),
            'whitespace_quality': c['behavior'].get('whitespace_quality', {}),
            'demand_magnets': c.get('demand_magnets', {}),
            'magnet_diversity': c.get('magnet_diversity', 0.5),
            'occasions': [c['dominant_occasion']] if c.get('dominant_occasion') else [],
            'data_quality': c.get('data_quality', {}),
            'h3_cell_count': 0,
        })

    # Archetypes
    archetypes_map = {}
    for a in nyc['archetypes'] + dfw['archetypes']:
        aid = a['archetype_id']
        if aid not in archetypes_map:
            archetypes_map[aid] = {
                'archetype_id': aid,
                'category_id': a['category_id'],
                'number': a.get('number', 0),
                'name': a['name'],
                'decision_track': a.get('decision_track', 'OPEN_MARKET_SITE'),
                'mission': a.get('mission', ''),
                'decision_object': a.get('decision_object', ''),
                'required_gate': a.get('required_gate', ''),
                'access_contract': a.get('access_contract', ''),
                'primary_signals': a.get('primary_signals', []),
                'supporting_signals': a.get('supporting_signals', []),
                'context_only_signals': a.get('context_only_signals', []),
                'demand_clocks': a.get('demand_clocks', []),
                'prohibited_substitutions': a.get('prohibited_substitutions', []),
                'computation_state': a.get('computation_state', ''),
            }
    archetypes = list(archetypes_map.values())

    # Scores
    scores = {}
    for s in nyc['corridor_archetype_scores']:
        key = f"{s['corridor_id']}__{s['archetype_id']}"
        source_m = s.get('source_match', {})
        score_val = round(s['score'], 4) if s.get('score') is not None else None
        scores[key] = {
            'score': score_val,
            'tier': s.get('tier', 'MODERATE_FIT'),
            'score_kind': s.get('score_kind', 'CONTEXT_PULL'),
            'screening_eligible': bool(s.get('screening_eligible', True)),
            'host_context_present': bool(source_m.get('host_context_present', False)),
            'location_check': source_m.get('location_check', ''),
            'contributions': [],
        }

    for s in dfw['corridor_archetype_scores']:
        key = f"{s['corridor_id']}__{s['archetype_id']}"
        score_val = round(s['score'], 4) if s.get('score') is not None else None
        scores[key] = {
            'score': score_val,
            'tier': s.get('tier', 'MODERATE_FIT'),
            'score_kind': s.get('score_kind', 'DEMAND_CONTEXT'),
            'screening_eligible': bool(s.get('screening_eligible', True)),
            'host_context_present': bool(s.get('host_context_present', False)),
            'location_check': 'PROPERTY_REQUIRED' if s.get('decision_track') == 'OPEN_MARKET_SITE' else 'HOST_AVAILABILITY_REQUIRED',
            'contributions': [{
                'signal': c['signal'],
                'role': c['role'],
                'value': round(c['value'], 4) if c.get('value') is not None else 0.0,
                'effective_weight': round(c['effective_weight'], 4) if c.get('effective_weight') is not None else 0.0,
                'contribution': round(c['contribution'], 4) if c.get('contribution') is not None else 0.0
            } for c in s.get('contributions', [])],
        }

    print(f"Total Corridors normalized: {len(corridors)} (NYC: 65, DFW: 72)")
    print(f"Total Archetypes normalized: {len(archetypes)} (Cafe: 31, Restaurant: 36)")
    print(f"Total Scores indexed: {len(scores)}")

    with open('src/data/generated/corridors.json', 'w', encoding='utf-8') as f:
        json.dump(corridors, f, indent=2)

    with open('src/data/generated/archetypes.json', 'w', encoding='utf-8') as f:
        json.dump(archetypes, f, indent=2)

    with open('src/data/generated/scores.json', 'w', encoding='utf-8') as f:
        json.dump(scores, f, indent=2)

    print("Normalized data saved to src/data/generated/")

if __name__ == '__main__':
    normalize()
