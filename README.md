# PULSEFIT — Commercial Decision Cockpit

> **“Choose the operating model, not just the location.”**  
> Built for the **BeyondThePrompt Hackathon** by **Momo Byte**.

---

## Executive Summary

Most location intelligence platforms fail operators by answering the wrong question: *“Is this a busy street?”*

A street can have massive foot traffic and still bankrupt a business if the operator selects the wrong operating model for the corridor's specific diurnal demand rhythm. **PULSEFIT** is a resilience-aware commercial strategy engine for cafés and restaurants. 

Instead of generating speculative revenue numbers or generic map heatmaps, PulseFit tests whether your chosen format can survive when its primary demand window weakens.

---

## Team Details — Momo Byte

| Role | Developer | Registration No. | Institution | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Full-Stack & Product Architecture** | **BHAVYA KUSHWAHA** | `25BSA10157` | VIT Bhopal University | Student Developer |
| **Scoring Engine & Strategy Analytics** | **UMANG PATEL** | `25MEI10037` | VIT Bhopal University | Student Developer |

---

## Core Product Capabilities

### 1. Guided 3-Stage Decision Cockpit
- **`01 Build`**: Configure location (NYC Canonical H3-10 or DFW Activity Envelopes), business category, operating format archetype, and risk profile. Includes business presets (*Weekend-heavy corridor*, *Commuter peak trap*, *Nightlife inverted corridor*, *All-day resilient neighborhood*).
- **`02 Diagnose`**: The dominant **PULSEFIT DECISION** verdict. Displays:
  - **Opportunity Fit** (Base location & audience alignment / 100)
  - **Resilience Score** (Shock absorption against diurnal disruption / 100)
  - **Peak Risk** (Concentration exposure in the busiest window)
  - **Unified Demand Timeline** (Horizontal bar sequence across `AM`, `Midday`, `Evening`, `Late Night`, and `Weekend`)
  - **Why This Works vs. Watch** (Core strategic strengths and risk triggers)
  - **Archetype Substitution Insight**: Identifies when *“Your corridor is viable. Your format is the weak link.”* with 1-click model pivot.
- **`03 Stress Test (Peak Trap)`**: **CAN THIS MODEL SURVIVE?**
  - Continuous demand reduction slider (`0%` to `60%`) targeting the dominant clock.
  - **Dynamic Demand Curve Metaphor**: Vector visualization where the concentrated peak compresses under shock while the resilient multi-peak model remains buffered.
  - **Before $\to$ Stress $\to$ After Causal Grid**: Live score transition with immediate strategic pivot recommendation.

### 2. Editorial Visual System & Custom Illustrations
- **Light Theme Only**: Warm ivory canvas (`#fbfbfa`), pure white cards (`#ffffff`), hairline borders (`#e4e4e7`), and charcoal typography (`#09090b`).
- **Hero Corridor Adaptive Model**: Custom vector illustration representing urban corridor streetscapes, fluctuating demand waveforms, and stable operating pathways.
- **Archetype Iconography**: Line-based, minimal vector icons for Neighborhood, Destination, Workplace Express, Event Concession, and All-Day Bistro formats.
- **Zero Hallucination Guarantee**: Data confidence indicator and transparent Data & Methodology drawer.

---

## Dataset Ingestion & Lineage

PulseFit is strictly grounded in the official snapshot bundle `usa-corridors-20260906-r2`:

- **65 New York City Corridors**: Canonical, non-overlapping H3-10 ownership (81,767 exact cells).
- **72 Dallas–Fort Worth Corridors**: Activity display envelopes (H3-9 Voronoi projections).
- **67 Archetypes**: 31 café formats + 36 restaurant formats across 3 decision tracks (`OPEN_MARKET_SITE`, `CONTROLLED_HOST`, `LIVE_OPPORTUNITY`).
- **6,684 Corridor/Archetype Scores**: Ingested and evaluated with zero synthetic data fabrication.

---

## Technical Stack

- **Frontend**: React 18, TypeScript, Vite, Vanilla CSS design tokens.
- **Engine**: 100% deterministic TypeScript scoring algorithms (`src/engine/`):
  - `scoring.ts`: Calculates Opportunity Fit, Time Fit, and Resilience Scores.
  - `substitution.ts`: Ranks viable alternative archetypes.
  - `stressTest.ts`: Models clock contraction and pivot viability.
  - `explainability.ts`: Synthesizes operator-grade rationales.
- **Testing**: Vitest automated testing suite with 18 comprehensive tests covering data contracts, scoring bounds, and stress invariants.

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation & Run Locally

```bash
# Clone the repository
git clone https://github.com/Bhavya-Kushwaha/PulseFit_BeyondThePromptHackathon-.git
cd PulseFit_BeyondThePromptHackathon-

# Install dependencies
npm install

# Start Vite local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run Automated Tests

```bash
npm run test
```

### Build for Production

```bash
npm run build
```

---

## Documentation Index

- [`docs/UI_AUDIT.md`](docs/UI_AUDIT.md) — Pre-implementation audit and design evolution.
- [`docs/DATA_CONTRACT.md`](docs/DATA_CONTRACT.md) — Snapshot schema, field derivations, and H3 geometry contracts.
- [`docs/PRODUCT_SPEC.md`](docs/PRODUCT_SPEC.md) — Mathematical formulas for Opportunity Fit, Resilience, and Peak Dependency.
- [`docs/DEMO_SCENARIO.md`](docs/DEMO_SCENARIO.md) — 90–120 second judging presentation walkthrough.
- [`docs/QA_REPORT.md`](docs/QA_REPORT.md) — Automated testing matrix and verification results.
- [`docs/JUDGING_ALIGNMENT.md`](docs/JUDGING_ALIGNMENT.md) — Evaluation rubric mapping.

---

## License

MIT License. Developed for the BeyondThePrompt Hackathon by Momo Byte.
