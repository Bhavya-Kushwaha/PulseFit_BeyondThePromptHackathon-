import React from 'react';

interface HeroCorridorIllustrationProps {
  className?: string;
  style?: React.CSSProperties;
}

export const HeroCorridorIllustration: React.FC<HeroCorridorIllustrationProps> = ({
  className = '',
  style,
}) => {
  return (
    <div
      className={`hero-illustration-container ${className}`}
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #ffffff 0%, #fcfbf9 100%)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '1.25rem 1.25rem 0.85rem 1.25rem',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Top Editorial Eyebrow */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5rem',
          fontSize: '0.675rem',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.06em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--brand-teal)',
            }}
          />
          CORRIDOR ADAPTIVE MODEL
        </span>
        <span style={{ fontStyle: 'italic' }}>CONCEPTUAL VISUALIZATION</span>
      </div>

      {/* SVG Vector Composition */}
      <svg
        viewBox="0 0 540 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        aria-hidden="true"
      >
        <defs>
          {/* Subtle horizontal gradient for fluctuating demand wave */}
          <linearGradient id="demandWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.2" />
            <stop offset="35%" stopColor="#0284c7" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#b45309" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.8" />
          </linearGradient>

          {/* Area fill under the demand waveform */}
          <linearGradient id="demandAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* 1. ARCHITECTURAL STREETSCAPE SILHOUETTES (Background Urban Fabric) */}
        <g stroke="#d4d4d8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
          {/* Ground Horizon Base */}
          <line x1="10" y1="185" x2="530" y2="185" stroke="#a1a1aa" strokeWidth="1.5" />

          {/* Building 1: Workplace Commercial Tower */}
          <rect x="25" y="65" width="55" height="120" rx="2" fill="#fafafa" />
          <line x1="38" y1="80" x2="68" y2="80" strokeDasharray="3 3" />
          <line x1="38" y1="95" x2="68" y2="95" strokeDasharray="3 3" />
          <line x1="38" y1="110" x2="68" y2="110" strokeDasharray="3 3" />
          <line x1="38" y1="125" x2="68" y2="125" strokeDasharray="3 3" />
          {/* Ground Floor Express Hatch */}
          <rect x="38" y="155" width="28" height="30" fill="#f4f4f5" />
          <path d="M35 155H70" stroke="#71717a" strokeWidth="1.5" />

          {/* Building 2: Mid-rise Mixed-Use Residential */}
          <rect x="95" y="95" width="70" height="90" rx="2" fill="#fafafa" />
          <rect x="108" y="110" width="16" height="20" rx="1" stroke="#e4e4e7" fill="#ffffff" />
          <rect x="136" y="110" width="16" height="20" rx="1" stroke="#e4e4e7" fill="#ffffff" />
          {/* Street Café Awning */}
          <path d="M92 152L100 142H160L168 152H92Z" fill="#f1f5f9" stroke="#71717a" />
          <rect x="108" y="152" width="44" height="33" fill="#ffffff" stroke="#71717a" />
          <line x1="130" y1="152" x2="130" y2="185" stroke="#71717a" />

          {/* Flow Indicator Dots (Pedestrians/Activity) */}
          <circle cx="185" cy="180" r="2" fill="#71717a" />
          <circle cx="195" cy="181" r="2.5" fill="#71717a" />
          <circle cx="210" cy="180" r="2" fill="#71717a" />

          {/* Building 3: Destination High-Street Corner */}
          <rect x="230" y="50" width="80" height="135" rx="2" fill="#fafafa" />
          <path d="M230 50L270 30L310 50" stroke="#71717a" strokeWidth="1.5" fill="#f4f4f5" />
          <circle cx="270" cy="42" r="3" fill="#0284c7" stroke="none" />
          <rect x="245" y="65" width="20" height="26" rx="10" stroke="#d4d4d8" fill="#ffffff" />
          <rect x="275" y="65" width="20" height="26" rx="10" stroke="#d4d4d8" fill="#ffffff" />
          <rect x="245" y="105" width="50" height="40" rx="1" stroke="#e4e4e7" fill="#ffffff" />
          {/* Grand Storefront Portal */}
          <path d="M255 185V150H285V185" stroke="#71717a" strokeWidth="1.5" fill="#f4f4f5" />

          {/* Building 4: Cultural / Evening Venue */}
          <rect x="330" y="80" width="75" height="105" rx="2" fill="#fafafa" />
          <path d="M330 95H405" stroke="#71717a" strokeWidth="1.2" />
          <text x="367" y="90" fontSize="7" fontFamily="var(--font-mono)" fill="#71717a" textAnchor="middle">
            VENUE
          </text>
          <rect x="345" y="145" width="45" height="40" stroke="#71717a" fill="#ffffff" />

          {/* Building 5: Neighborhood Corner Row */}
          <rect x="425" y="105" width="85" height="80" rx="2" fill="#fafafa" />
          <path d="M420 150L430 140H500L510 150H420Z" fill="#f1f5f9" stroke="#71717a" />
          <rect x="440" y="150" width="55" height="35" stroke="#71717a" fill="#ffffff" />

          {/* Street Furniture & Lights */}
          <line x1="85" y1="140" x2="85" y2="185" stroke="#a1a1aa" />
          <circle cx="85" cy="140" r="2.5" fill="#e4e4e7" stroke="#a1a1aa" />
          <line x1="320" y1="140" x2="320" y2="185" stroke="#a1a1aa" />
          <circle cx="320" cy="140" r="2.5" fill="#e4e4e7" stroke="#a1a1aa" />
          <line x1="418" y1="140" x2="418" y2="185" stroke="#a1a1aa" />
          <circle cx="418" cy="140" r="2.5" fill="#e4e4e7" stroke="#a1a1aa" />
        </g>

        {/* 2. DEMAND WAVEFORM PASSING THROUGH THE SCENE (Dynamic Fluctuating Curve) */}
        {/* Shaded Area under wave */}
        <path
          d="M 20,185 
             C 60,185 80,120 120,120 
             C 170,120 190,45 270,45 
             C 330,45 360,140 410,140 
             C 450,140 480,95 520,95 
             L 520,185 Z"
          fill="url(#demandAreaGrad)"
        />

        {/* Main Waveform Stroke */}
        <path
          d="M 20,185 
             C 60,185 80,120 120,120 
             C 170,120 190,45 270,45 
             C 330,45 360,140 410,140 
             C 450,140 480,95 520,95"
          stroke="url(#demandWaveGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* 3. STABLE / RESILIENT OPERATING PATHWAY (Continuous Adaptive Trajectory) */}
        {/* Straight resilient reference corridor line */}
        <line
          x1="20"
          y1="115"
          x2="520"
          y2="115"
          stroke="#047857"
          strokeWidth="2"
          strokeDasharray="6 4"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Strategic Nodes on the Resilient Pathway */}
        {/* Node 1: AM Demand Window */}
        <circle cx="120" cy="115" r="5" fill="#ffffff" stroke="#0284c7" strokeWidth="2.5" />
        <circle cx="120" cy="115" r="2" fill="#0284c7" />

        {/* Node 2: Peak Wave Window (Crossroads) */}
        <circle cx="270" cy="115" r="6" fill="#ffffff" stroke="#b45309" strokeWidth="2.5" />
        <circle cx="270" cy="115" r="2.5" fill="#b45309" />

        {/* Node 3: Evening Transition */}
        <circle cx="410" cy="115" r="5" fill="#ffffff" stroke="#047857" strokeWidth="2.5" />
        <circle cx="410" cy="115" r="2" fill="#047857" />

        {/* Node 4: Weekend All-Day Spread */}
        <circle cx="500" cy="115" r="5" fill="#ffffff" stroke="#047857" strokeWidth="2.5" />
        <circle cx="500" cy="115" r="2" fill="#047857" />

        {/* 4. CALLOUT LABELS & ADAPTATION ARROWS */}
        <g fontSize="8" fontFamily="var(--font-mono)" fontWeight="700">
          {/* Demand Wave Label */}
          <rect x="235" y="24" width="70" height="15" rx="3" fill="#ffffff" stroke="#0284c7" strokeWidth="1" />
          <text x="270" y="34" fill="#0284c7" textAnchor="middle">
            PEAK DEMAND
          </text>

          {/* Resilient Operating Pathway Tag */}
          <rect x="35" y="103" width="100" height="15" rx="3" fill="#ffffff" stroke="#047857" strokeWidth="1" />
          <text x="85" y="113" fill="#047857" textAnchor="middle">
            RESILIENT PATHWAY
          </text>
        </g>
      </svg>

      {/* Causal Narrative Bottom Bar: DEMAND -> CHANGE -> ADAPTATION -> RESILIENCE */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '0.65rem',
          paddingTop: '0.5rem',
          borderTop: '1px solid var(--border-subtle)',
          fontSize: '0.725rem',
          fontWeight: 600,
          color: 'var(--text-secondary)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--text-primary)' }}>DEMAND</span>
          <span style={{ color: 'var(--text-muted)' }}>→</span>
          <span style={{ color: 'var(--status-warning)' }}>CHANGE</span>
          <span style={{ color: 'var(--text-muted)' }}>→</span>
          <span style={{ color: 'var(--brand-teal)' }}>ADAPTATION</span>
          <span style={{ color: 'var(--text-muted)' }}>→</span>
          <span style={{ color: 'var(--status-positive)', fontWeight: 700 }}>RESILIENCE</span>
        </div>

        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          “Demand changes. Resilient businesses adapt.”
        </div>
      </div>
    </div>
  );
};
