import React from 'react';
import { GraduationCap, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <div className="footer-top-row">
        {/* Project & Tagline */}
        <div className="footer-brand-col">
          <div className="footer-project-title">
            <span className="pulse-dot" style={{ width: '6px', height: '6px' }} />
            <strong>PULSEFIT</strong>
          </div>
          <p className="footer-tagline">
            Choose the operating model, not just the location.
          </p>
          <div className="footer-meta-note">
            Built for Beyond The Prompt Hackathon 2026
          </div>
        </div>

        {/* Team & Student Credits */}
        <div className="footer-team-col">
          <div className="footer-team-heading">
            Built by <strong>Momo Byte</strong>
          </div>

          <div className="footer-developers-grid">
            <div className="developer-card">
              <span className="dev-name">BHAVYA KUSHWAHA</span>
              <span className="dev-reg">25BSA10157</span>
            </div>

            <div className="developer-card">
              <span className="dev-name">UMANG PATEL</span>
              <span className="dev-reg">25MEI10037</span>
            </div>
          </div>

          <div className="footer-institution-row">
            <GraduationCap size={14} color="var(--text-muted)" />
            <span>VIT Bhopal University</span>
            <span>•</span>
            <span className="badge" style={{ padding: '0.1rem 0.4rem', fontSize: '0.65rem' }}>
              Student Developers
            </span>
          </div>
        </div>
      </div>

      {/* Dataset Provenance & Governance Note */}
      <div className="footer-bottom-row">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <ShieldCheck size={13} color="var(--status-positive)" />
          <span>Strict Data Governance: Zero hallucinated revenue or foot traffic forecasts.</span>
        </div>
        <span>
          Source: Active Mongo snapshot <code>usa-corridors-20260906-r2</code> (NYC H3-10 canonical / DFW Voronoi envelopes)
        </span>
      </div>
    </footer>
  );
};
