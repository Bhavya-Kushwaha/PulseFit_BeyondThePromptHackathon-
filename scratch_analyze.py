import json

with open('DALLAS_FORT_WORTH_CORRIDORS.full.json', encoding='utf-8') as f:
    dfw = json.load(f)

print('Some notable DFW corridors:')
for c in dfw['corridors'][:10]:
    print(f"- {c['name']} ({c['corridor_id']}) | District: {c.get('district')} | Dayparts: {c['behavior']['daypart_occasion_density']}")
