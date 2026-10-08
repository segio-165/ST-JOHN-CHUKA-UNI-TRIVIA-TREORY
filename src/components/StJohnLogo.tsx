import React from 'react';

interface StJohnLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'crest-only' | 'badge';
  invertText?: boolean;
}

export const StJohnLogo: React.FC<StJohnLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
  invertText = false,
}) => {
  // Dimensions map
  const crestDimensions = {
    sm: { width: 32, height: 32 },
    md: { width: 44, height: 44 },
    lg: { width: 56, height: 56 },
    xl: { width: 72, height: 72 },
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Official St John Ambulance Style Roundel with 8-Point Maltese Cross & Gold Ring */}
      <svg
        width={crestDimensions.width}
        height={crestDimensions.height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm select-none"
        aria-label="St John Ambulance Crest"
      >
        {/* Outer Black Border */}
        <circle cx="50" cy="50" r="49" fill="#111111" stroke="#FFD100" strokeWidth="2.5" />
        
        {/* Deep St John Ambulance Green Inner Field */}
        <circle cx="50" cy="50" r="44" fill="#005A36" stroke="#FFD100" strokeWidth="1.5" />
        
        {/* Thin Gold Concentric Guideline */}
        <circle cx="50" cy="50" r="38" fill="#003D24" stroke="#FFD100" strokeWidth="1" strokeDasharray="2 2" />

        {/* Iconic St John 8-Pointed Maltese Cross (Four V-shaped Arms meeting in center) */}
        <g fill="#FFFFFF" stroke="#111111" strokeWidth="0.8">
          {/* Top Arm */}
          <polygon points="50,49 33,18 50,26 67,18" />
          {/* Bottom Arm */}
          <polygon points="50,51 33,82 50,74 67,82" />
          {/* Left Arm */}
          <polygon points="49,50 18,33 26,50 18,67" />
          {/* Right Arm */}
          <polygon points="51,50 82,33 74,50 82,67" />
        </g>

        {/* Center Roundel Anchor with St John Gold Accent */}
        <circle cx="50" cy="50" r="4" fill="#FFD100" stroke="#003D24" strokeWidth="1" />

        {/* Corner St John Beasts (Lion & Unicorn Stylized Gold Accents in the Four Angles) */}
        {/* Top-Right Angle */}
        <circle cx="64" cy="36" r="2.5" fill="#FFD100" />
        {/* Top-Left Angle */}
        <circle cx="36" cy="36" r="2.5" fill="#FFD100" />
        {/* Bottom-Left Angle */}
        <circle cx="36" cy="64" r="2.5" fill="#FFD100" />
        {/* Bottom-Right Angle */}
        <circle cx="64" cy="64" r="2.5" fill="#FFD100" />
      </svg>

      {/* Typography Wordmark (if variant includes text) */}
      {variant !== 'crest-only' && (
        <div className="flex flex-col justify-center text-left">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight uppercase leading-none ${
                size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : size === 'xl' ? 'text-2xl' : 'text-base sm:text-lg'
              } ${invertText ? 'text-white' : 'text-black'}`}
            >
              St John
            </span>
            <span className="font-extrabold text-[#FFD100] bg-black px-1.5 py-0.5 rounded text-[10px] sm:text-xs tracking-wider uppercase">
              Ambulance
            </span>
          </div>
          <span
            className={`font-semibold tracking-wider uppercase text-[10px] sm:text-[11px] mt-0.5 ${
              invertText ? 'text-yellow-400' : 'text-[#005A36]'
            }`}
          >
            First Aid 11th Edition Assessment
          </span>
        </div>
      )}
    </div>
  );
};

export const BattenburgPattern: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`h-2.5 w-full bg-[linear-gradient(90deg,#FFD100_0%,#FFD100_50%,#005A36_50%,#005A36_100%)] bg-[length:32px_100%] shadow-inner ${className}`}
      title="St John Ambulance High-Visibility Battenburg Pattern"
    />
  );
};
