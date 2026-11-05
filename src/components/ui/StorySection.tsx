import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ChevronRight, ChevronLeft, Quote } from 'lucide-react';
import { ROMANTIC_DATA } from '../../data/romanticContent';
import { romanticAudio } from '../../utils/romanticAudio';

export const StorySection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const chapters = ROMANTIC_DATA.loveStoryChapters;
  const currentChapter = chapters[activeIdx];

  const handleNext = () => {
    romanticAudio.playSparkleSound();
    setActiveIdx((prev) => (prev + 1) % chapters.length);
  };

  const handlePrev = () => {
    romanticAudio.playSparkleSound();
    setActiveIdx((prev) => (prev - 1 + chapters.length) % chapters.length);
  };

  const selectChapter = (idx: number) => {
    romanticAudio.playSparkleSound();
    setActiveIdx(idx);
  };

  return (
    <section id="story" className="relative min-h-screen py-24 px-6 flex items-center justify-center bg-transparent overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#4A001F]/30 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#FF6B9D]/15 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#170D29]/80 border border-[#FF6B9D]/30 text-[#FFD6E0] text-xs font-serif tracking-[0.25em] uppercase">
            <Heart className="w-3.5 h-3.5 fill-[#FF6B9D] text-[#FF6B9D]" />
            Our Journey · Four Timeless Chapters
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#FFF8F5]">
            Whispers From My Heart
          </h2>
          <p className="text-sm sm:text-base text-[#FFD6E0]/80 font-editorial italic max-w-xl mx-auto">
            Every moment spent with you becomes an unforgettable treasure in my soul.
          </p>
        </div>

        {/* Chapter Progress Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 flex-wrap">
          {chapters.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => selectChapter(idx)}
              className={`group flex items-center gap-2 px-4 py-2 rounded-full text-xs font-serif tracking-wider transition-all duration-300 cursor-pointer ${
                activeIdx === idx
                  ? 'bg-gradient-to-r from-[#4A001F] to-[#FF6B9D] text-white border border-[#D4AF37]/50 shadow-[0_0_20px_rgba(255,107,157,0.35)]'
                  : 'bg-[#170D29]/60 border border-[#FF6B9D]/15 text-[#FFD6E0]/60 hover:text-white hover:border-[#FF6B9D]/40'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${activeIdx === idx ? 'bg-[#D4AF37] animate-ping' : 'bg-[#FF6B9D]/40'}`} />
              <span>{ch.tag}</span>
            </button>
          ))}
        </div>

        {/* Cinematic Chapter Card */}
        <div className="relative w-full max-w-3xl min-h-[380px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentChapter.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -25, scale: 0.95 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel-glow relative w-full p-8 sm:p-14 rounded-3xl flex flex-col justify-between"
            >
              {/* Quote Mark Watermark */}
              <Quote className="absolute top-6 right-8 w-20 h-20 text-[#FF6B9D]/10 pointer-events-none" />

              <div>
                {/* Chapter Tag & Badge */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#D4AF37] flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    {currentChapter.dateBadge}
                  </span>
                  <span className="text-xs font-mono text-[#FFD6E0]/50">
                    0{activeIdx + 1} / 0{chapters.length}
                  </span>
                </div>

                {/* Main Prominent Quote */}
                <h3 className="font-editorial text-2xl sm:text-4xl lg:text-5xl text-[#FFF8F5] leading-tight sm:leading-snug mb-6 font-light italic">
                  “{currentChapter.quote}”
                </h3>

                {/* Subtext description */}
                <p className="text-base sm:text-lg text-[#FFD6E0]/85 font-editorial leading-relaxed max-w-2xl">
                  {currentChapter.subtext}
                </p>
              </div>

              {/* Bottom Card Controls */}
              <div className="flex items-center justify-between pt-10 border-t border-[#FF6B9D]/15 mt-8">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FFD6E0]/70 hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 text-[#D4AF37]" />
                  <span>Previous Chapter</span>
                </button>

                <div className="flex items-center gap-2">
                  {chapters.map((_, dotIdx) => (
                    <div
                      key={dotIdx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeIdx === dotIdx ? 'w-6 bg-[#D4AF37]' : 'w-2 bg-[#FF6B9D]/30'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FFD6E0]/70 hover:text-white transition-colors cursor-pointer"
                >
                  <span>Next Chapter</span>
                  <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
