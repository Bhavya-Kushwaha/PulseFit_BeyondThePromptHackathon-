import React from 'react';
import {
  MetroId,
  BusinessCategory,
  RiskTolerance,
  Corridor,
  Archetype,
} from '../models/types';
import { MapPin, ArrowRight } from 'lucide-react';
import { ArchetypeIcon } from '../components/illustrations/ArchetypeIcon';

interface ScreenConceptBuilderProps {
  metroId: MetroId;
  onChangeMetro: (metro: MetroId) => void;
  category: BusinessCategory;
  onChangeCategory: (cat: BusinessCategory) => void;
  corridors: Corridor[];
  selectedCorridor: Corridor;
  onChangeCorridor: (corridorId: string) => void;
  archetypes: Archetype[];
  selectedArchetype: Archetype;
  onChangeArchetype: (archetypeId: string) => void;
  riskTolerance: RiskTolerance;
  onChangeRisk: (risk: RiskTolerance) => void;
  onProceed: () => void;
}

export const ScreenConceptBuilder: React.FC<ScreenConceptBuilderProps> = ({
  metroId,
  onChangeMetro,
  category,
  onChangeCategory,
  corridors,
  selectedCorridor,
  onChangeCorridor,
  archetypes,
  selectedArchetype,
  onChangeArchetype,
  riskTolerance,
  onChangeRisk,
  onProceed,
}) => {
  // Filter archetypes by category
  const filteredArchetypes = archetypes.filter((a) => a.category_id === category);

  // Group corridors by district
  const districtMap = new Map<string, Corridor[]>();
  for (const c of corridors) {
    const d = c.district || 'Other';
    if (!districtMap.has(d)) districtMap.set(d, []);
    districtMap.get(d)!.push(c);
  }

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="card-header" style={{ marginBottom: 0 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
            <span className="badge neutral">STAGE 01: BUILD</span>
          </div>
          <h2 className="card-title" style={{ fontSize: '1.6rem' }}>
            Build Your Operating Concept
          </h2>
          <p className="card-subtitle" style={{ fontSize: '0.9rem' }}>
            Select your corridor, target format, and risk preference to evaluate operating model viability.
          </p>
        </div>
      </div>

      <div className="grid-form">
        {/* Metro Selection */}
        <div className="form-group">
          <label className="form-label" htmlFor="select-metro">
            <span>Target Metro</span>
            <span>{corridors.length} corridors</span>
          </label>
          <select
            id="select-metro"
            className="select-control"
            value={metroId}
            onChange={(e) => onChangeMetro(e.target.value as MetroId)}
          >
            <option value="nyc">New York City (Canonical H3-10)</option>
            <option value="dallas-fort-worth">Dallas–Fort Worth (Activity Envelopes)</option>
          </select>
        </div>

        {/* Business Category */}
        <div className="form-group">
          <label className="form-label" htmlFor="select-category">
            <span>Business Category</span>
            <span>{filteredArchetypes.length} formats</span>
          </label>
          <select
            id="select-category"
            className="select-control"
            value={category}
            onChange={(e) => onChangeCategory(e.target.value as BusinessCategory)}
          >
            <option value="CAFE">Café & Coffeehouse</option>
            {metroId === 'dallas-fort-worth' && (
              <option value="RESTAURANT">Restaurant & Food Service</option>
            )}
          </select>
        </div>

        {/* Corridor Selection */}
        <div className="form-group">
          <label className="form-label" htmlFor="select-corridor">
            <span>Select Corridor</span>
            <span>District: {selectedCorridor.district}</span>
          </label>
          <select
            id="select-corridor"
            className="select-control"
            value={selectedCorridor.corridor_id}
            onChange={(e) => onChangeCorridor(e.target.value)}
          >
            {Array.from(districtMap.entries()).map(([district, corrs]) => (
              <optgroup key={district} label={district}>
                {corrs.map((c) => (
                  <option key={c.corridor_id} value={c.corridor_id}>
                    {c.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Archetype / Operating Model Selection */}
        <div className="form-group">
          <label className="form-label" htmlFor="select-archetype">
            <span>Operating Format (Archetype)</span>
            <span style={{ color: 'var(--accent-amber)' }}>Track: {selectedArchetype.decision_track}</span>
          </label>
          <select
            id="select-archetype"
            className="select-control"
            value={selectedArchetype.archetype_id}
            onChange={(e) => onChangeArchetype(e.target.value)}
          >
            {filteredArchetypes.map((a) => (
              <option key={a.archetype_id} value={a.archetype_id}>
                {a.name} [{a.decision_track === 'OPEN_MARKET_SITE' ? 'Open Market' : a.decision_track === 'CONTROLLED_HOST' ? 'Controlled Host' : 'Live Opportunity'}]
              </option>
            ))}
          </select>
        </div>

        {/* Risk Tolerance Preference */}
        <div className="form-group">
          <label className="form-label" htmlFor="select-risk">
            <span>Risk Tolerance</span>
            <span>
              {riskTolerance === 'CONSERVATIVE'
                ? 'High Peak Penalty'
                : riskTolerance === 'MODERATE'
                ? 'Balanced Evaluation'
                : 'Growth Priority'}
            </span>
          </label>
          <select
            id="select-risk"
            className="select-control"
            value={riskTolerance}
            onChange={(e) => onChangeRisk(e.target.value as RiskTolerance)}
          >
            <option value="CONSERVATIVE">Conservative (Heavy peak-trap & fragility penalty)</option>
            <option value="MODERATE">Moderate (Balanced standard operator profile)</option>
            <option value="AGGRESSIVE">Aggressive (Tolerates narrow spikes for raw volume)</option>
          </select>
        </div>
      </div>

      {/* Selected Corridor & Format Brief */}
      <div
        style={{
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={16} color="var(--brand-navy)" />
            <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>
              {selectedCorridor.name}
            </strong>
            <span className="badge neutral">{selectedCorridor.district}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div className="archetype-icon-box" style={{ padding: '0.35rem', background: '#ffffff' }} title={`Selected Format: ${selectedArchetype.name}`}>
              <ArchetypeIcon name={selectedArchetype.name} category={category} size={22} color="var(--brand-navy)" />
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Model: <strong style={{ color: 'var(--text-primary)' }}>{selectedArchetype.name}</strong>
            </span>
          </div>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          {selectedCorridor.character || 'Urban corridor with mixed residential, daytime worker, and transit traffic.'}
        </p>

        {/* Small Conceptual Demand Flow Strip */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', background: '#ffffff', padding: '0.5rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.725rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
            <span style={{ color: 'var(--brand-teal)', fontWeight: 700 }}>● DEMAND DYNAMICS:</span>
            <span>AM ({selectedCorridor.dayparts.weekday_am})</span>
            <span>→</span>
            <span>Midday ({selectedCorridor.dayparts.weekday_midday})</span>
            <span>→</span>
            <span>Evening ({selectedCorridor.dayparts.weekday_evening})</span>
            <span>→</span>
            <span>Weekend ({selectedCorridor.dayparts.weekend_day})</span>
          </div>
          <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            Conceptual visualization · Baseline dayparts
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
          <span style={{ color: 'var(--text-muted)' }}>
            Dominant Audience: <strong style={{ color: 'var(--text-primary)' }}>{selectedCorridor.dominant_audience.join(', ') || 'General Urban'}</strong>
          </span>
          <span>•</span>
          <span style={{ color: 'var(--text-muted)' }}>
            Governance: <strong style={{ color: selectedArchetype.decision_track === 'OPEN_MARKET_SITE' ? 'var(--status-positive)' : 'var(--status-warning)' }}>
              {selectedArchetype.decision_track}
            </strong>
          </span>
          <span>•</span>
          <span style={{ color: 'var(--text-muted)' }}>
            Mandatory Gate: <span style={{ color: 'var(--text-secondary)' }}>{selectedArchetype.required_gate || 'None'}</span>
          </span>
        </div>
      </div>

      {/* Proceed CTA */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
        <button
          id="btn-evaluate-concept"
          className="btn-primary"
          onClick={onProceed}
          style={{ padding: '0.85rem 2.25rem', fontSize: '0.95rem' }}
        >
          ANALYZE WITH PULSEFIT
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
