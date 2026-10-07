import React from 'react';

interface DaliLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const DaliLogo: React.FC<DaliLogoProps> = ({
  className = '',
  variant = 'light',
  size = 'md',
  showSubtitle = true,
}) => {
  const isLight = variant === 'light'; // Light background (black text) or Dark background (white text)
  const textColor = isLight ? 'text-slate-900' : 'text-white';
  const subtitleColor = isLight ? 'text-slate-600' : 'text-slate-400';
  const emblemMainColor = isLight ? '#0F172A' : '#FFFFFF';

  // Dimension scaling
  const emblemSizes = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const titleSizes = {
    sm: 'text-base font-extrabold tracking-tight',
    md: 'text-xl font-extrabold tracking-tight',
    lg: 'text-2xl font-black tracking-tight',
  };

  const subSizes = {
    sm: 'text-[9px] tracking-widest',
    md: 'text-[10px] tracking-widest',
    lg: 'text-xs tracking-wider',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Emblem SVG Icon */}
      <div className={`relative flex-shrink-0 ${emblemSizes[size]} transition-transform duration-200 hover:scale-105`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
          aria-label="Logo Dali Électricité"
        >
          {/* Outer circle accent glow (subtle) */}
          <circle cx="50" cy="50" r="46" fill="#FACC15" fillOpacity="0.08" />

          {/* Dynamic Stylized "D" Body */}
          <path
            d="M28 22H52C68 22 78 33 78 50C78 67 68 78 52 78H28V22ZM40 34V66H50C60 66 66 59 66 50C66 41 60 34 50 34H40Z"
            fill={emblemMainColor}
          />

          {/* Upward dynamic electric arrow launching from base */}
          <path
            d="M32 78C32 78 40 82 48 81C58 80 66 74 72 66L82 76L88 52L64 56L72 64C66 70 59 74 51 74C45 74 38 72 32 78Z"
            fill={emblemMainColor}
          />

          {/* Embedded Electrical Plug symbol on the arrow path */}
          <g transform="translate(60, 58) rotate(42)">
            <rect x="0" y="0" width="10" height="7" rx="1.5" fill="#EAB308" />
            <rect x="10" y="1" width="5" height="1.5" fill="#CA8A04" />
            <rect x="10" y="4.5" width="5" height="1.5" fill="#CA8A04" />
          </g>

          {/* Vibrant Electric Lightning Bolt traversing through center */}
          <polygon
            points="54,12 36,46 48,46 42,76 66,38 52,38"
            fill="#FACC15"
            stroke="#CA8A04"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* High voltage energetic core highlight */}
          <polygon
            points="52,22 41,45 47,45 43,62 57,41 49,41"
            fill="#FEF08A"
          />
        </svg>
      </div>

      {/* Typography Lockup */}
      <div className="flex flex-col leading-none">
        <div className={`flex items-center uppercase ${textColor} ${titleSizes[size]}`}>
          <span>DALI</span>
          <span className="text-amber-400">ÉLECTRICITÉ</span>
        </div>
        {showSubtitle && (
          <span className={`font-semibold uppercase ${subtitleColor} ${subSizes[size]} mt-0.5`}>
            ÉLECTRICITÉ GÉNÉRALE &amp; AUTOMATISMES
          </span>
        )}
      </div>
    </div>
  );
};
