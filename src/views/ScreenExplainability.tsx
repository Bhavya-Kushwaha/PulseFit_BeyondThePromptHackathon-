import React from 'react';
import {
  Corridor,
  Archetype,
  CalculatedFitMetrics,
  AlternativeArchetype,
  ExplainabilityReport,
} from '../models/types';
import {
  Check,
  Clock,
  Compass,
  Repeat,
  ShieldAlert,
  ArrowRight,
  Info,
} from 'lucide-react';

interface ScreenExplainabilityProps {
  corridor: Corridor;
  selectedArchetype: Archetype;
  metrics: CalculatedFitMetrics;
  alternatives: AlternativeArchetype[];
  report: ExplainabilityReport;
  onAdoptAlternative: (archetypeId: string) => void;
  onNavigateToStress: () => void;
}

export const ScreenExplainability: React.FC<ScreenExplainabilityProps> = ({
  corridor,
  selectedArchetype,
  metrics,
  alternatives,
  report,
  onAdoptAlternative,
  onNavigateToStress,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Page Header */}
      <div className="card-header" style={{ marginBottom: 0 }}>
        <div>
          <h2 className="card-title">
            <Compass size={20} color="var(--accent-amber)" />
            Screen 3 — Explainability & Archetype Substitution
          </h2>
          <p className="card-subtitle">
            Deterministic rationale and alternative operating models for {corridor.name}.
          </p>
        </div>
        <button className="btn-danger" onClick={onNavigateToStress} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
          Test Fragility
          <ArrowRight size={14} />
        </button>
      </div>

      {/* 4 Pillars of Explainability Grid */}
      <div className="grid-2">
        {/* Pillar 1: Why This Model */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title" style={{ fontSize: '1rem' }}>
              <Check size={16} color="var(--status-positive)" />
              Why This Operating Model
            </h3>
            <span className="badge neutral">{selectedArchetype.decision_track}</span>
          </div>
          <ul className="why-list">
            {report.whyThisModel.map((item, idx) => (
              <li key={idx} className="why-item positive">
                <span>+</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pillar 2: Why This Time */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title" style={{ fontSize: '1rem' }}>
              <Clock size={16} color="var(--status-warning)" />
              Why This Operating Clock
            </h3>
            <span className="badge">Daypart Alignment</span>
          </div>
          <ul className="why-list">
            {report.whyThisTime.map((item, idx) => (
              <li key={idx} className="why-item neutral">
                <span>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pillar 3: Why This Corridor */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title" style={{ fontSize: '1rem' }}>
              <Compass size={16} color="var(--brand-navy)" />
              Why This Corridor Context
            </h3>
            <span className="badge neutral">{corridor.district}</span>
          </div>
          <ul className="why-list">
            {report.whyThisCorridor.map((item, idx) => (
              <li key={idx} className="why-item positive">
                <span>+</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pillar 4: What Could Break The Thesis */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title" style={{ fontSize: '1rem' }}>
              <ShieldAlert size={16} color="var(--status-danger)" />
              What Could Break The Thesis
            </h3>
            <span className="badge danger">Fragility Factors</span>
          </div>
          <ul className="why-list">
            {report.thesisBreakers.map((item, idx) => (
              <li key={idx} className="why-item negative">
                <span>&minus;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Archetype Substitution Recommender Section */}
      <div className="card">
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Repeat size={18} color="var(--accent-amber)" />
              <h3 className="card-title">Archetype Substitution Recommender</h3>
            </div>
            <p className="card-subtitle">
              “Your corridor may be viable, but your chosen operating format may carry unnecessary drag.”
            </p>
          </div>
          <span className="badge">Format Optimization</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {alternatives.map((alt) => {
            const isBetter = alt.isPreferable;
            return (
              <div
                key={alt.archetype.archetype_id}
                className={`alt-card ${isBetter ? 'preferable' : ''}`}
              >
                <div className="alt-title-row">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="alt-name">{alt.archetype.name}</span>
                      {alt.isGated ? (
                        <span className="badge" style={{ color: 'var(--text-muted)' }}>
                          GATED (Host Required)
                        </span>
                      ) : isBetter ? (
                        <span className="badge emerald">PREFERABLE FORMAT</span>
                      ) : (
                        <span className="badge">ALTERNATIVE</span>
                      )}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Track: {alt.archetype.decision_track} • Clocks: {alt.archetype.demand_clocks.join(', ')}
                    </span>
                  </div>

                  <div className="alt-scores-row">
                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>RESILIENCE FIT</div>
                      <div
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 800,
                          color: alt.resilienceAdjustedFit >= metrics.resilienceAdjustedFit ? 'var(--accent-emerald)' : 'var(--text-primary)',
                        }}
                      >
                        {alt.resilienceAdjustedFit}
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {alt.deltaFit > 0 ? ` (+${alt.deltaFit})` : ` (${alt.deltaFit})`}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>PEAK SHARE</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                        {alt.peakDependency}%
                      </div>
                    </div>

                    {!alt.isGated && (
                      <button
                        className="btn-secondary"
                        onClick={() => onAdoptAlternative(alt.archetype.archetype_id)}
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                      >
                        Adopt Model
                      </button>
                    )}
                  </div>
                </div>

                {/* Why Better / Trade-offs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {alt.whyBetter.map((w, i) => (
                    <div key={i} className="why-item positive" style={{ fontSize: '0.78rem' }}>
                      <span>✓</span>
                      <span>{w}</span>
                    </div>
                  ))}
                  {alt.tradeoffs.map((t, i) => (
                    <div key={i} className="why-item negative" style={{ fontSize: '0.78rem' }}>
                      <span>⚠</span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dataset Caveats & Provenance */}
      <div className="callout-box" style={{ fontSize: '0.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <Info size={14} color="var(--accent-amber)" />
          <strong>Data Contract Provenance & Caveats</strong>
        </div>
        <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {report.dataCaveats.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
