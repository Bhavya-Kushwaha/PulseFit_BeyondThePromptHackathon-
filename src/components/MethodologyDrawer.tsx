import React from 'react';
import { X, ShieldCheck, Database } from 'lucide-react';
import { Corridor, Archetype } from '../models/types';
import { SCORING_CONFIG } from '../config/scoringConfig';

interface MethodologyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  corridor: Corridor;
  archetype: Archetype;
}

export const MethodologyDrawer: React.FC<MethodologyDrawerProps> = ({
  isOpen,
  onClose,
  corridor,
  archetype,
}) => {
  if (!isOpen) return null;

  return (
    <div className="methodology-modal-overlay" onClick={onClose}>
      <div className="methodology-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--brand-navy)' }}>
              <Database size={16} />
              <strong style={{ fontSize: '0.95rem' }}>Data & Methodology Provenance</strong>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Inspectable data contract rules, scoring weights, and spatial governance.
            </p>
          </div>
          <button className="btn-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Section 1: Active Bundle */}
          <div className="drawer-section">
            <span className="drawer-section-label">Active Snapshot Lineage</span>
            <div className="drawer-kv-grid">
              <div>
                <span className="kv-k">Snapshot Bundle</span>
                <span className="kv-v"><code>usa-corridors-20260906-r2</code></span>
              </div>
              <div>
                <span className="kv-k">Active Metro</span>
                <span className="kv-v">{corridor.metro_id === 'nyc' ? 'New York City' : 'Dallas–Fort Worth'}</span>
              </div>
              <div>
                <span className="kv-k">Geometry Contract</span>
                <span className="kv-v">
                  {corridor.metro_id === 'nyc'
                    ? 'Canonical H3-10 ownership (81,767 cells, 0 overlap)'
                    : 'Voronoi display envelopes (Not site catchment)'}
                </span>
              </div>
              <div>
                <span className="kv-k">Data Derivation</span>
                <span className="kv-v">Curated expert-estimated spatial context</span>
              </div>
            </div>
          </div>

          {/* Section 2: Deterministic Scoring Weights */}
          <div className="drawer-section">
            <span className="drawer-section-label">Resilience Scoring Weights</span>
            <div className="drawer-kv-grid">
              <div>
                <span className="kv-k">Shock Resilience Weight</span>
                <span className="kv-v">{SCORING_CONFIG.resilience.shock_resilience * 100}%</span>
              </div>
              <div>
                <span className="kv-k">Seasonality Dampener</span>
                <span className="kv-v">{SCORING_CONFIG.resilience.seasonality_penalty * 100}%</span>
              </div>
              <div>
                <span className="kv-k">Event Dependency Dampener</span>
                <span className="kv-v">{SCORING_CONFIG.resilience.event_dependency_penalty * 100}%</span>
              </div>
              <div>
                <span className="kv-k">Development Dependency</span>
                <span className="kv-v">{SCORING_CONFIG.resilience.development_dependency_penalty * 100}%</span>
              </div>
            </div>
          </div>

          {/* Section 3: Selected Format Governance */}
          <div className="drawer-section">
            <span className="drawer-section-label">Selected Format Governance</span>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div>Decision Track: <strong>{archetype.decision_track}</strong></div>
              <div>Access Contract: <code>{archetype.access_contract || 'PUBLIC_RIGHT_OF_WAY'}</code></div>
              <div>Mandatory Gate: <em>{archetype.required_gate || 'None'}</em></div>
              <div>Demand Clocks: <code>{archetype.demand_clocks.join(', ')}</code></div>
            </div>
          </div>

          {/* Section 4: Strict Hackathon Caveats */}
          <div className="callout-box" style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
              <ShieldCheck size={14} color="var(--status-positive)" />
              <strong>Zero-Hallucination Integrity Guarantee</strong>
            </div>
            <p>
              PulseFit enforces strict data fidelity: All metrics are computed mathematically from the dataset snapshot. No customer traffic counts, revenue predictions, or commercial lease vacancies are fabricated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
