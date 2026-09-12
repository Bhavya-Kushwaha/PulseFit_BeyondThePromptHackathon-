import React, { useState } from 'react';
import {
  Corridor,
  Archetype,
  CalculatedFitMetrics,
  AlternativeArchetype,
  ExplainabilityReport,
  DaypartKey,
} from '../models/types';
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  Activity,
  Repeat,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ArchetypeIcon } from '../components/illustrations/ArchetypeIcon';
import { HeroCorridorIllustration } from '../components/illustrations/HeroCorridorIllustration';

interface ScreenRecommendationProps {
  corridor: Corridor;
  archetype: Archetype;
  metrics: CalculatedFitMetrics;
  alternatives: AlternativeArchetype[];
  report: ExplainabilityReport;
  onAdoptAlternative: (archetypeId: string) => void;
  onNavigateToStress: () => void;
  onOpenMethodology?: () => void;
}

export const ScreenRecommendation: React.FC<ScreenRecommendationProps> = ({
  corridor,
  archetype,
  metrics,
  alternatives,
  report,
  onAdoptAlternative,
  onNavigateToStress,
  onOpenMethodology,
}) => {
  const [showMethodology, setShowMethodology] = useState(false);

  const isOptimal = metrics.verdict === 'OPTIMAL';
  const isFragile = metrics.verdict === 'PEAK_TRAP_FRAGILE';

  const peakRiskLevel: 'LOW' | 'MEDIUM' | 'HIGH' =
    metrics.peakDependency >= 30
      ? 'HIGH'
      : metrics.peakDependency >= 24
      ? 'MEDIUM'
      : 'LOW';

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

  const topAlt = alternatives[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* THE PULSEFIT DECISION HERO COCKPIT */}
      <div className={`dominant-recommendation-card ${isFragile ? 'fragile' : isOptimal ? 'optimal' : 'constrained'}`}>
        
        {/* Top Eyebrow & Trust Indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge neutral">STAGE 02: DIAGNOSE</span>
            <span className="badge" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              PULSEFIT DECISION
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>DATA CONFIDENCE:</span>
            <strong style={{ color: 'var(--text-secondary)' }}>Context-based estimate</strong>
            <button
              className="btn-link"
              onClick={onOpenMethodology}
              style={{ fontSize: '0.75rem', textDecoration: 'underline', color: 'var(--brand-navy)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              [ View evidence ]
            </button>
          </div>
        </div>

        {/* HERO SECTION SPLIT: Left (Decision & 4 KPIs) + Right (Corridor Adaptive Illustration) */}
        <div className="rec-hero-split-grid">
          {/* Left: Operating Model Title & 4 Core Decision KPIs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', justifyContent: 'space-between' }}>
            <div className="rec-hero-header" style={{ margin: 0 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <div className="archetype-icon-box" title={`Operating Model: ${archetype.name}`}>
                  <ArchetypeIcon name={archetype.name} category={archetype.category_id} size={34} color="var(--brand-navy)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>
                    RECOMMENDED OPERATING MODEL FOR {corridor.name.toUpperCase()}
                  </div>
                  <h2 className="rec-model-name" style={{ margin: 0 }}>{archetype.name}</h2>
                  <div className="rec-corridor-name" style={{ marginTop: '0.25rem' }}>
                    Operating format evaluated for <strong>{corridor.district}</strong> ({corridor.metro_id === 'nyc' ? 'New York City' : 'Dallas–Fort Worth'})
                  </div>
                </div>
              </div>

              <div className="rec-badge-row" style={{ marginTop: '0.5rem' }}>
                <span
                  className={`badge ${isFragile ? 'danger' : isOptimal ? 'positive' : 'warning'}`}
                  style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}
                >
                  {isFragile ? <AlertTriangle size={14} /> : isOptimal ? <CheckCircle2 size={14} /> : null}
                  {metrics.verdictLabel}
                </span>
              </div>
            </div>

            {/* 4 Core Human Decision Metrics */}
            <div className="cockpit-kpi-grid" style={{ marginTop: 0 }}>
              {/* KPI 1: Opportunity Fit */}
              <div className="cockpit-kpi-box">
                <div className="kpi-label">Opportunity Fit</div>
                <div className="kpi-val">
                  {metrics.opportunityFit}
                  <span className="kpi-denom"> / 100</span>
                </div>
                <div className="kpi-desc">Base demographic & location affinity</div>
              </div>

              {/* KPI 2: Resilience Score */}
              <div className="cockpit-kpi-box">
                <div className="kpi-label">Resilience Score</div>
                <div className="kpi-val" style={{ color: metrics.resilienceScore >= 65 ? 'var(--status-positive)' : 'var(--text-primary)' }}>
                  {metrics.resilienceScore}
                  <span className="kpi-denom"> / 100</span>
                </div>
                <div className="kpi-desc">Shock resistance against disruption</div>
              </div>

              {/* KPI 3: Peak Risk */}
              <div className="cockpit-kpi-box">
                <div className="kpi-label">Peak Risk</div>
                <div
                  className="kpi-val"
                  style={{
                    color: peakRiskLevel === 'HIGH' ? 'var(--status-danger)' : peakRiskLevel === 'MEDIUM' ? 'var(--status-warning)' : 'var(--status-positive)',
                  }}
                >
                  {peakRiskLevel}
                </div>
                <div className="kpi-desc">{metrics.peakDependency}% volume in busiest window</div>
              </div>

              {/* KPI 4: Best Operating Windows */}
              <div className="cockpit-kpi-box">
                <div className="kpi-label">Best Operating Window</div>
                <div className="kpi-val-text">{metrics.dominantDaypart.label.split(' ')[0]}</div>
                <div className="kpi-desc">{metrics.dominantDaypart.density}/100 peak demand density</div>
              </div>
            </div>
          </div>

          {/* Right: Editorial Hero Illustration (Corridor Demand Adaptation) */}
          <div style={{ display: 'flex' }}>
            <HeroCorridorIllustration style={{ width: '100%', height: '100%' }} />
          </div>
        </div>

        {/* UNIFIED DEMAND TIMELINE: AM ────── MIDDAY ────── EVENING ────── LATE NIGHT ────── WEEKEND */}
        <div className="cockpit-timeline-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
              <Clock size={14} />
              <span>DEMAND TIMELINE ACROSS OPERATING WINDOWS</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              Strongest: <strong style={{ color: 'var(--status-warning)' }}>{shortDaypartNames[metrics.dominantDaypart.key]} ({metrics.dominantDaypart.density})</strong> •
              Weakest: <strong style={{ color: 'var(--text-muted)' }}>{shortDaypartNames[metrics.weakestDaypart.key]} ({metrics.weakestDaypart.density})</strong>
            </div>
          </div>

          {/* Horizontal Integrated Timeline Track */}
          <div className="horizontal-timeline-track">
            {daypartKeys.map((k) => {
              const density = corridor.dayparts[k];
              const isStrongest = k === metrics.dominantDaypart.key;
              const isWeakest = k === metrics.weakestDaypart.key;

              return (
                <div key={k} className={`timeline-cell ${isStrongest ? 'strongest' : isWeakest ? 'weakest' : ''}`}>
                  <div className="cell-header">
                    <span className="cell-name">{shortDaypartNames[k]}</span>
                    {isStrongest && <span className="cell-badge peak">STRONGEST</span>}
                    {isWeakest && <span className="cell-badge low">WEAKEST</span>}
                  </div>

                  <div className="cell-density-num">{density}</div>

                  <div className="cell-bar-bg">
                    <div
                      className="cell-bar-fill"
                      style={{
                        width: `${density}%`,
                        background: isStrongest ? 'var(--status-warning)' : isWeakest ? '#cbd5e1' : '#64748b',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.65rem', fontStyle: 'italic' }}>
            {shortDaypartNames[metrics.dominantDaypart.key]} sustains {metrics.dominantDaypart.sharePercent}% of total demand. Busiest demand is heavily skewed toward this window.
          </div>
        </div>

        {/* WHY THIS WORKS vs WATCH (EXECUTIVE BULLETS) */}
        <div className="insights-row">
          {/* Why This Works (3 strongest reasons) */}
          <div className="insight-card-inner">
            <div className="insight-card-title" style={{ color: 'var(--status-positive)' }}>
              <CheckCircle2 size={15} />
              WHY THIS WORKS
            </div>
            <ul className="why-list">
              {report.whyThisModel.slice(0, 2).map((item, idx) => (
                <li key={`m-${idx}`} className="why-item positive">
                  <span>✓</span>
                  <span>{item}</span>
                </li>
              ))}
              <li className="why-item positive">
                <span>✓</span>
                <span>{report.whyThisCorridor[0] || 'Broad audience overlap across primary local foot-traffic anchors.'}</span>
              </li>
            </ul>
          </div>

          {/* Watch (2-3 risks) */}
          <div className="insight-card-inner">
            <div className="insight-card-title" style={{ color: 'var(--status-danger)' }}>
              <AlertTriangle size={15} />
              WATCH (KEY RISKS)
            </div>
            <ul className="why-list">
              {report.thesisBreakers.slice(0, 2).map((item, idx) => (
                <li key={`r-${idx}`} className="why-item negative">
                  <span>⚠</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ARCHETYPE SUBSTITUTION: "YOUR CORRIDOR IS VIABLE. YOUR CURRENT FORMAT IS THE WEAK LINK." */}
        {topAlt && (
          <div className="substitution-hero-banner">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
              <div className="archetype-icon-box" style={{ background: '#ecfdf5', borderColor: '#a7f3d0' }} title={`Alternative Model: ${topAlt.archetype.name}`}>
                <ArchetypeIcon name={topAlt.archetype.name} category={topAlt.archetype.category_id} size={28} color="var(--status-positive)" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <div style={{ fontSize: '0.725rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--status-positive)', letterSpacing: '0.06em' }}>
                  ARCHETYPE SUBSTITUTION INSIGHT
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {topAlt.deltaFit > 0
                    ? 'YOUR CORRIDOR IS VIABLE. YOUR CURRENT FORMAT MAY BE THE WEAK LINK.'
                    : 'ALTERNATIVE OPERATING FORMAT AVAILABLE'}
                </div>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', maxWidth: '780px' }}>
                  Recommended alternative: <strong>{topAlt.archetype.name}</strong> ({topAlt.resilienceAdjustedFit}/100 fit).
                  {' '}{topAlt.whyBetter[0] || 'Broader demand coverage reduces dependence on the stressed period.'}
                </p>
              </div>
            </div>

            {!topAlt.isGated && (
              <button
                id="btn-adopt-alt-diagnose"
                className="btn-secondary"
                onClick={() => onAdoptAlternative(topAlt.archetype.archetype_id)}
                style={{ padding: '0.6rem 1.1rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
              >
                <Repeat size={14} />
                Switch to {topAlt.archetype.name}
              </button>
            )}
          </div>
        )}

        {/* PROGRESSIVE DISCLOSURE: Technical Methodology Toggle */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
          <button
            className="progressive-disclosure-toggle"
            onClick={() => setShowMethodology(!showMethodology)}
          >
            {showMethodology ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {showMethodology ? 'Hide technical calculation details' : 'How this is calculated & view evidence →'}
          </button>

          {showMethodology && (
            <div className="progressive-content">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '0.75rem' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>TIME FIT INDEX</span>
                  <div style={{ fontWeight: 700 }}>{metrics.timeFit}/100</div>
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>Format clock alignment</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>DEMAND BREADTH</span>
                  <div style={{ fontWeight: 700 }}>{metrics.occasionBreadth} / 5 windows</div>
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>Windows with &ge;40 density</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>OPERATING COMPATIBILITY</span>
                  <div style={{ fontWeight: 700 }}>{archetype.decision_track}</div>
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>{archetype.decision_object}</span>
                </div>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Audit note: Metrics derived deterministically from spatial priors and daypart densities in <code>usa-corridors-20260906-r2</code>. No revenue or foot-traffic counts are fabricated.
              </div>
            </div>
          )}
        </div>

        {/* Hero CTA: Advance to Stress Test */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
          <button
            id="btn-goto-stress"
            className="btn-danger"
            onClick={onNavigateToStress}
            style={{ padding: '0.85rem 2rem', fontSize: '0.95rem' }}
          >
            <Activity size={16} />
            Test Peak Fragility
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};
