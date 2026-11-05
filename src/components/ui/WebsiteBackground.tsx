import React from 'react';
import { ROMANTIC_DATA } from '../../data/romanticContent';

interface WebsiteBackgroundProps {
  isVisible: boolean;
}

export const WebsiteBackground: React.FC<WebsiteBackgroundProps> = ({ isVisible }) => {
  return (
    <div
      className={`fixed inset-0 w-full h-full z-0 pointer-events-none transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Constant Fullscreen Background Image - Fixed viewport container ensures 60 FPS smooth scrolling on mobile & desktop */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-no-repeat transition-all duration-700"
        style={{
          backgroundImage: `url(${ROMANTIC_DATA.birthdayGirlImage})`,
          backgroundPosition: 'center 20%',
        }}
      />

      {/* Romantic Overlay Shades: Perfectly balanced for clarity and legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0314]/50 via-[#170D29]/40 to-[#0B0314]/60 transition-all duration-700" />

      {/* Subtle Burgundy/Rose Color Harmony Overlay */}
      <div className="absolute inset-0 bg-[#4A001F]/20 mix-blend-color" />
      <div className="absolute inset-0 radial-vignette opacity-70" />
    </div>
  );
};
