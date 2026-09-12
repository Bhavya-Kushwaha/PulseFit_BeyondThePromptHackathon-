import React from 'react';
import { Database, ArrowRight } from 'lucide-react';

export type StageId = 'build' | 'diagnose' | 'stress';

interface HeaderProps {
  currentStage: StageId;
  onSelectStage: (stage: StageId) => void;
  onOpenMethodology: () => void;
  peakRiskLevel?: 'LOW' | 'MEDIUM' | 'HIGH';
}

export const Header: React.FC<HeaderProps> = ({
  currentStage,
  onSelectStage,
  onOpenMethodology,
  peakRiskLevel,
}) => {
  return (
    <header className="app-header">
      {/* Brand Identity */}
      <div className="brand-title">
        <h1>
          <span className="pulse-dot" />
          PULSEFIT
        </h1>
        <span className="brand-subtitle">
          Choose the operating model, not just the location.
        </span>
      </div>

      {/* Guided 3-Stage Journey Indicator */}
      <div className="stage-nav-strip" role="navigation" aria-label="Decision Stages">
        <button
          id="nav-stage-build"
          className={`stage-step-btn ${currentStage === 'build' ? 'active' : ''}`}
          onClick={() => onSelectStage('build')}
        >
          <span className="stage-num">01</span>
          <span className="stage-text">Build</span>
        </button>

        <span className="stage-arrow">
          <ArrowRight size={12} />
        </span>

        <button
          id="nav-stage-diagnose"
          className={`stage-step-btn ${currentStage === 'diagnose' ? 'active' : ''}`}
          onClick={() => onSelectStage('diagnose')}
        >
          <span className="stage-num">02</span>
          <span className="stage-text">Diagnose</span>
        </button>

        <span className="stage-arrow">
          <ArrowRight size={12} />
        </span>

        <button
          id="nav-stage-stress"
          className={`stage-step-btn ${currentStage === 'stress' ? 'active' : ''}`}
          onClick={() => onSelectStage('stress')}
        >
          <span className="stage-num">03</span>
          <span className="stage-text">Stress Test</span>
          {peakRiskLevel === 'HIGH' && (
            <span className="stage-alert-dot" title="High Peak Risk Detected" />
          )}
        </button>
      </div>

      {/* Secondary Action: Methodology & Dataset Provenance Drawer */}
      <div className="header-actions">
        <button
          id="btn-open-methodology"
          className="btn-ghost-sm"
          onClick={onOpenMethodology}
          title="Inspect underlying dataset, scoring weights and geometry rules"
        >
          <Database size={13} />
          <span>Data & Methodology</span>
        </button>
      </div>
    </header>
  );
};
