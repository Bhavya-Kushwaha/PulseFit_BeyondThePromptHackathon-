# PULSEFIT Data Contract
*Source of Truth: Active Mongo corridor export bundle `usa-corridors-20260906-r2` (`EXPORT_MANIFEST.json`)*

---

## 1. Executive Summary & Core Dataset Rules

PulseFit operates under strict data fidelity constraints:
1. **No Hallucinated Signals**: Never invent fields, values, customer traffic counts, revenue forecasts, vacancy numbers, or commercial lease availability.
2. **Curated Expert Estimates**: Values tagged as expert estimates (such as `timing_alpha`, `crime_safety`, `whitespace_quality`, and `resilience` metrics) must be surfaced as **expert-derived priors**, not sensor-measured empirical foot-traffic observations.
3. **Geometry Semantics**:
   - **NYC**: Authoritative, canonical, non-overlapping H3 resolution 10 (`H3-10`) polygon ownership (81,767 cells). Every H3-10 cell maps to exactly one corridor context.
   - **DFW**: Exported H3 resolution 9 (`H3-9`) envelopes are **named activity display envelopes** resolved via Voronoi seeds. They **must never** be represented as site boundaries, parcel catchments, or property boundaries.
4. **Scope of Categories**:
   - **NYC**: 31 Café Archetypes across 65 Corridors (60 macro, 5 sub-corridors).
   - **DFW**: 31 Café + 36 Restaurant Archetypes (67 total) across 72 Corridors.

---

## 2. Dataset Schema & Usable Fields

### 2.1 Corridor Records (`corridors[]`)

| Field | Type | Domain / Values | Semantics & Contract Usage |
|---|---|---|---|
| `corridor_id` | String | Base62 alphanumeric (e.g., `N0oRUzSGS4hi`) | Primary unique identifier for the corridor context. |
| `legacy_corridor_id` | String | e.g., `mn.midtown_east_grand_central` | Human-readable identifier indicating borough/county prefix. |
| `name` | String | Corridor Name (e.g., `Midtown East–Grand Central`) | Display label in UI. |
| `metro_id` | String | `'nyc' \| 'dallas-fort-worth'` | Metro categorization. |
| `district` | String | Borough or County (e.g., `Manhattan`, `Dallas Core`) | Sub-metro regional grouping. |
| `level` | String | `'MACRO' \| 'SUB_CORRIDOR'` | Hierarchy level. |
| `character` | String | Narrative text | Contextual urban fabric notes. |
| `dominant_audience` | Array[String] | `['WORKERS', 'COMMUTERS', 'RESIDENTS', 'VISITORS', 'STUDENTS', ...]` | Primary demographic drivers. |
| `behavior.daypart_occasion_density` | Dict[String, Int] | Scale `0–100` across keys: `weekday_am`, `weekday_midday`, `weekday_evening`, `late_night`, `weekend_day` | Relative activity density per time-of-day clock. |
| `behavior.resilience` | Dict[String, Int] | Scale `0–100` across: `shock_resilience`, `seasonality_amplitude`, `event_dependency`, `development_dependency` | Robustness metrics against macroeconomic, seasonal, and localized shocks. |
| `behavior.timing_alpha` | Int | Scale `0–100` | Uncalibrated expert prior indicating early-mover advantage. |
| `behavior.neighborhood_momentum`| Int | Scale `0–100` | Trajectory indicator of local retail activity. |
| `behavior.crime_safety` | Dict[String, Int] | Scale `0–100`: `day`, `evening`, `late_night` | Perception-based safety assessment by daypart. |
| `behavior.path_of_travel_friction`| Int | Scale `0–100` | Physical accessibility/walkway obstruction score. |
| `behavior.transit_car_orientation`| Int | Scale `0–100` (0=Transit/Pedestrian, 100=Car/Drive-through) | Transit modal split indicator. |
| `behavior.whitespace_quality` | Dict[String, Int] | Scale `0–100` (e.g., `cafe`, `fast_casual`, `qsr`) | Expert supply/demand balance judgment. |
| `demand_magnets` | Dict[String, Float] | Scale `0.0–1.0` | Presence of magnets: `transit`, `office`, `retail`, `nightlife`, `education`, etc. |
| `magnet_diversity` | Float | Scale `0.0–1.0` (Shannon/Simpson diversity index) | Dispersion of foot-traffic sources across different use-classes. |
| `occasions` / `dominant_occasion` | List / Dict | Occasion tags (`weekend_leisure`, `neighborhood_routine`, etc.) | Baseline demand occasion anchors. |
| `data_quality` | Dict | Audit metadata specifying derivation method and caveat tags. | Required provenance flags. |

### 2.2 Archetype Records (`archetypes[]`)

| Field | Type | Description / Usage |
|---|---|---|
| `archetype_id` | String | e.g. `us.cafe.office_district_street_express.v1` |
| `category_id` | String | `'CAFE'` or `'RESTAURANT'` |
| `name` | String | e.g., `Office-district street express` |
| `decision_track` | Enum | `'OPEN_MARKET_SITE'`, `'CONTROLLED_HOST'`, `'LIVE_OPPORTUNITY'` |
| `mission` | String | Target customer behavior & use occasion |
| `decision_object` | String | Real estate unit type (e.g., `public storefront`, `leased terminal bay`) |
| `required_gate` | String | Mandatory physical, institutional, or contractual prerequisite |
| `access_contract` | String | e.g., `PUBLIC_PEDESTRIAN_NETWORK`, `AIRPORT_SECURITY_CONTROL` |
| `primary_signals` | Array[String] | Essential demand drivers (e.g. `DAYTIME_WORKER`, `COMMUTER`) |
| `supporting_signals` | Array[String] | Secondary beneficial drivers (e.g. `TRANSIT_PASSENGER`) |
| `context_only_signals`| Array[String] | Contextual indicators without primary weighting |
| `demand_clocks` | Array[String] | Relevant operating windows (e.g., `['AM_COMMUTE', 'MIDDAY']`) |
| `prohibited_substitutions` | Array[String] | Specific logic rules prohibiting improper proxying |

