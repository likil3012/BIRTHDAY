import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Compass, Gift, BookOpen, Flame } from 'lucide-react';
import { FallingPetals } from '../canvas/FallingPetals';
import { BackgroundStars } from '../canvas/BackgroundStars';
import { romanticAudio } from '../../utils/romanticAudio';
import { ROMANTIC_DATA } from '../../data/romanticContent';

export const HeroSection: React.FC = () => {
  const [loveCount, setLoveCount] = useState(0);

  const handleSendLove = () => {
    setLoveCount((prev) => prev + 1);
    romanticAudio.playSparkleSound();
  };

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* 3D Falling Petals & Stardust Canvas */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 46 }}
          dpr={[1, 1.2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[4, 5, 4]} intensity={1.5} color="#FFF8F5" />
          <pointLight position={[0, -2, 2]} intensity={1.5} color="#D4AF37" />
          <BackgroundStars />
          <FallingPetals count={40} />
        </Canvas>
      </div>

      {/* Atmospheric Radial Shading */}
      <div className="absolute inset-0 pointer-events-none radial-vignette-soft z-10" />

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center space-y-8 my-auto">
        {/* Top Header Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#170D29]/80 backdrop-blur-xl border border-[#FF6B9D]/30 shadow-[0_0_25px_rgba(255,107,157,0.3)]"
        >
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span className="font-serif text-xs uppercase tracking-[0.25em] text-[#FFD6E0]">
            The Queen of My Heart
          </span>
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
        </motion.div>

        {/* Centerpiece: Glowing Romantic Portrait Card with 2nd Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.4 }}
          className="relative group cursor-pointer"
          onClick={handleSendLove}
        >
          <div className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-full p-2 bg-gradient-to-tr from-[#D4AF37] via-[#FF6B9D] to-[#4A001F] shadow-[0_0_60px_rgba(255,107,157,0.4)] group-hover:shadow-[0_0_80px_rgba(212,175,55,0.7)] transition-all duration-700">
            <img
              src={ROMANTIC_DATA.circlePortraitImage}
              alt="Birthday Queen"
              className="w-full h-full object-cover rounded-full filter brightness-105 contrast-105 group-hover:scale-102 transition-transform duration-500"
              style={{ objectPosition: 'center 20%' }}
            />
            {/* Delicate Golden Ring Border */}
            <div className="absolute inset-2 rounded-full border border-white/30 pointer-events-none" />
          </div>

          {/* Interactive Floating Love Button Pill */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 glass-panel px-5 py-1.5 rounded-full inline-flex items-center gap-2 text-xs text-[#FFD6E0] border border-[#FF6B9D]/50 shadow-lg group-hover:border-[#D4AF37] transition-all whitespace-nowrap">
            <Heart className="w-3.5 h-3.5 fill-[#FF6B9D] text-[#FF6B9D] animate-ping" />
            <span>Tap to send love {loveCount > 0 && `(${loveCount} ❤️)`}</span>
          </div>
        </motion.div>

        {/* Hero Title & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.6 }}
          className="max-w-3xl w-full flex flex-col items-center space-y-4"
        >
          <div className="space-y-2">
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#FFF8F5]">
              {ROMANTIC_DATA.heroMainTitle}
            </h1>
            <p className="font-editorial text-lg sm:text-2xl text-[#FFD6E0] italic max-w-2xl mx-auto leading-relaxed">
              {ROMANTIC_DATA.heroSubtitle}
            </p>
          </div>

          {/* Quick Action Navigation Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => scrollToSection('#story')}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#170D29]/80 backdrop-blur-md border border-[#FF6B9D]/30 text-xs uppercase tracking-wider text-[#FFD6E0] hover:text-white hover:border-[#FF6B9D] hover:bg-[#4A001F]/60 transition-all shadow-md cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#FF6B9D] group-hover:scale-110 transition-transform" />
              <span>Our Story</span>
            </button>

            <button
              onClick={() => scrollToSection('#garden')}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#170D29]/80 backdrop-blur-md border border-[#D4AF37]/30 text-xs uppercase tracking-wider text-[#FFD6E0] hover:text-white hover:border-[#D4AF37] hover:bg-[#4A001F]/60 transition-all shadow-md cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
              <span>Enchanted Garden</span>
            </button>

            <button
              onClick={() => scrollToSection('#cake')}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#4A001F] to-[#FF6B9D]/80 border border-[#FFD6E0]/40 text-xs uppercase tracking-wider text-[#FFF8F5] hover:shadow-[0_0_20px_rgba(255,107,157,0.5)] hover:scale-105 transition-all cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
              <span>Make a Wish</span>
            </button>

            <button
              onClick={() => scrollToSection('#letter')}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#170D29]/80 backdrop-blur-md border border-[#FF6B9D]/30 text-xs uppercase tracking-wider text-[#FFD6E0] hover:text-white hover:border-[#FF6B9D] hover:bg-[#4A001F]/60 transition-all shadow-md cursor-pointer"
            >
              <Gift className="w-3.5 h-3.5 text-[#FF6B9D] group-hover:scale-110 transition-transform" />
              <span>Love Letter</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mouse scroll indicator */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
        onClick={() => scrollToSection('#story')}
      >
        <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#FFD6E0]">
          Scroll to Explore Our Universe
        </span>
        <div className="w-5 h-8 rounded-full border border-[#FF6B9D]/40 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-[#D4AF37] animate-bounce" />
        </div>
      </div>
    </section>
  );
};
