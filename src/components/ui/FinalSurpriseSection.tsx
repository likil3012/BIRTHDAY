import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Sparkles, Rocket, RotateCcw, Share2, Check, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Hero3DHeart } from '../canvas/Hero3DHeart';
import { BackgroundStars } from '../canvas/BackgroundStars';
import { FallingPetals } from '../canvas/FallingPetals';
import { Fireworks3D } from '../canvas/Fireworks3D';
import { ROMANTIC_DATA } from '../../data/romanticContent';
import { romanticAudio } from '../../utils/romanticAudio';

export const FinalSurpriseSection: React.FC = () => {
  const [fireworkTrigger, setFireworkTrigger] = useState(1);
  const [copied, setCopied] = useState(false);
  const [screenGlow, setScreenGlow] = useState(false);
  const surprise = ROMANTIC_DATA.finalSurprise;

  const handleLaunchFireworks = () => {
    // 1. Audio sound
    romanticAudio.playFireworkSound();

    // 2. Increment 3D fireworks trigger
    setFireworkTrigger((prev) => prev + 1);

    // 3. Screen flash glow
    setScreenGlow(true);
    setTimeout(() => setScreenGlow(false), 450);

    // 4. Starlight Confetti fireworks - Grand celebration from both sides and center
    confetti({
      particleCount: 65,
      angle: 60,
      spread: 75,
      origin: { x: 0.05, y: 0.8 },
      colors: ['#FF6B9D', '#D4AF37', '#FFF8F5', '#FF1493', '#FFD700', '#C77DFF'],
      shapes: ['star', 'circle'],
      scalar: 1.25,
    });

    confetti({
      particleCount: 65,
      angle: 120,
      spread: 75,
      origin: { x: 0.95, y: 0.8 },
      colors: ['#FF6B9D', '#D4AF37', '#FFF8F5', '#FF1493', '#FFD700', '#C77DFF'],
      shapes: ['star', 'circle'],
      scalar: 1.25,
    });

    confetti({
      particleCount: 85,
      spread: 120,
      origin: { y: 0.62 },
      colors: ['#D4AF37', '#FF6B9D', '#FFF', '#FFD6E0', '#FF4D80'],
      scalar: 1.3,
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 90,
        origin: { y: 0.45 },
        colors: ['#FFD700', '#FF1493', '#FFF8F5', '#D4AF37'],
        shapes: ['star'],
      });
    }, 280);
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="surprise" className="relative min-h-screen py-24 px-6 flex flex-col items-center justify-center bg-transparent overflow-hidden">
      {/* 3D Celestial Fireworks & Starlight Scene in Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 48 }}
          dpr={[1, 1.2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[4, 5, 4]} intensity={1.8} color="#FFF8F5" />
          <directionalLight position={[-4, -3, -2]} intensity={1.0} color="#FF6B9D" />
          <pointLight position={[0, 0, 0]} intensity={2.5} color="#D4AF37" />
          <BackgroundStars />
          <FallingPetals count={45} />
          <Fireworks3D burstTrigger={fireworkTrigger} />
        </Canvas>
      </div>

      {/* Screen flash glow on firework blast */}
      {screenGlow && (
        <div className="fixed inset-0 z-40 bg-gradient-to-t from-[#FF6B9D]/20 via-[#D4AF37]/15 to-transparent pointer-events-none transition-opacity duration-500 animate-pulse" />
      )}

      {/* Atmospheric Vignette */}
      <div className="absolute inset-0 pointer-events-none radial-vignette" />

      {/* Clean, Unobstructed Content Flow */}
      <div className="relative z-10 max-w-4xl w-full mx-auto text-center flex flex-col items-center space-y-6 my-auto">
        {/* Top Celestial Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#170D29]/80 backdrop-blur-xl border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-serif uppercase tracking-[0.3em] shadow-[0_0_25px_rgba(212,175,55,0.3)]"
        >
          <Sparkles className="w-4 h-4 animate-spin text-[#D4AF37]" />
          <span>Our Eternal Constellation</span>
          <Sparkles className="w-4 h-4 animate-spin text-[#D4AF37]" />
        </motion.div>

        {/* Sacred Love Quotes & Birthday Header */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="font-editorial text-xl sm:text-3xl md:text-4xl text-[#FFF8F5] font-light italic leading-relaxed"
          >
            “{surprise.quotePrimary}”
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.2 }}
          >
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="rose-gradient-text drop-shadow-[0_0_35px_rgba(255,107,157,0.5)]">
                {surprise.quoteSecondary}
              </span>
            </h1>
          </motion.div>
        </div>

        {/* Dedicated 3D Beating Crystal Heart Stage - Completely Uncovered, Big & Majestic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.3 }}
          className="relative w-full max-w-xl h-80 sm:h-96 md:h-[420px] mx-auto flex flex-col items-center justify-center my-3"
        >
          {/* Subtle luminous halo pedestal */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#FF1493]/20 via-[#D4AF37]/15 to-[#FF6B9D]/20 blur-3xl pointer-events-none animate-pulse" />

          {/* Interactive 3D Heart Canvas */}
          <div className="w-full h-full cursor-pointer relative z-10" title="Click the beating heart to ignite fireworks!">
            <Canvas
              camera={{ position: [0, 0, 5.6], fov: 44 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            >
              <ambientLight intensity={0.7} />
              <directionalLight position={[2, 3, 4]} intensity={2.2} color="#FFF8F5" />
              <directionalLight position={[-3, -2, 3]} intensity={1.2} color="#FF6B9D" />
              <directionalLight position={[0, -3, -2]} intensity={1.5} color="#D4AF37" />
              <pointLight position={[0, 0, 2]} intensity={2.2} color="#FFE4E1" />
              <Hero3DHeart onHeartClick={handleLaunchFireworks} interactive={true} />
            </Canvas>
          </div>

          {/* Heart indicator pill */}
          <button
            onClick={handleLaunchFireworks}
            className="relative z-20 mt-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#170D29]/90 border border-[#FF6B9D]/40 backdrop-blur-md text-[11px] font-mono text-[#FFD6E0] shadow-lg hover:border-[#D4AF37] hover:scale-105 transition-all cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-[#FF1493] text-[#FF1493] animate-ping" />
            <span>Heartbeat of Eternal Love · Click heart to ignite sparks ✨</span>
          </button>
        </motion.div>

        {/* Subtitle / Telugu English Vow */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-editorial text-base sm:text-xl text-[#FFD6E0]/90 italic max-w-xl mx-auto"
        >
          {surprise.subtext}
        </motion.p>

        {/* Romantic Vow Badges / Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl pt-2"
        >
          {surprise.stats.map((st, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl glass-panel border border-[#FF6B9D]/20 text-center space-y-1 hover:border-[#D4AF37]/50 hover:scale-102 transition-all"
            >
              <div className="font-serif text-lg sm:text-xl text-[#FFF8F5] font-bold">
                {st.value}
              </div>
              <div className="text-[11px] font-mono uppercase text-[#FFD6E0]/70 tracking-wider">
                {st.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <button
            onClick={handleLaunchFireworks}
            className="group relative flex items-center gap-3 px-8 py-4 rounded-full overflow-hidden text-sm uppercase font-serif tracking-[0.15em] text-[#FFF8F5] transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(212,175,55,0.7)] hover:scale-105 cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] via-[#FF6B9D] to-[#4A001F]" />
            <Rocket className="relative z-10 w-4 h-4 text-[#FFF8F5] group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            <span className="relative z-10 font-bold">Launch Starlight Fireworks 🎆</span>
          </button>

          <button
            onClick={handleReplay}
            className="flex items-center gap-2 px-6 py-4 rounded-full bg-[#170D29]/80 backdrop-blur-xl border border-[#FF6B9D]/30 text-xs uppercase font-serif tracking-widest text-[#FFD6E0] hover:text-white hover:border-[#FF6B9D] hover:bg-[#4A001F]/60 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-[#FF6B9D]" />
            <span>Replay Journey From Start</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-4 rounded-full bg-[#170D29]/80 backdrop-blur-xl border border-[#D4AF37]/30 text-xs uppercase font-serif tracking-widest text-[#FFD6E0] hover:text-white hover:border-[#D4AF37] hover:bg-[#4A001F]/60 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4 text-[#D4AF37]" />}
            <span>{copied ? 'Link Copied!' : 'Share Birthday Link'}</span>
          </button>
        </motion.div>

        {/* Lovely Shy Message Option for Mardal to message her Bava on Instagram */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="w-full max-w-xl mx-auto p-6 sm:p-8 rounded-3xl glass-panel-glow border-2 border-[#FF6B9D]/30 hover:border-[#D4AF37]/60 shadow-[0_12px_45px_rgba(225,48,108,0.25)] text-center space-y-4 my-6 transition-all duration-500"
        >
          {/* Top shy tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4A001F]/80 border border-[#FF6B9D]/40 text-[#FFD6E0] text-xs font-serif tracking-widest uppercase shadow-md">
            <span>Talk to Your Bava</span>
            <span className="text-sm">🙈💌</span>
          </div>

          {/* Heading in English */}
          <h3 className="font-serif text-2xl sm:text-3xl text-[#FFF8F5] leading-snug">
            Send a Secret Message to Your Bava <span className="inline-block animate-bounce">🙈</span>
          </h3>

          {/* Sweet Telugu English note */}
          <p className="font-editorial text-sm sm:text-base text-[#FFD6E0]/90 italic leading-relaxed max-w-md mx-auto">
            "Ee surprise neeku nachindha mardal? Naatho matladali anipisthe... siggupadakunda direct ga ikkada message pettu. Nee allari bava eppudu nee reply kosame edhuru chusthu untadu 🙈❤️"
          </p>

          {/* Instagram Message CTA Button */}
          <div className="pt-2 flex flex-col items-center gap-2.5">
            <a
              href="https://www.instagram.com/mr_likil___007/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                romanticAudio.playSparkleSound();
                confetti({
                  particleCount: 50,
                  spread: 65,
                  origin: { y: 0.85 },
                  colors: ['#E1306C', '#FD1D1D', '#F77737', '#FF6B9D', '#D4AF37'],
                  shapes: ['star', 'circle'],
                });
              }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full overflow-hidden text-sm uppercase font-serif tracking-wider text-white shadow-[0_0_35px_rgba(225,48,108,0.55)] hover:shadow-[0_0_65px_rgba(225,48,108,0.9)] hover:scale-108 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              {/* Instagram Gradient Background */}
              <span className="absolute inset-0 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] group-hover:opacity-95 transition-opacity" />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-white blur-md transition-opacity" />
              
              <span className="relative z-10 flex items-center gap-2.5 font-bold">
                {/* Instagram Camera SVG Icon */}
                <svg
                  className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Message Me on Instagram</span>
                <span className="text-base group-hover:scale-125 transition-transform duration-300">🙈💌</span>
              </span>
            </a>

            {/* Shy prompt caption */}
            <p className="text-xs font-editorial italic text-[#FFD6E0]/80 flex items-center justify-center gap-1.5 pt-1">
              <span>Siggupadakunda message cheyyi mardal... I'm waiting!</span>
              <span className="text-sm font-sans">👉👈</span>
            </p>
          </div>

          {/* Tender romantic closing footer */}
          <div className="pt-5 border-t border-[#FF6B9D]/20 w-full max-w-sm mx-auto text-center space-y-1">
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
              Crafted with Infinite Love by Your Bava ❤️
            </p>
            <p className="text-[10px] font-mono text-[#FFD6E0]/60">
              Happy Birthday, My Precious Mardal ✨
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
