import React, { useState } from 'react';
import {
  Corridor,
  Archetype,
  RiskTolerance,
  StressScenarioResult,
  DaypartKey,
} from '../models/types';
import { runPeakTrapStressTest } from '../engine/stressTest';
import {
  TrendingDown,
  RotateCcw,
  Repeat,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';
import { PeakTrapMorphIllustration } from '../components/illustrations/PeakTrapMorphIllustration';
import { ArchetypeIcon } from '../components/illustrations/ArchetypeIcon';

interface ScreenStressTestProps {
  corridor: Corridor;
  selectedArchetype: Archetype;
  riskTolerance: RiskTolerance;
  onAdoptAlternative: (archetypeId: string) => void;
  onNavigateToDiagnose: () => void;
}

export const ScreenStressTest: React.FC<ScreenStressTestProps> = ({
  corridor,
  selectedArchetype,
  riskTolerance,
  onAdoptAlternative,
  onNavigateToDiagnose,
}) => {
  // Continuous slider state: 0% to 60% demand reduction
  const [sliderVal, setSliderVal] = useState<number>(40);

  // Run dynamic calculation through the deterministic engine
  const stressResult: StressScenarioResult = runPeakTrapStressTest(
    corridor,
    selectedArchetype,
    riskTolerance,
    sliderVal
  );

  const { before, after, shockApplied, fitDelta, survivingAlternatives, stressSummary } = stressResult;
  const topSurviving = survivingAlternatives[0];
  const isVulnerable = fitDelta <= -5;

  const daypartKeys: DaypartKey[] = [
    'weekday_am',
    'weekday_midday',
    'weekday_evening',
    'late_night',
    'weekend_day',
  ];

  const shortDaypartNames: Record<DaypartKey, string> = {
    weekday_am: 'AM',
    weekday_midday: 'MIDDAY',
    weekday_evening: 'EVENING',
    late_night: 'LATE NIGHT',
    weekend_day: 'WEEKEND',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* HERO SECTION: CAN THIS MODEL SURVIVE? */}
      <div className="card" style={{ borderTop: isVulnerable ? '4px solid var(--status-danger)' : '4px solid var(--status-positive)' }}>
        
        {/* Header Badges & Feature Name */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge neutral">STAGE 03: STRESS TEST</span>
            <span className="badge danger">
              PEAK TRAP: Stress-test your busiest demand window
            </span>
          </div>
          <span className="badge" style={{ textTransform: 'uppercase' }}>
            {corridor.name}
          </span>
        </div>

        {/* Primary Product Framing */}
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
            CAN THIS MODEL SURVIVE?
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '850px' }}>
            PulseFit tests whether your chosen operating model remains resilient when its strongest demand window weakens.
          </p>
        </div>

        {/* CONTINUOUS DEMAND REDUCTION SLIDER CONTROLLER */}
        <div className="stress-slider-control-box" style={{ margin: '1.75rem 0 1rem 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                WHAT HAPPENS IF YOUR BUSIEST PERIOD WEAKENS?
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                Strongest Demand Window:{' '}
                <strong style={{ color: 'var(--status-warning)' }}>
                  {before.dominantDaypart.label} ({before.dominantDaypart.density}/100)
                </strong>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>DEMAND CONTRACTION</div>
              <div style={{ fontSize: '2rem', fontFamily: 'var(--font-mono)', fontWeight: 900, color: sliderVal > 0 ? 'var(--status-danger)' : 'var(--text-primary)' }}>
                -{sliderVal}%
              </div>
            </div>
          </div>

          {/* Interactive Range Slider: 0% to 60% */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              <span>0% (Baseline)</span>
              <span>20% (Mild dip)</span>
              <span>40% (Remote/hybrid shift)</span>
              <span>60% (Severe disruption)</span>
            </div>

            <input
              id="slider-demand-reduction"
              type="range"
              min="0"
              max="60"
              step="5"
              value={sliderVal}
              onChange={(e) => setSliderVal(Number(e.target.value))}
              aria-label="Demand reduction percentage slider"
              className="stress-range-slider"
            />
          </div>

          {/* Demand Timeline contracted in real time */}
          <div style={{ marginTop: '1.5rem', background: '#ffffff', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
              REAL-TIME IMPACT ON OPERATING WINDOWS:
            </div>
            <div className="horizontal-timeline-track">
              {daypartKeys.map((k) => {
                const baseDensity = corridor.dayparts[k];
                const isTargeted = k === shockApplied.targetDaypart;
                const activeDensity = isTargeted && sliderVal > 0 ? Math.round(baseDensity * (1 - sliderVal / 100)) : baseDensity;

                return (
                  <div key={k} className={`timeline-cell ${isTargeted && sliderVal > 0 ? 'shocked' : ''}`} style={{ padding: '0.6rem 0.8rem' }}>
                    <div className="cell-header">
                      <span className="cell-name">{shortDaypartNames[k]}</span>
                      {isTargeted && sliderVal > 0 && <span className="cell-badge low">-{sliderVal}%</span>}
                    </div>
                    <div className="cell-density-num" style={{ fontSize: '1.2rem', color: isTargeted && sliderVal > 0 ? 'var(--status-danger)' : undefined }}>
                      {activeDensity}
                    </div>
                    <div className="cell-bar-bg">
                      <div
                        className="cell-bar-fill"
                        style={{
                          width: `${activeDensity}%`,
                          background: isTargeted && sliderVal > 0 ? 'var(--status-danger)' : '#64748b',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* FUNCTIONAL METAPHOR ILLUSTRATION: PEAK TRAP DYNAMIC DEMAND CONTRACTION */}
        <PeakTrapMorphIllustration
          sliderVal={sliderVal}
          dominantDaypartLabel={before.dominantDaypart.label}
          originalFit={before.resilienceAdjustedFit}
          stressedFit={after.resilienceAdjustedFit}
          style={{ margin: '1rem 0 0.5rem 0' }}
        />

        {/* BEFORE → STRESS → AFTER VISUALLY DOMINANT COMPARISON */}
        <div className="causal-transition-grid" style={{ margin: '1.5rem 0' }}>
          {/* Column 1: BEFORE */}
          <div className="causal-box baseline">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="badge neutral">BEFORE DISRUPTION</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>0% Reduction</span>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>OPERATING MODEL</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <div className="archetype-icon-box" style={{ padding: '0.35rem' }}>
                  <ArchetypeIcon name={selectedArchetype.name} category={selectedArchetype.category_id} size={22} color="var(--brand-navy)" />
                </div>
                <strong style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>
                  {selectedArchetype.name}
                </strong>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', background: '#ffffff', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>OPPORTUNITY FIT</div>
                  <div style={{ fontSize: '2rem', fontFamily: 'var(--font-mono)', fontWeight: 900 }}>
                    {before.resilienceAdjustedFit}
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>/100</span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>RESILIENCE</div>
                  <div style={{ fontSize: '2rem', fontFamily: 'var(--font-mono)', fontWeight: 900, color: 'var(--status-positive)' }}>
                    {before.resilienceScore}
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>/100</span>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.85rem' }}>
                Verdict: <strong style={{ color: 'var(--text-primary)' }}>{before.verdictLabel}</strong>
              </div>
            </div>
          </div>

          {/* Column 2: STRESS DELTA ARROW */}
          <div className="causal-arrow-col">
            <div className="causal-arrow-pill">
              <TrendingDown size={14} style={{ display: 'inline', marginRight: '4px' }} />
              -{sliderVal}% {shortDaypartNames[shockApplied.targetDaypart]}
            </div>
            <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textAlign: 'center' }}>
              CAUSAL IMPACT
            </div>
          </div>

          {/* Column 3: AFTER */}
          <div className="causal-box shocked">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className={`badge ${isVulnerable ? 'danger' : 'positive'}`}>AFTER DISRUPTION</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>-{sliderVal}% Contraction</span>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>TESTED FORMAT</div>
              <strong style={{ fontSize: '1.15rem', color: 'var(--text-primary)', display: 'block', marginBottom: '1rem' }}>
                {selectedArchetype.name}
              </strong>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', background: '#ffffff', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>OPPORTUNITY FIT</div>
                  <div style={{ fontSize: '2rem', fontFamily: 'var(--font-mono)', fontWeight: 900, color: isVulnerable ? 'var(--status-danger)' : 'var(--text-primary)' }}>
                    {after.resilienceAdjustedFit}
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {' '}({fitDelta > 0 ? `+${fitDelta}` : fitDelta})
                    </span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>RESILIENCE</div>
                  <div style={{ fontSize: '2rem', fontFamily: 'var(--font-mono)', fontWeight: 900, color: after.resilienceScore >= 65 ? 'var(--status-positive)' : 'var(--status-warning)' }}>
                    {after.resilienceScore}
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>/100</span>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.85rem' }}>
                Status: <strong style={{ color: isVulnerable ? 'var(--status-danger)' : 'var(--status-positive)' }}>{after.verdictLabel}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Model Output Explanation */}
        <div className={`callout-box ${isVulnerable ? 'danger' : 'success'}`} style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
            {isVulnerable ? <ShieldAlert size={16} color="var(--status-danger)" /> : <CheckCircle2 size={16} color="var(--status-positive)" />}
            <strong>Analytical Stress Diagnosis:</strong>
          </div>
          <p>{stressSummary}</p>
        </div>

        {/* PROMINENT ARCHETYPE SUBSTITUTION CALLOUT */}
        {topSurviving && (
          <div className="strategic-pivot-surface">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <div className="archetype-icon-box" style={{ background: '#ecfdf5', borderColor: '#a7f3d0' }} title={`Pivot Format: ${topSurviving.archetype.name}`}>
                  <ArchetypeIcon name={topSurviving.archetype.name} category={topSurviving.archetype.category_id} size={30} color="var(--status-positive)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.725rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--status-positive)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    STRATEGIC PIVOT RECOMMENDATION
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                    YOUR CORRIDOR IS VIABLE. YOUR CURRENT FORMAT IS THE WEAK LINK.
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.35rem', maxWidth: '750px' }}>
                    Switch to <strong>{topSurviving.archetype.name}</strong> ({topSurviving.resilienceAdjustedFit}/100 fit).
                    {' '}{topSurviving.whyBetter[0] || 'Broader demand coverage reduces dependence on the stressed period.'}
                  </p>
                </div>
              </div>

              <button
                id="btn-pivot-model"
                className="btn-primary"
                onClick={() => onAdoptAlternative(topSurviving.archetype.archetype_id)}
                style={{ background: 'var(--status-positive)', borderColor: 'var(--status-positive)', padding: '0.75rem 1.4rem' }}
              >
                <Repeat size={15} />
                Pivot to {topSurviving.archetype.name}
              </button>
            </div>
          </div>
        )}

        {/* Back to Diagnose CTA */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem', marginTop: '1.5rem' }}>
          <button
            className="btn-secondary"
            onClick={onNavigateToDiagnose}
          >
            ← Back to Stage 02: Diagnose
          </button>

          <button
            className="btn-secondary"
            onClick={() => setSliderVal(40)}
            title="Reset to standard 40% disruption"
          >
            <RotateCcw size={14} />
            Reset Stress Test
          </button>
        </div>

      </div>
    </div>
  );
};
