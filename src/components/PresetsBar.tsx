import React from 'react';
import { Sparkles } from 'lucide-react';
import { getDemoPresets } from '../data/loader';

interface PresetsBarProps {
  activePresetId: string | null;
  onSelectPreset: (preset: ReturnType<typeof getDemoPresets>[0]) => void;
}

export const PresetsBar: React.FC<PresetsBarProps> = ({
  activePresetId,
  onSelectPreset,
}) => {
  const presets = getDemoPresets();

  return (
    <div className="presets-strip" aria-label="Curated Demo Scenarios">
      <span className="presets-label">
        <Sparkles size={14} />
        Demo Presets:
      </span>
      {presets.map((p) => {
        const isActive = activePresetId === p.id;
        return (
          <button
            key={p.id}
            id={`preset-${p.id}`}
            className={`preset-chip ${isActive ? 'active' : ''}`}
            onClick={() => onSelectPreset(p)}
            title={p.tagline}
          >
            <strong>{p.name}</strong>
          </button>
        );
      })}
    </div>
  );
};
