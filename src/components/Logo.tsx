import React, { useState } from 'react';

export const BRAND_LOGO_URL =
  'https://blogger.googleusercontent.com/img/a/AVvXsEiREYJZDJg7jMQx0vNSoNcHUkPOlpdcswCO-IXG8MQb2jopjWVEDRB-5Vq0N5HvdRx4xoSeXjzhE-Rchu4WQNEwycQCPYuYCW3uTZn3Bn6Hy6i-3vPYEnj7eZ0nObHESX_lyYg5lm1U4HAqlrsiPaNI6etlfanZLgnjUQrP3VO8ujkeSYcRIuSIvDFIdYU=s1600';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'lg',
  showText = false,
}) => {
  const [imageError, setImageError] = useState(false);

  const iconSizes = {
    sm: 'h-10 w-auto min-w-[40px]',
    md: 'h-12 sm:h-14 w-auto min-w-[50px]',
    lg: 'h-14 sm:h-16 w-auto min-w-[64px]',
    xl: 'h-16 sm:h-20 w-auto min-w-[80px]',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const subSizes = {
    sm: 'text-[9px] tracking-[0.2em]',
    md: 'text-[11px] tracking-[0.24em]',
    lg: 'text-xs tracking-[0.3em]',
    xl: 'text-sm tracking-[0.35em]',
  };

  return (
    <div id="brand-logo" className={`flex items-center group select-none cursor-pointer ${className}`}>
      {/* Brand Logo Image (Clean & Premium without neon glow) */}
      <div className={`relative ${iconSizes[size]} flex-shrink-0 flex items-center justify-center rounded-xl overflow-hidden bg-slate-900/60 p-1 border border-slate-700/60 shadow-md transition-all duration-300 group-hover:scale-105 group-hover:border-slate-500`}>
        {!imageError ? (
          <img
            src={BRAND_LOGO_URL}
            alt="Shrinath IT Solutions"
            className="h-full w-auto object-contain drop-shadow-sm"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-sky-500 to-blue-700 text-white font-bold text-lg rounded-lg">
            S
          </div>
        )}
      </div>

      {/* Typography (Optional, hidden by default as requested) */}
      {showText && (
        <div className="flex flex-col justify-center ml-3">
          <div className="flex items-center gap-1.5 leading-tight">
            <span className={`font-bold text-white tracking-tight ${titleSizes[size]}`}>
              Shrinath
            </span>
            <span className={`font-extrabold text-blue-500 tracking-tight ${titleSizes[size]}`}>
              IT
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="h-[1px] w-2 bg-slate-600"></div>
            <span className={`font-semibold text-slate-300 uppercase ${subSizes[size]}`}>
              SOLUTIONS
            </span>
            <div className="h-[1px] w-2 bg-slate-600"></div>
          </div>
        </div>
      )}
    </div>
  );
};
