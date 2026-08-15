import React from 'react';

interface TempoLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'color';
  showSubtitle?: boolean;
}

export const TempoLogo: React.FC<TempoLogoProps> = ({
  size = 'md',
  variant = 'color',
  showSubtitle = true,
}) => {
  const sizeMap = {
    sm: { circle: 'w-9 h-9', text: 'text-lg', sub: 'text-[9px]' },
    md: { circle: 'w-11 h-11', text: 'text-xl', sub: 'text-[10px]' },
    lg: { circle: 'w-16 h-16', text: 'text-2xl', sub: 'text-xs' },
    xl: { circle: 'w-20 h-20', text: 'text-3xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Italian Themed Vector Emblem (Lightweight inline SVG) */}
      <div
        id="tempo-emblem-badge"
        className={`relative ${currentSize.circle} shrink-0 rounded-full shadow-md transition-transform hover:scale-105 flex items-center justify-center`}
      >
        <svg
          viewBox="0 0 48 48"
          className="w-full h-full drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Outer golden rim gradient */}
            <linearGradient id="tempoGoldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            
            {/* Flame gradient */}
            <linearGradient id="tempoFireGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="55%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>

            {/* Inner flame core */}
            <linearGradient id="tempoFireCore" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>

            {/* Dark wood-oven stone background */}
            <radialGradient id="tempoOvenBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#292524" />
              <stop offset="100%" stopColor="#0c0a09" />
            </radialGradient>
          </defs>

          {/* Background circle */}
          <circle cx="24" cy="24" r="23" fill="url(#tempoOvenBg)" />

          {/* Italian Tri-color Top Arc Band */}
          {/* Green (Left) */}
          <path
            d="M 5.8 15 A 22 22 0 0 1 17.5 3.2 L 19 8 A 17 17 0 0 0 9.8 17.5 Z"
            fill="#15803d"
          />
          {/* White (Center) */}
          <path
            d="M 17.5 3.2 A 22 22 0 0 1 30.5 3.2 L 29 8 A 17 17 0 0 0 19 8 Z"
            fill="#ffffff"
          />
          {/* Red (Right) */}
          <path
            d="M 30.5 3.2 A 22 22 0 0 1 42.2 15 L 38.2 17.5 A 17 17 0 0 0 29 8 Z"
            fill="#dc2626"
          />

          {/* Circular Gold Border */}
          <circle
            cx="24"
            cy="24"
            r="22"
            fill="none"
            stroke="url(#tempoGoldBorder)"
            strokeWidth="2"
          />
          <circle
            cx="24"
            cy="24"
            r="20.5"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="0.5"
            opacity="0.6"
          />

          {/* Stone Pizza Oven Dome Outline */}
          <path
            d="M 12 36 C 12 25 17 18 24 18 C 31 18 36 25 36 36 Z"
            fill="#1c1917"
            stroke="#78350f"
            strokeWidth="1.5"
          />

          {/* Oven Stone Hearth Base */}
          <rect
            x="10"
            y="35"
            width="28"
            height="3.5"
            rx="1.75"
            fill="#78350f"
            stroke="#b45309"
            strokeWidth="0.75"
          />

          {/* Inner Oven Chamber Opening */}
          <path
            d="M 16 35 C 16 28 19 23.5 24 23.5 C 29 23.5 32 28 32 35 Z"
            fill="#0c0a09"
          />

          {/* Pizza Oven Flame - Outer */}
          <path
            d="M 24 23 C 21 27 20 29.5 20 32 C 20 34.5 21.8 35 24 35 C 26.2 35 28 34.5 28 32 C 28 29.5 27 27 24 23 Z"
            fill="url(#tempoFireGradient)"
          />

          {/* Pizza Oven Flame - Core */}
          <path
            d="M 24 26.5 C 22.5 29 22 30.5 22 32.5 C 22 34 23 34.5 24 34.5 C 25 34.5 26 34 26 32.5 C 26 30.5 25.5 29 24 26.5 Z"
            fill="url(#tempoFireCore)"
          />

          {/* Small Golden Crown / Stars atop Oven */}
          <path
            d="M 20 16 L 22 13 L 24 15 L 26 13 L 28 16 Z"
            fill="#fbbf24"
            stroke="#b45309"
            strokeWidth="0.5"
          />
          <circle cx="24" cy="11.5" r="1" fill="#f59e0b" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-black tracking-tight font-heading ${
              variant === 'light' ? 'text-white' : 'text-[#1c1917]'
            } ${currentSize.text}`}
          >
            TEMPO
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
        </div>
        {showSubtitle && (
          <span
            className={`font-semibold tracking-wider uppercase ${
              variant === 'light' ? 'text-amber-200' : 'text-[#15803d]'
            } ${currentSize.sub}`}
          >
            Home made
          </span>
        )}
      </div>
    </div>
  );
};
