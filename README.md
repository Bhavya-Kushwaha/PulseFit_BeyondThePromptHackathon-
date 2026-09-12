<div align="center">

# ⚡ PULSEFIT
### Commercial Decision Cockpit

**“Choose the operating model, not just the location.”**

[![BeyondThePrompt](https://img.shields.io/badge/BeyondThePrompt-Hackathon-7c3aed?style=for-the-badge)](https://github.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=111827)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-Fast-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Tests-18-6E9F18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)
[![License](https://img.shields.io/badge/License-MIT-111827?style=flat-square)](#-license)

**A resilience-aware strategy engine for cafés and restaurants.**

Instead of asking **“Is this a busy street?”**, PULSEFIT asks:

> ### **“Can this operating model survive when its primary demand window weakens?”**

<br>

[🚀 Live Demo](https://pulse-fit-beyond-the-prompt-hackath.vercel.app/) •
[📦 GitHub](https://github.com/Bhavya-Kushwaha/PulseFit_BeyondThePromptHackathon-) •
[📚 Documentation](#-documentation)

</div>

---

## 🧭 What is PULSEFIT?

Most location-intelligence products focus on **traffic, footfall and generic heatmaps**.

But a busy corridor does **not automatically mean a resilient business**.

PULSEFIT is a **commercial decision cockpit** that evaluates the relationship between:

```text
📍 LOCATION
     ↓
👥 AUDIENCE
     ↓
🏪 OPERATING MODEL
     ↓
⏰ DEMAND RHYTHM
     ↓
⚠️ CONCENTRATION RISK
     ↓
🧪 STRESS TEST
     ↓
🎯 STRATEGIC DECISION
```

The system helps operators understand whether the **corridor is the problem — or the chosen format is the weak link.**

---

# ✨ Product Highlights

| Capability | What it does |
|---|---|
| 🧩 **Guided Decision Cockpit** | Build → Diagnose → Stress Test |
| 📊 **Opportunity Fit** | Measures location + audience alignment |
| 🛡️ **Resilience Score** | Measures ability to absorb demand disruption |
| ⚠️ **Peak Risk** | Detects excessive dependence on the busiest window |
| ⏱️ **Demand Timeline** | AM → Midday → Evening → Late Night → Weekend |
| 🔄 **Archetype Substitution** | Finds stronger operating-model alternatives |
| 🧪 **Peak Trap Stress Test** | Simulates 0–60% demand reduction |
| 💡 **Explainable Decisions** | Shows “Why This Works” and “Watch” signals |
| 🚫 **No Synthetic Data** | Uses the official snapshot bundle only |

---

# 🎛️ The 3-Stage Decision Cockpit

### `01` 🏗️ BUILD

Configure the decision.

- 📍 Location
- ☕ Business category
- 🏪 Operating format
- 🎯 Risk profile
- 🧠 Business presets

**Presets include:**

`Weekend-heavy corridor` · `Commuter peak trap` · `Nightlife inverted corridor` · `All-day resilient neighborhood`

---

### `02` 🔎 DIAGNOSE

PULSEFIT converts the configuration into an operator-grade decision.

```text
┌─────────────────────────────────────────────┐
│              PULSEFIT DECISION              │
├─────────────────────────────────────────────┤
│ Opportunity Fit        █████████░  90/100   │
│ Resilience Score       ████████░░  82/100   │
│ Peak Risk              ██████░░░░  61/100   │
├─────────────────────────────────────────────┤
│ AM → MIDDAY → EVENING → LATE NIGHT → WEEKEND│
└─────────────────────────────────────────────┘
```

The diagnosis answers:

- **Why this works**
- **What to watch**
- **Where demand is concentrated**
- **Whether the operating format is the weak link**
- **Which alternative archetype could perform better**

---

### `03` 🧪 STRESS TEST — “CAN THIS MODEL SURVIVE?”

The **Peak Trap** stress test continuously reduces demand in the dominant clock window.

```text
Normal Demand
████████████████████████████████

        ↓  Demand Shock

Stressed Demand
██████████████████░░░░░░░░░░░░░

        ↓

Strategic Pivot
🔄 Select a more resilient operating model
```

The engine evaluates the transition:

**BEFORE → STRESS → AFTER**

and immediately recommends a strategic pivot when the selected model becomes fragile.

---

# 🧠 Decision Intelligence

PULSEFIT uses deterministic scoring rather than speculative revenue forecasting.

### Core signals

```text
Opportunity Fit
      +
Time Fit
      +
Resilience
      +
Peak Dependency
      ↓
PULSEFIT DECISION
```

### The key idea

> **A viable corridor can still have the wrong operating model.**

This is the central strategic insight behind PULSEFIT.

---

# 🗺️ Data Foundation

PULSEFIT is grounded in the official snapshot bundle:

### `usa-corridors-20260906-r2`

| Dataset | Coverage |
|---|---:|
| 🗽 NYC Corridors | **65** |
| 🌆 Dallas–Fort Worth Corridors | **72** |
| 🏪 Archetypes | **67** |
| ☕ Café Formats | **31** |
| 🍽️ Restaurant Formats | **36** |
| 📊 Corridor/Archetype Scores | **6,684** |
| 🧱 NYC H3-10 Exact Cells | **81,767** |

### Data integrity

**Zero synthetic data fabrication.**

The product exposes data confidence and provides a transparent methodology drawer so operators can understand **where the decision came from.**

---

# 🎨 Visual Design System

PULSEFIT follows an editorial, premium decision-product aesthetic.

```text
┌─────────────────────────────────────────────────┐
│                 PULSEFIT                        │
│          Commercial Decision Cockpit            │
│                                                 │
│  Warm Ivory Canvas       #FBFBFA                │
│  White Cards             #FFFFFF                │
│  Hairline Borders        #E4E4E7                │
│  Charcoal Typography     #09090B                │
│                                                 │
│  Minimal vectors • Clean hierarchy • Data-first │
└─────────────────────────────────────────────────┘
```

### Visual language

- ✦ Editorial dashboard aesthetic
- 📈 Demand waveform visualizations
- 🏙️ Adaptive urban corridor illustration
- 🧩 Minimal archetype iconography
- 📐 Clean information hierarchy
- 🔍 Transparent explainability
- ☀️ Light theme only

---

# 🏗️ Architecture

```text
                    ┌────────────────────┐
                    │    PULSEFIT UI     │
                    │ React + TypeScript │
                    └─────────┬──────────┘
                              │
                              ▼
              ┌───────────────────────────────┐
              │     Decision Engine           │
              ├───────────────────────────────┤
              │ scoring.ts                    │
              │ substitution.ts               │
              │ stressTest.ts                 │
              │ explainability.ts             │
              └──────────────┬────────────────┘
                             │
                             ▼
                  ┌────────────────────┐
                  │ Official Snapshot  │
                  │ usa-corridors...   │
                  └────────────────────┘
```

### Engine modules

| Module | Responsibility |
|---|---|
| `scoring.ts` | Opportunity Fit, Time Fit & Resilience |
| `substitution.ts` | Alternative archetype ranking |
| `stressTest.ts` | Demand contraction & pivot viability |
| `explainability.ts` | Operator-grade strategic rationales |

---

# 💻 Technology Stack

<div align="center">

| Layer | Technology |
|---|---|
| **Frontend** | React 18 |
| **Language** | TypeScript |
| **Build Tool** | Vite |
| **Styling** | Vanilla CSS + Design Tokens |
| **Scoring Engine** | Deterministic TypeScript |
| **Testing** | Vitest |
| **Data / Geometry** | H3-based corridor datasets |

</div>

---

# 🚀 Getting Started

## Prerequisites

- **Node.js 18+**
- **npm**

## Installation

```bash
git clone https://github.com/Bhavya-Kushwaha/PulseFit_BeyondThePromptHackathon-.git

cd PulseFit_BeyondThePromptHackathon-

npm install
```

## Start Development Server

```bash
npm run dev
```

Then open:

**https://pulse-fit-beyond-the-prompt-hackath.vercel.app/**

## Run Tests

```bash
npm run test
```

## Production Build

```bash
npm run build
```

---

# 🧪 Quality & Testing

PULSEFIT includes an automated Vitest suite with **18 comprehensive tests**.

Testing focuses on:

```text
✓ Data contracts
✓ Scoring bounds
✓ Deterministic calculations
✓ Stress-test invariants
✓ Decision-engine behaviour
✓ Archetype substitution logic
```

The objective is to keep the decision engine **predictable, explainable and reproducible.**

---

# 📚 Documentation

| Document | Purpose |
|---|---|
| `docs/UI_AUDIT.md` | UI audit & design evolution |
| `docs/DATA_CONTRACT.md` | Snapshot schema & H3 geometry contracts |
| `docs/PRODUCT_SPEC.md` | Mathematical scoring formulas |
| `docs/DEMO_SCENARIO.md` | 90–120 sec judging walkthrough |
| `docs/QA_REPORT.md` | Testing & verification matrix |
| `docs/JUDGING_ALIGNMENT.md` | Hackathon rubric alignment |

---

# 👥 Team — Momo Byte

<table>
<tr>
<th>Role</th>
<th>Developer</th>
<th>Registration No.</th>
<th>Institution</th>
</tr>

<tr>
<td><b>Full-Stack & Product Architecture</b></td>
<td><b>BHAVYA KUSHWAHA</b></td>
<td><code>25BSA10157</code></td>
<td>VIT Bhopal University</td>
</tr>

<tr>
<td><b>UI, System Design, Scoring Engine & Strategy Analytics</b></td>
<td><b>UMANG PATEL</b></td>
<td><code>25MEI10037</code></td>
<td>VIT Bhopal University</td>
</tr>
</table>

---

# 🏆 BeyondThePrompt Hackathon

PULSEFIT was built for the **BeyondThePrompt Hackathon** by **Momo Byte**.

### Our thesis

> **Don't just find a busy location. Find the operating model that can survive it.**

```text
LOCATION
   │
   ▼
DEMAND RHYTHM
   │
   ▼
OPERATING MODEL
   │
   ▼
RESILIENCE
   │
   ▼
BETTER COMMERCIAL DECISION
```

---

# 🌐 Live Product

<div align="center">

### 🚀 Try PULSEFIT

**[pulse-fit-beyond-the-prompt-hackath.vercel.app](https://pulse-fit-beyond-the-prompt-hackath.vercel.app/)**

<br>

**Build → Diagnose → Stress Test → Decide**

</div>

---

# 📄 License

This project is released under the **MIT License**.

Developed with ❤️ by **Momo Byte** for the **BeyondThePrompt Hackathon**.

---

<div align="center">

## ⚡ PULSEFIT

**Commercial Decision Cockpit**

*Choose the operating model, not just the location.*

<br>

`Built with React • TypeScript • Deterministic Decision Intelligence`

</div>
