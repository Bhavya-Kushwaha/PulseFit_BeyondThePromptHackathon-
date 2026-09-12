import React from 'react';

interface ArchetypeIconProps {
  name: string;
  category?: string;
  size?: number;
  className?: string;
  color?: string;
}

export const ArchetypeIcon: React.FC<ArchetypeIconProps> = ({
  name,
  category = 'CAFE',
  size = 24,
  className = '',
  color = 'currentColor',
}) => {
  const lower = name.toLowerCase();

  // Determine icon variant based on archetype characteristics
  let variant: 'neighborhood' | 'destination' | 'mobile' | 'workplace' | 'event' | 'bistro' | 'express' = 'neighborhood';

  if (lower.includes('mobile') || lower.includes('cart') || lower.includes('truck') || lower.includes('kiosk') || lower.includes('pop-up')) {
    variant = 'mobile';
  } else if (lower.includes('destination') || lower.includes('flagship') || lower.includes('roastery') || lower.includes('high-street')) {
    variant = 'destination';
  } else if (lower.includes('workplace') || lower.includes('office') || lower.includes('lobby') || lower.includes('corporate') || lower.includes('commuter')) {
    variant = 'workplace';
  } else if (lower.includes('event') || lower.includes('concession') || lower.includes('stadium') || lower.includes('theater')) {
    variant = 'event';
  } else if (lower.includes('bistro') || lower.includes('all-day') || lower.includes('dinner') || lower.includes('brunch') || category === 'RESTAURANT') {
    variant = 'bistro';
  } else if (lower.includes('express') || lower.includes('grab') || lower.includes('counter')) {
    variant = 'express';
  } else {
    variant = 'neighborhood';
  }

  const baseSvgProps = {
    width: size,
    height: size,
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: `archetype-icon ${className}`,
    'aria-hidden': true,
  };

  switch (variant) {
    case 'neighborhood':
      // Storefront with classic awning + connected neighborhood community nodes
      return (
        <svg {...baseSvgProps}>
          {/* Awning */}
          <path d="M8 20L12 11H36L40 20H8Z" />
          <path d="M8 20C8 22 11 23 14 22C17 21 19 23 24 23C29 23 31 21 34 22C37 23 40 22 40 20" />
          {/* Building Frame */}
          <rect x="11" y="23" width="26" height="19" rx="1" />
          <path d="M20 42V31H28V42" />
          <rect x="14" y="27" width="4" height="6" />
          <rect x="30" y="27" width="4" height="6" />
          {/* Neighborhood Community Nodes */}
          <circle cx="5" cy="11" r="2.5" />
          <path d="M7 12L11 14" strokeDasharray="1.5 1.5" />
          <circle cx="43" cy="11" r="2.5" />
          <path d="M41 12L37 14" strokeDasharray="1.5 1.5" />
        </svg>
      );

    case 'destination':
      // High-street architectural facade with distinctive destination beacon
      return (
        <svg {...baseSvgProps}>
          {/* Pediment / Classical roofline */}
          <path d="M24 6L40 16H8L24 6Z" />
          {/* Destination Pin Marker */}
          <circle cx="24" cy="11" r="2" fill={color} />
          {/* Structural Columns */}
          <path d="M12 16V38" />
          <path d="M20 16V38" />
          <path d="M28 16V38" />
          <path d="M36 16V38" />
          {/* Base Steps */}
          <path d="M6 38H42" />
          <path d="M4 42H44" />
          {/* Arched Portal */}
          <path d="M21 38V27C21 25.3 22.3 24 24 24C25.7 24 27 25.3 27 27V38" />
        </svg>
      );

    case 'mobile':
      // Compact mobile service unit / cart with service hatch and chassis
      return (
        <svg {...baseSvgProps}>
          {/* Cart Body */}
          <rect x="6" y="14" width="30" height="20" rx="3" />
          {/* Service Window */}
          <rect x="12" y="18" width="16" height="9" rx="1" />
          {/* Extended Awning */}
          <path d="M10 14L12 8H30L28 14" />
          {/* Wheels */}
          <circle cx="14" cy="38" r="4" />
          <circle cx="14" cy="38" r="1.5" fill={color} />
          <circle cx="28" cy="38" r="4" />
          <circle cx="28" cy="38" r="1.5" fill={color} />
          {/* Hitch / Handle */}
          <path d="M36 26H42V36" />
        </svg>
      );

    case 'workplace':
      // Commercial tower skyline + ground-floor express counter
      return (
        <svg {...baseSvgProps}>
          {/* Background Commercial Office Tower */}
          <path d="M24 6H38V42H24" />
          <path d="M29 12H33" />
          <path d="M29 18H33" />
          <path d="M29 24H33" />
          <path d="M29 30H33" />
          {/* Foreground Workplace Express Counter */}
          <rect x="8" y="20" width="16" height="22" rx="1" />
          <path d="M8 26H24" />
          <path d="M12 33H20" />
          <circle cx="16" cy="14" r="3" />
          <path d="M11 20C11 18 13 17 16 17C19 17 21 18 21 20" />
        </svg>
      );

    case 'event':
      // Event pavilion / marquee canopy with directional spotlight / flow
      return (
        <svg {...baseSvgProps}>
          {/* Canopy / Marquee */}
          <path d="M24 7L42 18L38 23L24 16L10 23L6 18L24 7Z" />
          <path d="M24 7V16" />
          {/* Service Pavilion */}
          <path d="M10 23V41" />
          <path d="M38 23V41" />
          <rect x="16" y="27" width="16" height="14" rx="1" />
          {/* Active Service Point Beam */}
          <circle cx="24" cy="33" r="2" />
          <path d="M20 41H28" />
          {/* Flow waves */}
          <path d="M4 36C6 34 8 38 10 36" />
          <path d="M38 36C40 34 42 38 44 36" />
        </svg>
      );

    case 'bistro':
      // All-day table setting with sun/moon daypart balance
      return (
        <svg {...baseSvgProps}>
          {/* Daypart Arc (Sun & Crescent Moon) */}
          <path d="M10 14C12 10 18 8 24 8C30 8 36 10 38 14" strokeDasharray="2 2" />
          <circle cx="14" cy="11" r="2.5" />
          <path d="M34 9C34 11.2 35.8 13 38 13" />
          {/* Café Bistro Table Setting */}
          <path d="M14 26C14 22 34 22 34 26H14Z" />
          <path d="M24 26V40" />
          <path d="M17 40H31" />
          {/* Chairs */}
          <path d="M10 26V36M7 36H13" />
          <path d="M38 26V36M35 36H41" />
        </svg>
      );

    case 'express':
    default:
      // Express takeaway counter / service hub
      return (
        <svg {...baseSvgProps}>
          <rect x="9" y="16" width="30" height="24" rx="2" />
          <path d="M9 24H39" />
          <path d="M16 24V40" />
          <path d="M25 30H32" />
          <path d="M25 34H30" />
          {/* Cup outline */}
          <path d="M20 10H28L27 16H21L20 10Z" />
          <path d="M28 12H30C30.6 12 31 12.4 31 13C31 13.6 30.6 14 30 14H27.5" />
        </svg>
      );
  }
};
