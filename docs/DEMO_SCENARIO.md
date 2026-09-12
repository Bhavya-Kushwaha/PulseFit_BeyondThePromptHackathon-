# PULSEFIT Demo Script & Hackathon Scenario Guide
*Target Duration: 90–120 Seconds | Primary Persona: Restaurant / Cafe Strategy Operator*

---

## 1. The Core Demo Narrative (The 90-Second Walkthrough)

### 0:00 – 0:15 | The Hook & Differentiator
- **Speaker**:
  > “Every commercial real estate tool tries to answer: *‘Which corridor has the most foot traffic?’*
  > But that question bankrupts operators. In food & beverage, prime foot traffic at the wrong time or in the wrong format is financial suicide.
  > **PulseFit asks the real question: ‘What format should I operate here, when does it make money, and how fragile is that strategy?’”**

### 0:15 – 0:35 | Concept Evaluation & Peak Trap Detection
- **Action**: Click the **“Midtown East Peak Trap”** preset (Grand Central corridor, *Neighborhood Seated Coffeehouse*, Conservative Risk).
- **Speaker**:
  > “Here is Grand Central. An operator wants to open a full-service, 7-day seated neighborhood coffeehouse.
  > A broker points to the morning commuter rush. And indeed, PulseFit gives it an Opportunity Score of 66.
  > But look at the **Verdict Banner**: *Fragile — Peak Trap Detected*.
  > PulseFit breaks down the 5 canonical dayparts: Weekday morning density is a staggering **97/100**, but late night plummets to **30**, and weekend daytime is only **45**.
  > Over **31% of the entire week's opportunity** is locked into a single morning rush. A seated concept pays full rent and labor 7 days a week for a 2-hour window.”

### 0:35 – 0:55 | The Hero Moment: The Peak Trap Stress Test
- **Action**: Navigate to **Tab 4: Peak Trap Simulator** or click *“Stress Test Dominant Peak Window”*.
- **Speaker**:
  > “Now let's stress test this thesis. What happens when hybrid work or transit friction reduces that morning peak by 40%?
  > With one click:
  > **Before**: Resilience-adjusted fit was 54.
  > **After**: It collapses to 50, triggering sub-optimal viability. The morning peak drops from 97 to 58, shifting the dominant clock to midday.
  > But PulseFit doesn't leave you stranded—it immediately surfaces a **Strategic Pivot**.”

### 0:55 – 1:15 | The Strategic Pivot & Archetype Substitution
- **Action**: Look at the **Strategic Pivot Recommendation** card: *Office-District Street Express*. Click **“Pivot to Office-District Street Express”**.
- **Speaker**:
  > “PulseFit proposes switching from a high-overhead seated model to an **Office-District Street Express counter**.
  > Why?
  > First: It concentrates labor and square footage exclusively on high-velocity AM/midday commuter clocks without carrying 7-day seated footprint drag.
  > Second: Its resilience-adjusted score is **71/100**—21 points higher!
  > Third: In Tab 3 (*Why & Alternatives*), PulseFit gives deterministic proof: superior clock alignment, lower fixed-cost exposure, and full compliance with open-market site rules.”

### 1:15 – 1:30 | Multi-Metro Breadth & Contrast Demo
- **Action**: Click **“Deep Ellum Demand Inversion”** or **“Chelsea All-Day Resilience”**.
- **Speaker**:
  > “The engine handles both NYC canonical H3-10 ownership and Dallas–Fort Worth's 72 corridors across 67 cafe and restaurant archetypes.
  > In Deep Ellum, morning coffee fails because activity is inverted—evening and late-night hit 80, while morning is only 35.
  > In Chelsea, balanced daypart spread creates genuine, multi-occasion resilience.
  > PulseFit gives operators decision intelligence before signing a 10-year lease.”

---

## 2. The 4 Curated Demo Presets

| Preset ID | Corridor & Metro | Initial Archetype | Shock Tested | Story Arc & The Pivot |
|---|---|---|---|---|
| `demo-midtown-peak-trap` | **Midtown East–Grand Central** (NYC) | *Neighborhood seated coffeehouse* | -40% Weekday AM | **The Commuter Trap**: 97 AM vs 30 Night. Seated model pays rent 7 days for a 2hr window. Pivot to *Office-district street express*. |
| `demo-deep-ellum-nightlife` | **Deep Ellum** (DFW) | *Office-district coffeehouse* | -35% Weekend Day | **The Timing Inversion**: AM density is only 35, while evening/late-night is 80. Pivot to *Evening Social Dining* or *Dessert Lounge*. |
| `demo-chelsea-resilience` | **Chelsea–Meatpacking** (NYC) | *Neighborhood seated coffeehouse* | -30% Weekday Evening | **The Resilient Benchmark**: Spread is only 15 points (high across all dayparts). Shock barely dents viability due to 5/5 occasion breadth. |
| `demo-watters-creek-weekend` | **Allen–Watters Creek** (DFW) | *Neighborhood casual full-service* | -45% Weekend Day | **The Suburban Weekend Spike**: Weekend day is 85, weekday morning is 15. Demonstrates extreme weekend vulnerability. |

---

## 3. Anticipated Judge Questions & Quick Answers

1. **Q: How does this differ from standard site-selection heatmaps?**
   - **A**: Heatmaps only show aggregate volume (where). PulseFit evaluates the match between operating format, daypart clocks, and fixed-cost fragility (what format, when, and how fragile).
2. **Q: Are you using AI/LLM for the recommendations?**
   - **A**: No. The core engine is 100% deterministic and inspectable. Every verdict, metric, and rationale is calculated mathematically from the dataset's dayparts, resilience indices, and decision tracks.
3. **Q: How do you respect source caveats?**
   - **A**: We distinguish NYC's canonical H3-10 ownership from DFW's Voronoi display envelopes. Expert estimates are never labeled as measured foot-traffic, and whitespace is never claimed as vacancy.
