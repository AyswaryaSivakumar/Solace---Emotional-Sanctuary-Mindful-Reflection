import React from 'react';

interface SolaceLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
}

export const SolaceLogo: React.FC<SolaceLogoProps> = ({
  className = '',
  size = 32,
  showText = false,
  textColor = '#C26145',
}) => {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {/* Organic Terracotta & Sage Sun-Leaf Logo */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-label="Solace Logo"
      >
        {/* Soft background glow */}
        <circle cx="50" cy="50" r="46" fill="#FBF7F0" />
        
        {/* Rising sage sun circle */}
        <path
          d="M38 48 C38 41 43 35 50 35 C57 35 62 41 62 48 Z"
          fill="#889A84"
        />

        {/* Sage sun rays */}
        <line x1="50" y1="26" x2="50" y2="31" stroke="#889A84" strokeWidth="3" strokeLinecap="round" />
        <line x1="40" y1="29" x2="43" y2="34" stroke="#889A84" strokeWidth="3" strokeLinecap="round" />
        <line x1="60" y1="29" x2="57" y2="34" stroke="#889A84" strokeWidth="3" strokeLinecap="round" />
        <line x1="33" y1="36" x2="38" y2="39" stroke="#889A84" strokeWidth="3" strokeLinecap="round" />
        <line x1="67" y1="36" x2="62" y2="39" stroke="#889A84" strokeWidth="3" strokeLinecap="round" />
        <line x1="30" y1="45" x2="35" y2="45" stroke="#889A84" strokeWidth="3" strokeLinecap="round" />
        <line x1="70" y1="45" x2="65" y2="45" stroke="#889A84" strokeWidth="3" strokeLinecap="round" />

        {/* Terracotta outer stylized petal/arch line */}
        <path
          d="M31 52 C28 42 33 26 49 24 C64 22 71 25 71 39 C71 52 68 62 55 64"
          stroke="#C26145"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Terracotta sweeping bottom leaf */}
        <path
          d="M32 62 C34 50 43 45 54 42 C67 38 71 45 70 54 C69 63 60 67 47 67 C39 67 36 60 42 55 C48 51 59 47 64 45"
          stroke="#C26145"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Leaf central vein accent */}
        <path
          d="M52 50 C56 48 59 46 62 46"
          stroke="#C26145"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>

      {showText && (
        <span
          className="font-serif tracking-normal text-xl font-medium"
          style={{ color: textColor }}
        >
          Solace
        </span>
      )}
    </div>
  );
};
