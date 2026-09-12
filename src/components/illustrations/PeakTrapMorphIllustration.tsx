import React from 'react';

interface PeakTrapMorphIllustrationProps {
  sliderVal: number; // 0 to 60
  dominantDaypartLabel: string;
  originalFit: number;
  stressedFit: number;
  className?: string;
  style?: React.CSSProperties;
}

export const PeakTrapMorphIllustration: React.FC<PeakTrapMorphIllustrationProps> = ({
  sliderVal,
  dominantDaypartLabel,
  originalFit,
  stressedFit,
  className = '',
  style,
}) => {
  // Compression factor from 0.0 (no stress) to 1.0 (max stress at 60%)
  const compressionRatio = Math.min(1, Math.max(0, sliderVal / 60));

  // Dynamic peak coordinates for Fragile Model (Single Peak)
  // Baseline peak at y = 35, flattens down to y = 115 at max stress
  const peakY = 35 + compressionRatio * 80;
  const baseLineY = 150;

  // Color transition for fragile peak: starts at amber (#b45309), becomes coral/red (#be123c)
  const isSevere = sliderVal >= 35;
  const fragileStrokeColor = isSevere ? '#be123c' : sliderVal > 15 ? '#d97706' : '#b45309';
  const fragileFillColor = isSevere ? 'rgba(190, 18, 60, 0.12)' : 'rgba(217, 119, 6, 0.08)';

  // Resilient Model: Dual-peak profile stays stable at y = 70
  const resilientStrokeColor = '#047857';
  const resilientFillOpacity = 0.05 + compressionRatio * 0.15; // Brightens under stress as contrast

  return (
    <div
      className={`peak-trap-morph-container ${className}`}
      style={{
        background: '#ffffff',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '1.25rem',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        ...style,
      }}
    >
      {/* Eyebrow & Live Status */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
          fontSize: '0.675rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: fragileStrokeColor,
              transition: 'background-color 300ms ease',
            }}
          />
          DEMAND PROFILE STRESS METAPHOR
        </span>
        <span style={{ fontStyle: 'italic' }}>CONCEPTUAL VISUALIZATION · DYNAMIC RESPONSE</span>
      </div>

      {/* SVG Dual-Model Responsive Canvas */}
      <div style={{ position: 'relative', width: '100%' }}>
        <svg
          viewBox="0 0 540 185"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: 'auto', display: 'block' }}
          aria-hidden="true"
        >
          {/* Base Zero Line */}
          <line x1="20" y1={baseLineY} x2="520" y2={baseLineY} stroke="#e4e4e7" strokeWidth="1.5" />

          {/* Time axis ticks & labels */}
          <g fontSize="7.5" fontFamily="var(--font-mono)" fill="#a1a1aa" textAnchor="middle">
            <text x="60" y="165">EARLY AM</text>
            <text x="160" y="165">MIDDAY</text>
            <text x="270" y="165">PEAK WINDOW ({dominantDaypartLabel.toUpperCase()})</text>
            <text x="390" y="165">EVENING</text>
            <text x="480" y="165">LATE</text>
          </g>

          {/* 1. RESILIENT MODEL: DIVERSIFIED MULTI-PEAK PROFILE (Stable & Buffered) */}
          {/* Shaded Area under resilient curve */}
          <path
            d={`M 25,${baseLineY}
               C 70,${baseLineY} 95,75 140,75
               C 185,75 220,110 270,110
               C 320,110 355,70 400,70
               C 445,70 475,${baseLineY} 515,${baseLineY}
               Z`}
            fill={`rgba(4, 120, 87, ${resilientFillOpacity})`}
            style={{ transition: 'fill 300ms ease' }}
          />

          {/* Resilient Stroke */}
          <path
            d={`M 25,${baseLineY}
               C 70,${baseLineY} 95,75 140,75
               C 185,75 220,110 270,110
               C 320,110 355,70 400,70
               C 445,70 475,${baseLineY} 515,${baseLineY}`}
            stroke={resilientStrokeColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="4 3"
          />

          {/* Resilient Crest Nodes */}
          <circle cx="140" cy="75" r="3.5" fill="#ffffff" stroke={resilientStrokeColor} strokeWidth="2" />
          <circle cx="400" cy="70" r="3.5" fill="#ffffff" stroke={resilientStrokeColor} strokeWidth="2" />

          {/* 2. FRAGILE MODEL: CONCENTRATED SINGLE-PEAK PROFILE (Reacts to Slider) */}
          {/* Ghost outline showing original un-stressed peak for direct comparison */}
          {sliderVal > 0 && (
            <path
              d={`M 25,${baseLineY}
                 C 130,${baseLineY} 190,35 270,35
                 C 350,35 410,${baseLineY} 515,${baseLineY}`}
              stroke="#d4d4d8"
              strokeWidth="1.5"
              strokeDasharray="2 2"
              fill="none"
              opacity="0.7"
            />
          )}

          {/* Dynamic Stressed Fragile Area */}
          <path
            d={`M 25,${baseLineY}
               C 130,${baseLineY} 190,${peakY} 270,${peakY}
               C 350,${peakY} 410,${baseLineY} 515,${baseLineY}
               Z`}
            fill={fragileFillColor}
            style={{ transition: 'all 200ms ease-out' }}
          />

          {/* Dynamic Stressed Fragile Stroke */}
          <path
            d={`M 25,${baseLineY}
               C 130,${baseLineY} 190,${peakY} 270,${peakY}
               C 350,${peakY} 410,${baseLineY} 515,${baseLineY}`}
            stroke={fragileStrokeColor}
            strokeWidth="3"
            strokeLinecap="round"
            style={{ transition: 'all 200ms ease-out' }}
          />

          {/* Moving Apex Node */}
          <circle
            cx="270"
            cy={peakY}
            r="5.5"
            fill="#ffffff"
            stroke={fragileStrokeColor}
            strokeWidth="2.5"
            style={{ transition: 'all 200ms ease-out' }}
          />
          <circle
            cx="270"
            cy={peakY}
            r="2.5"
            fill={fragileStrokeColor}
            style={{ transition: 'all 200ms ease-out' }}
          />

          {/* Downward Compression Arrow when stressed */}
          {sliderVal > 0 && (
            <g opacity="0.9" style={{ transition: 'opacity 200ms ease' }}>
              <line x1="270" y1="36" x2="270" y2={peakY - 9} stroke={fragileStrokeColor} strokeWidth="1.5" strokeDasharray="2 2" />
              <polygon
                points={`267,${peakY - 9} 273,${peakY - 9} 270,${peakY - 5}`}
                fill={fragileStrokeColor}
              />
              <rect x="290" y={Math.max(22, peakY - 18)} width="95" height="18" rx="3" fill="#ffffff" stroke={fragileStrokeColor} strokeWidth="1" />
              <text x="337" y={Math.max(34, peakY - 6)} fontSize="8" fontFamily="var(--font-mono)" fontWeight="700" fill={fragileStrokeColor} textAnchor="middle">
                -{sliderVal}% SHOCK DECAY
              </text>
            </g>
          )}

          {/* 3. INLINE LEGEND / LABELS */}
          <g fontSize="8" fontFamily="var(--font-mono)" fontWeight="700">
            {/* Fragile Model Label */}
            <text x="35" y="42" fill={fragileStrokeColor}>
              ● FRAGILE (CONCENTRATED)
            </text>
            <text x="35" y="54" fontSize="7" fill="#71717a" fontWeight="400">
              {sliderVal === 0 ? 'Exaggerated Single Peak' : `Peak Collapse (Fit: ${originalFit} → ${stressedFit})`}
            </text>

            {/* Resilient Model Label */}
            <text x="380" y="42" fill={resilientStrokeColor}>
              --- RESILIENT (DIVERSIFIED)
            </text>
            <text x="380" y="54" fontSize="7" fill="#71717a" fontWeight="400">
              Multi-Occasion Absorption Buffer
            </text>
          </g>
        </svg>
      </div>

      {/* Narrative Synthesis Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
          paddingTop: '0.5rem',
          borderTop: '1px solid var(--border-subtle)',
          fontSize: '0.725rem',
        }}
      >
        <div style={{ color: 'var(--text-secondary)' }}>
          <strong style={{ color: fragileStrokeColor }}>
            {sliderVal === 0
              ? 'Concentrated demand creates maximum vulnerability to clock shifts.'
              : `A ${sliderVal}% dip in ${dominantDaypartLabel} collapses single-clock revenue.`}
          </strong>{' '}
          <span style={{ color: 'var(--status-positive)', fontWeight: 600 }}>
            Diversified formats absorb the shock through adjacent windows.
          </span>
        </div>

        <div style={{ fontSize: '0.675rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          “Concentrated demand is fragile · Diversified demand is resilient”
        </div>
      </div>
    </div>
  );
};
