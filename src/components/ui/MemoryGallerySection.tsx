import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Heart, X, ChevronRight, ChevronLeft, MapPin, Calendar, Sparkles, Filter } from 'lucide-react';
import { ROMANTIC_DATA, type MemoryItem } from '../../data/romanticContent';
import { romanticAudio } from '../../utils/romanticAudio';

interface FloatingParticle {
  id: string;
  x: number;
  y: number;
  scale: number;
  color: string;
}

export const MemoryGallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeMemory, setActiveMemory] = useState<MemoryItem | null>(null);
  const [memoryLikes, setMemoryLikes] = useState<{ [id: number]: number }>(
    ROMANTIC_DATA.memories.reduce((acc, m) => ({ ...acc, [m.id]: m.likes }), {})
  );
  const [activeParticles, setActiveParticles] = useState<{ [memoryId: number]: FloatingParticle[] }>({});

  const categories = ['All', 'Together Forever', 'Traditional Grace', 'Cute & Playful', 'Romantic Radiance'];

  const filteredMemories =
    selectedCategory === 'All'
      ? ROMANTIC_DATA.memories
      : ROMANTIC_DATA.memories.filter((m) => m.category === selectedCategory);

  const handleOpenMemory = (mem: MemoryItem) => {
    romanticAudio.playSparkleSound();
    setActiveMemory(mem);
  };

  const handleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    romanticAudio.playSparkleSound();
    setMemoryLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

    // Create a burst of 5 lovely floating hearts
    const newParticles: FloatingParticle[] = Array.from({ length: 5 }, (_, i) => ({
      id: `${id}-${Date.now()}-${i}`,
      x: (Math.random() - 0.5) * 40,
      y: -20 - Math.random() * 50,
      scale: 0.7 + Math.random() * 0.6,
      color: i % 2 === 0 ? '#FF6B9D' : '#D4AF37',
    }));

    setActiveParticles((prev) => ({ ...prev, [id]: newParticles }));

    setTimeout(() => {
      setActiveParticles((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }, 1200);
  };

  const handleNext = () => {
    if (!activeMemory) return;
    const idx = ROMANTIC_DATA.memories.findIndex((m) => m.id === activeMemory.id);
    const nextMem = ROMANTIC_DATA.memories[(idx + 1) % ROMANTIC_DATA.memories.length];
    romanticAudio.playSparkleSound();
    setActiveMemory(nextMem);
  };

  const handlePrev = () => {
    if (!activeMemory) return;
    const idx = ROMANTIC_DATA.memories.findIndex((m) => m.id === activeMemory.id);
    const prevMem =
      ROMANTIC_DATA.memories[(idx - 1 + ROMANTIC_DATA.memories.length) % ROMANTIC_DATA.memories.length];
    romanticAudio.playSparkleSound();
    setActiveMemory(prevMem);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeMemory) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setActiveMemory(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMemory]);

  // Alternating romantic tilt angles for polaroid feel
  const tiltAngles = [-1.8, 1.4, -1.2, 1.6, -1.5, 1.3, -1.0];
  const floatDurations = [4.2, 4.8, 3.8, 4.5, 5.0, 4.0, 4.6];

  return (
    <section id="memories" className="relative min-h-screen py-24 px-6 flex flex-col items-center justify-center bg-transparent overflow-hidden">
      {/* Ambient background romantic glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#FF6B9D]/15 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-[#4A001F]/25 blur-[150px] pointer-events-none" />

      {/* Header Section */}
      <div className="relative z-10 text-center space-y-3 mb-12 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#170D29]/80 border border-[#FF6B9D]/30 text-[#FFD6E0] text-xs font-serif tracking-[0.25em] uppercase shadow-[0_0_20px_rgba(255,107,157,0.2)]"
        >
          <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Treasured Moments Gallery</span>
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-3xl sm:text-5xl text-[#FFF8F5]"
        >
          Memories Frozen in Starlight
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-sm sm:text-base text-[#FFD6E0]/80 font-editorial italic"
        >
          Every photograph tells the story of an unforgettable moment where I fell deeper in love with you.
        </motion.p>

        {/* Category Filter Chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-2 pt-4 flex-wrap"
        >
          <Filter className="w-3.5 h-3.5 text-[#D4AF37] mr-1 hidden sm:inline" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                romanticAudio.playSparkleSound();
                setSelectedCategory(cat);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-serif tracking-wider transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#4A001F] via-[#FF6B9D] to-[#D4AF37] text-white border border-[#D4AF37]/60 shadow-[0_0_18px_rgba(255,107,157,0.45)] scale-105'
                  : 'bg-[#170D29]/75 border border-[#FF6B9D]/20 text-[#FFD6E0]/70 hover:text-white hover:border-[#FF6B9D]/50 hover:bg-[#170D29]'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      {/* 3D Floating Magical Photo Gallery Grid */}
      <motion.div
        layout
        className="relative z-10 w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredMemories.map((mem, index) => {
            const tilt = tiltAngles[index % tiltAngles.length];
            const floatDuration = floatDurations[index % floatDurations.length];
            const particles = activeParticles[mem.id] || [];

            return (
              <motion.div
                key={mem.id}
                layout
                initial={{ opacity: 0, scale: 0.85, y: 35, rotate: tilt }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -7, 0],
                  rotate: tilt,
                  transition: {
                    y: {
                      repeat: Infinity,
                      duration: floatDuration,
                      ease: 'easeInOut',
                    },
                    opacity: { duration: 0.6, delay: index * 0.08 },
                    scale: { duration: 0.6, delay: index * 0.08 },
                  },
                }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                  rotate: 0,
                  transition: { duration: 0.35, ease: 'easeOut' },
                }}
                onClick={() => handleOpenMemory(mem)}
                className="group cursor-pointer rounded-3xl overflow-hidden glass-panel border border-[#FF6B9D]/30 shadow-[0_12px_35px_rgba(0,0,0,0.55)] hover:border-[#D4AF37] hover:shadow-[0_20px_55px_rgba(212,175,55,0.35)] transition-colors duration-500 relative flex flex-col justify-between"
              >
                {/* Floating Corner Stardust Accents */}
                <span className="absolute top-2.5 left-2.5 z-20 text-[#D4AF37]/60 text-xs pointer-events-none group-hover:text-[#D4AF37] transition-colors">
                  ✦
                </span>
                <span className="absolute top-2.5 right-2.5 z-20 text-[#D4AF37]/60 text-xs pointer-events-none group-hover:text-[#D4AF37] transition-colors">
                  ★
                </span>

                {/* Image Container with Golden Shimmer & Starlight Sweep */}
                <div className="relative h-76 overflow-hidden bg-[#170D29]">
                  <img
                    src={mem.imageUrl}
                    alt={mem.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                    style={{ objectPosition: 'center 20%' }}
                  />

                  {/* Gradient Shadow Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0314] via-transparent to-transparent opacity-85 group-hover:opacity-55 transition-opacity duration-500" />

                  {/* Starlight Light-Sweep Effect */}
                  <div className="starlight-sweep" />

                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 bg-[#0B0314]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[11px] font-mono text-[#D4AF37] flex items-center gap-1.5 shadow-md">
                    <Calendar className="w-3 h-3 text-[#D4AF37]" />
                    <span>{mem.date}</span>
                  </div>

                  {/* Interactive Like Heart Button with live counter */}
                  <button
                    onClick={(e) => handleLike(e, mem.id)}
                    className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#170D29]/85 backdrop-blur-md border border-[#FF6B9D]/40 text-xs font-mono text-[#FFF8F5] hover:scale-115 active:scale-95 hover:border-[#D4AF37] transition-all shadow-lg cursor-pointer"
                    title="Send Love to this Photo"
                  >
                    <Heart className="w-3.5 h-3.5 fill-[#FF6B9D] text-[#FF6B9D] group-hover:scale-110 transition-transform" />
                    <span>{memoryLikes[mem.id] || mem.likes}</span>
                  </button>

                  {/* Lovely Floating Heart Particles Shower on Like */}
                  {particles.map((p) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
                      animate={{
                        opacity: 0,
                        scale: p.scale,
                        x: p.x,
                        y: p.y,
                      }}
                      transition={{ duration: 1.1, ease: 'easeOut' }}
                      className="absolute top-5 right-6 pointer-events-none z-30"
                    >
                      <Heart
                        className="w-5 h-5 drop-shadow-[0_0_8px_rgba(255,107,157,0.8)]"
                        style={{ fill: p.color, color: p.color }}
                      />
                    </motion.div>
                  ))}

                  {/* Category Pill at bottom of image */}
                  <div className="absolute bottom-3 left-4 bg-[#4A001F]/85 backdrop-blur-md px-3 py-0.5 rounded-full border border-[#FF6B9D]/30 text-[10px] font-mono uppercase tracking-wider text-[#FFD6E0] shadow-sm">
                    {mem.category}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 space-y-2.5 text-left bg-gradient-to-b from-transparent to-[#170D29]/70">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#FF6B9D]">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{mem.location}</span>
                  </div>

                  <h3 className="font-serif text-xl text-[#FFF8F5] group-hover:text-[#FFD6E0] transition-colors leading-snug">
                    {mem.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#FFD6E0]/80 font-editorial italic line-clamp-2 leading-relaxed">
                    "{mem.caption}"
                  </p>

                  {/* Subtle hover prompt */}
                  <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-[#D4AF37] opacity-80 group-hover:opacity-100 transition-opacity">
                    <span className="flex items-center gap-1">
                      <span>Click to view reflection</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox / Zoom Modal with Magical Cosmic Aura */}
      <AnimatePresence>
        {activeMemory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden glass-panel-glow border-2 border-[#D4AF37]/60 shadow-[0_0_90px_rgba(212,175,55,0.45)] flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveMemory(null)}
                className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/70 border border-white/20 text-white hover:bg-black/90 hover:border-[#D4AF37] transition-all cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5 text-[#FFF8F5]" />
              </button>

              {/* Large Image Preview */}
              <div className="w-full md:w-3/5 h-80 md:h-auto min-h-[380px] relative bg-[#0B0314] flex items-center justify-center overflow-hidden">
                <img
                  src={activeMemory.imageUrl}
                  alt={activeMemory.title}
                  className="w-full h-full object-contain md:object-cover"
                  style={{ objectPosition: 'center 20%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0314] via-transparent to-transparent md:hidden" />
              </div>

              {/* Memory Story Side Details */}
              <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between text-left bg-[#170D29]/95 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs uppercase font-mono tracking-widest text-[#D4AF37]">
                      {activeMemory.date}
                    </span>
                    <span className="text-[#FF6B9D]">•</span>
                    <span className="text-xs font-mono text-[#FFD6E0]/80">
                      {activeMemory.location}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#FFF8F5] leading-snug">
                    {activeMemory.title}
                  </h3>

                  <div className="inline-block px-3 py-1 rounded-full bg-[#4A001F]/80 border border-[#FF6B9D]/30 text-xs font-mono text-[#FFD6E0]">
                    {activeMemory.category}
                  </div>

                  <p className="font-editorial text-base sm:text-lg text-[#FFD6E0] italic leading-relaxed">
                    "{activeMemory.caption}"
                  </p>

                  <div className="p-4 rounded-2xl bg-[#0B0314]/80 border border-[#FF6B9D]/25 shadow-inner">
                    <p className="text-[11px] uppercase font-mono text-[#D4AF37] tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>From Your Bava's Soul:</span>
                    </p>
                    <p className="font-editorial text-sm sm:text-base text-[#FFF8F5] italic leading-relaxed">
                      {activeMemory.reflection}
                    </p>
                  </div>
                </div>

                {/* Lightbox Controls */}
                <div className="flex items-center justify-between pt-6 border-t border-[#FF6B9D]/20 mt-6">
                  <button
                    onClick={handlePrev}
                    className="flex items-center gap-1.5 text-xs uppercase font-serif text-[#FFD6E0] hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 text-[#D4AF37]" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-1.5 text-xs text-[#FF6B9D]">
                    <Heart className="w-3.5 h-3.5 fill-[#FF6B9D]" />
                    <span>Forever Cherished</span>
                  </div>

                  <button
                    onClick={handleNext}
                    className="flex items-center gap-1.5 text-xs uppercase font-serif text-[#FFD6E0] hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