### 2.3 Corridor-Archetype Scores (`corridor_archetype_scores[]`)

| Field | Type | Description / Usage |
|---|---|---|
| `corridor_id` | String | Foreign key to corridor |
| `archetype_id` | String | Foreign key to archetype |
| `score` | Float | Base score in `[0.0, 1.0]` |
| `score_kind` | String | `'CONTEXT_PULL'` (NYC) or `'DEMAND_CONTEXT'` (DFW) |
| `tier` | Enum | `'STRONG_FIT'`, `'MODERATE_FIT'`, `'WEAK_FIT'`, `'GATED_OUT'`, `'INSUFFICIENT_CONTEXT'` |
| `screening_eligible` | Boolean | Whether archetype is viable for general site screening |
| `host_context_present`| Boolean | Whether required host institution exists in corridor |
| `contributions` | Array[Dict] | (DFW) Signal contributions: signal, role, value, weight, contribution |

---

## 3. Derived Metrics (PulseFit Engine)

PulseFit computes 6 core deterministic metrics without external API calls or non-deterministic LLMs:

1. **Opportunity Fit ($O_{fit}$)**:
   Base score from canonical corridor-archetype match adjusted for audience alignment and host viability:
   $$O_{fit} = \text{base\_score} \times 100$$
2. **Time Fit ($T_{fit}$)**:
   Weighted density of demand during the archetype's specific active `demand_clocks` mapped onto corridor `daypart_occasion_density`.
3. **Resilience Score ($R_{score}$)**:
   Composite index reflecting shock absorption and low volatility:
   $$R_{score} = 0.45 \times \text{shock\_resilience} + 0.25 \times (100 - \text{seasonality}) + 0.15 \times (100 - \text{event\_dep}) + 0.15 \times (100 - \text{dev\_dep})$$
4. **Peak Dependency ($P_{dep}$)**:
   Gini or max-share concentration metric indicating what percentage of active opportunity is locked in a single daypart window:
   $$P_{dep} = \frac{\max(D_{dayparts})}{\sum(D_{dayparts})}$$
5. **Occasion Breadth ($B_{occ}$)**:
   Normalized count of active dayparts that exceed a minimum viability threshold ($D_i \ge 40$).
6. **Resilience-Adjusted Operating Fit ($F_{adj}$)**:
   The headline recommendation metric. Discounts high baseline opportunity if the corridor is fragile or excessively peak-dependent:
   $$F_{adj} = O_{fit} \times \left(1 - \alpha \cdot \frac{P_{dep} - P_{median}}{100}\right) \times \left(\frac{R_{score}}{100}\right)^\beta$$

---

## 4. Unusable, Caveated, & Misleading Fields

| Field Name | Caveat in Source Metadata | PulseFit Strict Rule |
|---|---|---|
| `spending_power` | Null across NYC corridor records; uncalibrated in DFW | **Do not display as median income or spending forecast**. Use qualitative demographic labels instead. |
| `whitespace_quality` | Metadata explicitly states: `EXPERT_SUPPLY_DEMAND_JUDGMENT_NOT_MEASURED_SATURATION` | **Never display as "vacancy rate" or "unmet retail capacity"**. Label strictly as "Expert Whitespace Indicator". |
| `crime_safety` | Metadata explicitly states: `PERCEPTION_ESTIMATE_NOT_INCIDENT_DERIVED` | **Never cite as "crime statistics" or "police incident counts"**. Display as "Perceived Environment Rating". |
| `timing_alpha` | Metadata states: `UNCALIBRATED_EXPERT_PRIOR` | **Never represent as a guaranteed first-mover ROI multiplier**. |
| DFW H3-9 Geometry | Metadata states: `DISPLAY_ENVELOPE_NOT_CANONICAL_OWNERSHIP` | **Never present as parcel catchment or property boundary**. |

---

## 5. Exact Dataset Terminology Glossary

- **Decision Track**: The governance environment of the retail location.
  - `OPEN_MARKET_SITE`: Public storefront on a public right-of-way.
  - `CONTROLLED_HOST`: Leased footprint inside a private or institutional host (e.g. transit terminal, university, hospital, office lobby).
  - `LIVE_OPPORTUNITY`: Event- or concession-contract-dependent site (e.g., arena, mobile cart, pop-up).
- **Required Gate**: The mandatory operational or legal prerequisite without which the archetype cannot exist.
- **Demand Clock**: The operational window (`AM_COMMUTE`, `MIDDAY`, `EVENING`, `LATE_NIGHT`, `WEEKEND`) during which the concept gathers transactions.
- **Peak Trap**: A scenario where an archetype achieves an superficially high opportunity score driven by a single narrow demand spike, but suffers fatal economic drag during off-peak windows or during a demand disruption.
