import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, X, Feather } from 'lucide-react';
import { ROMANTIC_DATA } from '../../data/romanticContent';
import { romanticAudio } from '../../utils/romanticAudio';

export const LoveLetterSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const letter = ROMANTIC_DATA.loveLetter;

  const handleOpen = () => {
    romanticAudio.playLetterOpenSound();
    setIsOpen(true);
  };

  const handleClose = () => {
    romanticAudio.playSparkleSound();
    setIsOpen(false);
  };

  return (
    <section id="letter" className="relative min-h-screen py-24 px-6 flex flex-col items-center justify-center bg-transparent overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#4A001F]/25 blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 text-center space-y-3 mb-12 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#170D29]/80 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-serif tracking-[0.25em] uppercase">
          <Feather className="w-3.5 h-3.5" />
          A Handwritten Love Vow From Your Bava
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#FFF8F5]">
          A Birthday Love Letter
        </h2>
        <p className="text-sm sm:text-base text-[#FFD6E0]/80 font-editorial italic">
          Written from the deepest chambers of my heart, sealed with gold, and dedicated to you.
        </p>
      </div>

      {/* 3D Interactive Envelope Experience */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        {!isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="group cursor-pointer select-none"
            onClick={handleOpen}
          >
            {/* Envelope Exterior */}
            <div className="relative w-full max-w-[460px] h-[240px] sm:h-[300px] rounded-2xl bg-gradient-to-br from-[#4A001F] via-[#2A0012] to-[#170D29] border-2 border-[#D4AF37]/50 shadow-[0_15px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(255,107,157,0.25)] flex items-center justify-center transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_60px_rgba(212,175,55,0.4)] px-4">
              {/* Envelope Flap Lines */}
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 460 300" preserveAspectRatio="none">
                  <polygon points="0,0 230,170 460,0" fill="rgba(74, 0, 31, 0.4)" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.4" />
                  <polygon points="0,300 230,170 0,0" fill="rgba(23, 13, 41, 0.3)" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.2" />
                  <polygon points="460,300 230,170 460,0" fill="rgba(23, 13, 41, 0.3)" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.2" />
                </svg>
              </div>

              {/* Golden Wax Seal */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#9B111E] via-[#D4AF37] to-[#B8860B] border-2 border-[#FFF8F5]/40 shadow-[0_0_30px_rgba(212,175,55,0.6)] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <div className="w-14 h-14 rounded-full border border-[#FFF8F5]/30 flex items-center justify-center bg-[#8B0000]/60">
                    <Heart className="w-7 h-7 text-[#FFF8F5] fill-[#FFF8F5] drop-shadow-md animate-pulse" />
                  </div>
                </div>
                <span className="mt-3 text-xs uppercase font-serif tracking-[0.2em] text-[#D4AF37] group-hover:text-white transition-colors">
                  Click to Break Wax Seal & Open Letter
                </span>
              </div>

              {/* Envelope Address Label */}
              <div className="absolute bottom-6 left-6 sm:left-8 font-cursive text-xl sm:text-2xl text-[#FFD6E0]/80">
                To My Sweetest Kannamma ❤️
              </div>
              <div className="absolute top-6 right-8 text-[11px] font-mono text-[#D4AF37]/70 uppercase tracking-widest">
                Confidential · Exclusively For You
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#FFF8F5] text-[#2A1B18] p-8 sm:p-14 rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.9),0_0_80px_rgba(212,175,55,0.3)] border-4 border-[#D4AF37]/40"
          >
            {/* Close / Fold Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#2A1B18]/10 hover:bg-[#2A1B18]/20 text-[#2A1B18] transition-colors cursor-pointer"
              aria-label="Fold Letter"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Letter Header */}
            <div className="flex items-center justify-between pb-6 border-b border-[#2A1B18]/15 mb-8">
              <span className="text-xs uppercase font-serif tracking-widest text-[#8B0000]">
                {letter.date}
              </span>
              <div className="flex items-center gap-1.5 text-[#D4AF37]">
                <Sparkles className="w-4 h-4 fill-current" />
                <Sparkles className="w-3 h-3 fill-current" />
              </div>
            </div>

            {/* Salutation */}
            <h3 className="font-cursive text-4xl sm:text-5xl text-[#4A001F] mb-6">
              {letter.salutation}
            </h3>

            {/* Letter Body Paragraphs */}
            <div className="space-y-5 font-editorial text-lg sm:text-xl text-[#2C1D1A] leading-relaxed">
              {letter.paragraphs.map((para, i) => (
                <p key={i} className="indent-4">
                  {para}
                </p>
              ))}
            </div>

            {/* Signoff & Signature */}
            <div className="pt-8 mt-8 border-t border-[#2A1B18]/15 flex flex-col items-end">
              <p className="font-editorial text-base italic text-[#4A001F]">
                {letter.closing}
              </p>
              <p className="font-cursive text-3xl sm:text-4xl text-[#9B111E] mt-1 font-bold">
                {letter.signature}
              </p>
            </div>

            {/* Delicate Paper Texture Corner Accents */}
            <div className="absolute bottom-4 left-6 flex items-center gap-2 text-xs text-[#8B0000]/60 font-serif italic">
              <Heart className="w-3.5 h-3.5 fill-[#8B0000] text-[#8B0000]" />
              <span>Sealed With Endless Devotion</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
