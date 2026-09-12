# PULSEFIT — UI & Information Architecture Audit
*Date: 2026-09-12 | Focus: Transforming Dense Analytics into an Executive Decision Cockpit*

---

## 1. What is Currently Working (To Preserve)

1. **Deterministic Scoring Engine (`src/engine/`)**:
   - `OpportunityFit`, `TimeFit`, `ResilienceScore`, `PeakDependency`, `OccasionBreadth`, and `ResilienceAdjustedFit` calculate accurately and stably in $<1$ms.
   - All 18 unit tests in `tests/data.test.ts`, `tests/scoring.test.ts`, and `tests/stability.test.ts` pass without errors.
   - Preserved: **Scoring algorithms, data loaders, and validation layers will NOT be modified.**

2. **Core Datasets (`src/data/generated/`)**:
   - All 137 corridors (65 NYC with canonical H3-10, 72 DFW with display envelopes) and 67 archetypes load instantly without network dependencies.
   - Preserved: **Static JSON datasets and foreign-key score mapping.**

3. **Light Color Palette Tokens**:
   - Warm ivory canvas (`#fbfbfa`), pure white cards (`#ffffff`), hairline borders (`#e4e4e7`), and semantic status colors (`#047857` forest green, `#b45309` amber, `#be123c` coral).
   - Preserved: **Core CSS design tokens and typography hierarchy.**

4. **Team Attribution Footer**:
   - Exact names and registration numbers (`Momo Byte`, `BHAVYA KUSHWAHA - 25BSA10157`, `UMANG PATEL - 25MEI10037`, `VIT Bhopal University`).
   - Preserved: **Footer attribution structure.**

---

## 2. What Feels Confusing & Visually Excessive (To Fix)

| Area | Current Issue | Cockpit Solution |
|---|---|---|
| **Navigation** | 4 separate screen tabs (`Build`, `Recommendation`, `Why & Alternatives`, `Stress Test`) feel like a multi-page dashboard. The user has to jump back and forth to connect the story. | **Consolidate into 3 linear guided stages**: `01 Build` $\to$ `02 Diagnose` $\to$ `03 Stress Test`. Merge the explanation & alternatives directly into `02 Diagnose`. |
| **Hero Framing** | "The Peak Trap Stress Simulator" sounds like an internal simulation lab tool rather than answering the operator's urgent question. | **New Framing**: `CAN THIS MODEL SURVIVE?` Subtitle: *"PulseFit tests whether your chosen operating model remains resilient when its strongest demand window weakens."* |
| **Recommendation Screen** | Displays too many KPI cards (6 separate tiles + track governance + banners + multiple lists) creating cognitive clutter. | **Focus on the 3–4 essential decision metrics**: (1) Opportunity Fit, (2) Resilience Score, (3) Peak Risk, (4) Best Operating Windows. Move secondary indices behind *"How this is calculated"*. |
| **Terminology** | Labels like `DAYPART MULTIPLICITY`, `OCCASION BREADTH`, `RESILIENCE-ADJUSTED FIT`, `HOST_AVAILABILITY_REQUIRED` sound like database schemas. | **Human-readable executive phrasing**: `Demand Windows`, `Demand Breadth`, `Resilience Score`, `Host Contract Required`. |
| **Demand Visualization** | 5 discrete cards with individual progress bars require manual scanning to detect where the peak is. | **Single Unified Horizontal Demand Timeline**: Clean bar showing `AM ─── MIDDAY ─── EVENING ─── NIGHT ─── WEEKEND` with direct visual callouts for *Strongest Window* and *Weakest Window*. |
| **Peak Trap Interaction** | Uses three separate buttons (`-20%`, `-35%`, `-50%`) and a shock toggle button. | **Continuous Intuitive Slider**: `0% ───────────●────────── 60% Demand Reduction`. As the slider drags, numbers animate smoothly in real time. |
| **Header Metadata** | Technical bundle IDs (`usa-corridors-20260906-r2`, hashes, counts) sit in top header badges, cluttering the first impression. | **Clean Minimal Header**: Brand + Tagline + 3-Stage Progress Bar. Technical data & methodology moved into an unobtrusive expandable drawer. |
| **Preset Names** | Presets named "Midtown East Peak Trap" or "Deep Ellum Demand Inversion" are technical corridor labels. | **Business Situation Presets**: *"Commuter Peak Trap"*, *"Nightlife Inverted Corridor"*, *"All-Day Resilient Neighborhood"*, *"Suburban Weekend Spike"*. |

---

## 3. Targeted Component Modification Plan

```
src/
  components/
    Header.tsx          -> Simplify: brand + clean 3-step progress bar (01 Build, 02 Diagnose, 03 Stress Test)
    PresetsBar.tsx      -> Human-readable business situation labels
    Footer.tsx          -> Preserved exactly (Momo Byte, Bhavya, Umang, VIT Bhopal)
    MethodologyDrawer.tsx [NEW] -> Clean slide-over / modal for data hashes, scoring weights & H3-10 rules
  views/
    ScreenConceptBuilder.tsx  -> 01 Build: stream-lined 1-click execution
    ScreenRecommendation.tsx    -> 02 Diagnose: single dominant decision card + unified timeline + integrated Why & Alternative
    ScreenStressTest.tsx        -> 03 Stress Test: "Can this model survive?", interactive slider, causal Before->Stress->After
    ScreenExplainability.tsx    -> Merged cleanly into Diagnose & MethodologyDrawer
  App.tsx               -> Guided 3-stage state management (01 Build -> 02 Diagnose -> 03 Stress Test)
  index.css             -> Refined spacing, slider styles, and causal transition animations
```

---

## 4. Features & Components NOT To Be Touched

- **Do NOT touch**: `src/engine/scoring.ts`, `src/engine/substitution.ts`, `src/engine/stressTest.ts` logic or mathematical formulas.
- **Do NOT touch**: `src/data/generated/*.json` or data normalization contracts.
- **Do NOT touch**: Vitest test cases in `tests/*.test.ts` (all 18 must continue to pass 100%).
- **Do NOT touch**: Developer names, registration numbers, or university in `Footer.tsx`.
