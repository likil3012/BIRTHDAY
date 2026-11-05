import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { BackgroundStars } from '../canvas/BackgroundStars';
import { FallingPetals } from '../canvas/FallingPetals';
import { romanticAudio } from '../../utils/romanticAudio';
import { ROMANTIC_DATA } from '../../data/romanticContent';

interface OpeningCurtainProps {
  onEnter: () => void;
}

export const OpeningCurtain: React.FC<OpeningCurtainProps> = ({ onEnter }) => {
  const [isEntering, setIsEntering] = useState(false);

  const handleEnterWorld = () => {
    if (isEntering) return;
    setIsEntering(true);
    romanticAudio.playSong();
    romanticAudio.playWishChime();
    setTimeout(() => {
      onEnter();
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isEntering ? 0 : 1, scale: isEntering ? 1.04 : 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0314] overflow-hidden select-none"
    >
      {/* 3D Starlight & Petals Canvas (NO 3D Heart here as requested) */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 1.2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 4, 3]} intensity={1.2} color="#FFF8F5" />
          <BackgroundStars />
          <FallingPetals count={40} />
        </Canvas>
      </div>

      {/* Atmospheric Vignette & Color Gradients */}
      <div className="absolute inset-0 pointer-events-none radial-vignette" />
      <div className="absolute inset-0 bg-[#4A001F]/20 mix-blend-color pointer-events-none" />

      {/* Main Cinematic Content */}
      <div className="relative z-10 max-w-3xl w-full px-6 text-center flex flex-col items-center justify-center min-h-screen py-10">
        {/* Subtle Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#170D29]/80 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-serif uppercase tracking-[0.25em] shadow-[0_0_20px_rgba(212,175,55,0.3)] mb-6"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>A Magical Universe Created For You</span>
          <Sparkles className="w-3.5 h-3.5" />
        </motion.div>

        {/* First Line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.3 }}
          className="font-editorial text-2xl sm:text-4xl md:text-5xl text-[#FFF8F5] font-light italic tracking-wide mb-4"
        >
          “Something beautiful was born on this day...”
        </motion.p>

        {/* Ethereal Glowing Portrait Teaser */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="relative my-4"
        >
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1 bg-gradient-to-tr from-[#D4AF37] via-[#FF6B9D] to-[#4A001F] shadow-[0_0_40px_rgba(255,107,157,0.5)]">
            <img
              src={ROMANTIC_DATA.circlePortraitImage}
              alt="Birthday Queen"
              className="w-full h-full object-cover rounded-full filter brightness-105"
              style={{ objectPosition: 'center 20%' }}
            />
            {/* Pulsing Aura Ring */}
            <div className="absolute -inset-2 rounded-full border border-[#D4AF37]/50 animate-ping opacity-40 pointer-events-none" />
          </div>
        </motion.div>

        {/* Birthday Reveal Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.9 }}
          className="space-y-3 mb-8"
        >
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-tight leading-tight">
            <span className="rose-gradient-text drop-shadow-[0_0_30px_rgba(255,107,157,0.5)]">
              Happy Birthday,
            </span>{' '}
            <span className="font-cursive text-5xl sm:text-7xl md:text-8xl text-[#FFF8F5] drop-shadow-[0_0_35px_rgba(212,175,55,0.6)]">
              My Love ❤️
            </span>
          </h1>
          <p className="max-w-md mx-auto text-xs sm:text-sm text-[#FFD6E0]/80 font-editorial italic leading-relaxed">
            Step inside a world woven from your smile, your warmth, and our most cherished memories.
          </p>
        </motion.div>

        {/* Glowing ENTER MY WORLD Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <button
            onClick={handleEnterWorld}
            disabled={isEntering}
            className="group relative inline-flex items-center gap-3 sm:gap-4 px-8 sm:px-10 py-4 sm:py-5 rounded-full overflow-hidden text-sm sm:text-base font-serif tracking-[0.2em] text-[#FFF8F5] uppercase transition-all duration-500 shadow-[0_0_30px_rgba(255,107,157,0.5)] hover:shadow-[0_0_60px_rgba(212,175,55,0.8)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            {/* Glowing gradient background */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#4A001F] via-[#FF6B9D] to-[#D4AF37]" />
            {/* Animated shimmer sweep */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            
            <Heart className="relative z-10 w-5 h-5 fill-white text-white group-hover:scale-125 transition-transform" />
            <span className="relative z-10 font-bold drop-shadow-sm">
              Enter My World
            </span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};
