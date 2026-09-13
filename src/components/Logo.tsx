import React from 'react';

export const BRAND_LOGO_URL =
  'https://blogger.googleusercontent.com/img/a/AVvXsEjZh0GKembZa2waLUl7rAtYp5hRRR7slltLOKFxBznojYLn8U4iTPtMjfJdgb8-3zjGCA72fdgvnH23LvLxImweiCqeLVyjWfgA_5bFUafb14hEvwEas6ccUN6Y8MDRlYLXmv46bFNAOW-kAGsob4Fu7liEMpRMXtR66DELBNBYURi-p2zgbHWLpsmmeQA';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'light' | 'dark'; // kept for backward-compatibility
}

export const BrandIconMark: React.FC<{ size?: number; className?: string }> = ({
  size = 48,
  className = '',
}) => {
  return (
    <img
      src={BRAND_LOGO_URL}
      alt="Shrinath IT Solutions Logo"
      style={{ height: `${size}px`, width: 'auto' }}
      className={`object-contain flex-shrink-0 ${className}`}
      referrerPolicy="no-referrer"
    />
  );
};

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'lg',
}) => {
  const heightClasses = {
    sm: 'h-8 sm:h-10',
    md: 'h-10 sm:h-12 md:h-14',
    lg: 'h-11 sm:h-12 md:h-14 lg:h-16',
    xl: 'h-16 sm:h-20 md:h-24 lg:h-28',
    '2xl': 'h-20 sm:h-26 md:h-32',
  };

  return (
    <div id="brand-logo" className={`inline-flex items-center select-none ${className}`}>
      <img
        src={BRAND_LOGO_URL}
        alt="Shrinath IT Solutions"
        className={`${heightClasses[size]} w-auto max-w-full object-contain transition-transform duration-200 hover:scale-[1.03]`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

