import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Flame, RefreshCw } from 'lucide-react';
import { BirthdayCake3D } from '../canvas/BirthdayCake3D';
import { BackgroundStars } from '../canvas/BackgroundStars';
import { FallingPetals } from '../canvas/FallingPetals';
import { ROMANTIC_DATA } from '../../data/romanticContent';
import { romanticAudio } from '../../utils/romanticAudio';

export const CakeSection: React.FC = () => {
  const [isBlownOut, setIsBlownOut] = useState(false);
  const [selectedWish, setSelectedWish] = useState(ROMANTIC_DATA.cakeSurprise.wishes[0]);
  const [customWish, setCustomWish] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [hasWished, setHasWished] = useState(false);

  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF6B9D', '#D4AF37', '#FFD6E0', '#FFF8F5', '#4A001F'],
      shapes: ['circle', 'square'],
      scalar: 1.2,
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF6B9D', '#D4AF37', '#FFD6E0'],
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF6B9D', '#D4AF37', '#FFD6E0'],
      });
    }, 250);
  };

  const handleMakeWish = () => {
    romanticAudio.playCandleBlowSound();
    setIsBlownOut(true);

    setTimeout(() => {
      romanticAudio.playWishChime();
      triggerConfetti();
      setHasWished(true);
    }, 700);
  };

  const handleRelight = () => {
    romanticAudio.playSparkleSound();
    setIsBlownOut(false);
    setHasWished(false);
  };

  return (
    <section id="cake" className="relative min-h-screen py-24 px-6 flex flex-col items-center justify-center bg-transparent overflow-hidden">
      {/* Ambient glow lights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-[#4A001F]/30 blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center space-y-3 mb-8 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#170D29]/80 border border-[#FF6B9D]/30 text-[#FFD6E0] text-xs font-serif tracking-[0.25em] uppercase">
          <Flame className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
          The Birthday Wish Moment
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#FFF8F5]">
          {ROMANTIC_DATA.cakeSurprise.title}
        </h2>
        <p className="text-sm sm:text-base text-[#FFD6E0]/80 font-editorial italic">
          {ROMANTIC_DATA.cakeSurprise.subtitle}
        </p>
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row items-center gap-10">
        {/* 3D Birthday Cake Canvas */}
        <div className="w-full lg:w-1/2 h-[460px] sm:h-[520px] lg:h-[550px] rounded-3xl overflow-hidden glass-panel border border-[#FF6B9D]/25 shadow-[0_0_50px_rgba(255,107,157,0.25)] relative">
          <Canvas
            camera={{ position: [0, 1.2, 5.8], fov: 44 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[4, 5, 4]} intensity={1.8} color="#FFF8F5" />
            <directionalLight position={[-4, -3, -2]} intensity={0.9} color="#FF6B9D" />
            <BackgroundStars />
            <FallingPetals count={30} />
            <BirthdayCake3D isBlownOut={isBlownOut} />
          </Canvas>

          {/* Candle Status Badge - Placed at bottom-left corner so candles are 100% visible */}
          <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
            <div className="bg-[#0B0314]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D4AF37]/35 text-xs font-mono text-[#FFD6E0] flex items-center gap-2 shadow-lg">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isBlownOut ? 'bg-gray-400' : 'bg-[#FF9900] shadow-[0_0_10px_#FFA500] animate-pulse'
                }`}
              />
              <span>{isBlownOut ? 'Candles Blown Out ✨' : 'Candles Glowing 🔥'}</span>
            </div>
          </div>
        </div>

        {/* Wish Interaction Panel */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!hasWished ? (
              <motion.div
                key="wish-selection"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="glass-panel-glow p-8 sm:p-10 rounded-3xl space-y-6"
              >
                <div>
                  <h3 className="font-serif text-2xl text-[#FFF8F5] mb-2 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                    Choose a Sacred Birthday Wish
                  </h3>
                  <p className="text-xs sm:text-sm text-[#FFD6E0]/70 font-editorial italic">
                    Select a wish for this new year of your life, or write your own secret wish into the stars.
                  </p>
                </div>

                {/* Pre-written wish options */}
                <div className="space-y-2.5">
                  {ROMANTIC_DATA.cakeSurprise.wishes.map((wish, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedWish(wish);
                        setIsCustomMode(false);
                      }}
                      className={`w-full text-left p-3.5 rounded-2xl text-xs sm:text-sm font-serif transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        !isCustomMode && selectedWish === wish
                          ? 'bg-gradient-to-r from-[#4A001F] to-[#FF6B9D]/70 border border-[#D4AF37]/50 text-white shadow-md'
                          : 'bg-[#170D29]/60 border border-[#FF6B9D]/15 text-[#FFD6E0]/80 hover:text-white hover:border-[#FF6B9D]/40'
                      }`}
                    >
                      <span>{wish}</span>
                      {!isCustomMode && selectedWish === wish && (
                        <Heart className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37] shrink-0" />
                      )}
                    </button>
                  ))}

                  {/* Option for custom wish */}
                  <button
                    onClick={() => setIsCustomMode(true)}
                    className={`w-full text-left p-3.5 rounded-2xl text-xs sm:text-sm font-serif transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      isCustomMode
                        ? 'bg-gradient-to-r from-[#4A001F] to-[#FF6B9D]/70 border border-[#D4AF37]/50 text-white'
                        : 'bg-[#170D29]/60 border border-[#FF6B9D]/15 text-[#FFD6E0]/80 hover:text-white'
                    }`}
                  >
                    <span>✍️ Write your own secret personalized wish...</span>
                  </button>
                </div>

                {/* Custom wish input box */}
                {isCustomMode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-2"
                  >
                    <input
                      type="text"
                      value={customWish}
                      onChange={(e) => setCustomWish(e.target.value)}
                      placeholder="Type your secret wish here..."
                      className="w-full px-4 py-3 rounded-xl bg-[#0B0314]/80 border border-[#D4AF37]/40 text-[#FFF8F5] placeholder-[#FFD6E0]/40 text-sm font-serif focus:outline-none focus:border-[#FF6B9D]"
                    />
                  </motion.div>
                )}

                {/* Make a Wish Button */}
                <div className="pt-2">
                  <button
                    onClick={handleMakeWish}
                    disabled={isBlownOut}
                    className="w-full group relative flex items-center justify-center gap-3 py-4 sm:py-5 rounded-full overflow-hidden text-base font-serif tracking-[0.15em] text-[#FFF8F5] uppercase transition-all duration-500 shadow-[0_0_30px_rgba(255,107,157,0.4)] hover:shadow-[0_0_60px_rgba(212,175,55,0.7)] hover:scale-[1.02] active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#4A001F] via-[#FF6B9D] to-[#D4AF37]" />
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <Sparkles className="relative z-10 w-5 h-5 text-[#D4AF37]" />
                    <span className="relative z-10 font-bold drop-shadow-sm">
                      Make a Wish & Blow Out Candles ✨
                    </span>
                    <Flame className="relative z-10 w-4 h-4 text-[#FFF8F5] fill-[#FFF8F5]" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="wish-revealed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="glass-panel-glow p-8 sm:p-10 rounded-3xl space-y-6 text-left border border-[#D4AF37]/50 shadow-[0_0_60px_rgba(212,175,55,0.35)]"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#170D29]/90 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  Your Wish Is Carried to the Stars
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#FFF8F5]">
                  {ROMANTIC_DATA.cakeSurprise.revealedMessageTitle}
                </h3>

                <div className="p-5 rounded-2xl bg-[#0B0314]/60 border border-[#FF6B9D]/20">
                  <p className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-2">
                    Your Sacred Wish for Today:
                  </p>
                  <p className="font-editorial text-base sm:text-lg text-[#FFD6E0] italic">
                    "{isCustomMode && customWish ? customWish : selectedWish}"
                  </p>
                </div>

                <p className="font-editorial text-base sm:text-lg text-[#FFF8F5] leading-relaxed italic">
                  {ROMANTIC_DATA.cakeSurprise.revealedMessageBody}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#FF6B9D]/20">
                  <div className="flex items-center gap-2 text-xs text-[#FFD6E0]/70">
                    <Heart className="w-4 h-4 text-[#FF6B9D] fill-[#FF6B9D]" />
                    <span>Blessed with Endless Love</span>
                  </div>

                  <button
                    onClick={handleRelight}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#170D29]/80 border border-[#FF6B9D]/30 text-xs font-serif uppercase tracking-wider text-[#FFD6E0] hover:text-white hover:bg-[#4A001F] transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Relight Candles</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
