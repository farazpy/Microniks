import React from 'react';
import { LOGO_URL } from '../data/content';

interface LogoProps {
  variant?: 'light' | 'dark' | 'footer';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  size = 'md',
  className = '',
  showTagline = false
}) => {
  const sizeClasses = {
    sm: { img: 'w-7 h-7 sm:w-9 sm:h-9', title: 'text-xs sm:text-base', sub: 'text-[9px] sm:text-[10px]' },
    md: { img: 'w-8 h-8 sm:w-11 sm:h-11', title: 'text-xs xs:text-sm sm:text-lg lg:text-xl', sub: 'text-[9px] sm:text-xs' },
    lg: { img: 'w-10 h-10 sm:w-14 sm:h-14', title: 'text-base sm:text-2xl', sub: 'text-xs sm:text-sm' }
  };

  const textColor = variant === 'dark' || variant === 'footer' 
    ? 'text-white' 
    : 'text-slate-900';

  const subTextColor = variant === 'dark' || variant === 'footer' 
    ? 'text-emerald-200' 
    : 'text-[#1B5E20]';

  return (
    <div className={`inline-flex items-center gap-1.5 sm:gap-3 select-none shrink-0 ${className}`}>
      {/* Official Cloudinary Brand Logo Image */}
      <div className={`relative shrink-0 rounded-lg sm:rounded-xl overflow-hidden bg-white p-0.5 border border-amber-300 shadow-sm ${sizeClasses[size].img}`}>
        <img
          src={LOGO_URL}
          alt="Micronik Agri Private Limited Logo"
          className="w-full h-full object-cover rounded-md sm:rounded-lg"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Brand Text & Tagline */}
      <div className="flex flex-col leading-tight shrink-0">
        <div className={`font-extrabold tracking-tight ${sizeClasses[size].title} ${textColor} flex items-center gap-1 sm:gap-1.5 whitespace-nowrap`}>
          <span className="whitespace-nowrap">MICRONIK</span>
          <span className="inline-block px-1 sm:px-1.5 py-0.2 sm:py-0.5 text-[8px] sm:text-[9px] font-extrabold uppercase rounded bg-[#1B5E20] text-white tracking-wider sm:tracking-widest shadow-sm shrink-0">
            AGRI
          </span>
        </div>
        <div className={`font-semibold ${sizeClasses[size].sub} ${subTextColor} tracking-wide whitespace-nowrap`}>
          <span className="hidden sm:inline">Private Limited • Doctors of Crops</span>
          <span className="sm:hidden">Doctors of Crops</span>
        </div>
        {showTagline && (
          <div className="text-[10px] sm:text-[11px] text-[#4CAF50] font-bold mt-0.5 truncate max-w-xs">
            Better Soil. Better Crops. Better Tomorrow.
          </div>
        )}
      </div>
    </div>
  );
};
