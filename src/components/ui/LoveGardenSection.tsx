import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Flower2, X, ChevronRight, CheckCircle2 } from 'lucide-react';
import { LoveGarden3D } from '../canvas/LoveGarden3D';
import { FallingPetals } from '../canvas/FallingPetals';
import { BackgroundStars } from '../canvas/BackgroundStars';
import { ROMANTIC_DATA, type GardenFlower } from '../../data/romanticContent';
import { romanticAudio } from '../../utils/romanticAudio';

export const LoveGardenSection: React.FC = () => {
  const flowers = ROMANTIC_DATA.gardenFlowers;
  const [selectedFlower, setSelectedFlower] = useState<GardenFlower | null>(null);
  const [discoveredIds, setDiscoveredIds] = useState<number[]>([]);

  const handleSelectFlower = (flower: GardenFlower) => {
    setSelectedFlower(flower);
    if (!discoveredIds.includes(flower.id)) {
      setDiscoveredIds((prev) => [...prev, flower.id]);
    }
  };

  const handleCloseModal = () => {
    setSelectedFlower(null);
  };

  const handleNextFlower = () => {
    if (!selectedFlower) return;
    const currentIndex = flowers.findIndex((f) => f.id === selectedFlower.id);
    const nextFlower = flowers[(currentIndex + 1) % flowers.length];
    romanticAudio.playSparkleSound();
    handleSelectFlower(nextFlower);
  };

  return (
    <section id="garden" className="relative min-h-screen py-24 px-6 flex flex-col items-center justify-center bg-transparent overflow-hidden">
      {/* Background Lighting Gradients */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-[#FF6B9D]/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-[#4A001F]/25 blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 text-center space-y-3 mb-8 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#170D29]/80 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-serif tracking-[0.25em] uppercase">
          <Flower2 className="w-3.5 h-3.5" />
          The Enchanted Garden
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#FFF8F5]">
          Blossoms of Eternal Love
        </h2>
        <p className="text-sm sm:text-base text-[#FFD6E0]/80 font-editorial italic">
          Every rose in this garden was planted for you, my Mardal. Touch or click any bloom to reveal its secret message.
        </p>

        {/* Discovery Progress Meter */}
        <div className="inline-flex items-center gap-2 pt-2 px-4 py-1.5 rounded-full bg-[#170D29]/60 border border-[#FF6B9D]/20 text-xs font-mono text-[#FFD6E0]/80">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Discovered Messages: {discoveredIds.length} of {flowers.length}</span>
          {discoveredIds.length === flowers.length && (
            <span className="text-[#D4AF37] font-serif font-bold ml-1">✨ All Secret Messages Unveiled!</span>
          )}
        </div>
      </div>

      {/* 3D Interactive Canvas Scene */}
      <div className="relative z-10 w-full max-w-5xl h-[480px] sm:h-[540px] rounded-3xl overflow-hidden glass-panel border border-[#FF6B9D]/20 shadow-[0_0_50px_rgba(255,107,157,0.15)]">
        <Canvas
          camera={{ position: [0, 2.5, 5.8], fov: 45 }}
          dpr={[1, 1.2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 5, 4]} intensity={1.5} color="#FFF8F5" />
          <directionalLight position={[-4, -2, -3]} intensity={0.9} color="#FF6B9D" />
          <pointLight position={[0, 1.5, 0]} intensity={2.0} color="#D4AF37" />
          <BackgroundStars />
          <FallingPetals count={35} />
          <LoveGarden3D
            flowers={flowers}
            activeFlowerId={selectedFlower ? selectedFlower.id : null}
            onSelectFlower={handleSelectFlower}
          />
        </Canvas>

        {/* 3D Interaction Prompt Badge */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <div className="bg-[#0B0314]/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#FF6B9D]/20 text-[11px] text-[#FFD6E0] font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FF6B9D] animate-ping" />
            Click Any 3D Rose
          </div>
        </div>

        {/* Flower Selection Quick Chips along bottom of Canvas */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-center gap-2 overflow-x-auto py-1">
          {flowers.map((f) => {
            const isDiscovered = discoveredIds.includes(f.id);
            const isSelected = selectedFlower?.id === f.id;
            return (
              <button
                key={f.id}
                onClick={() => {
                  romanticAudio.playSparkleSound();
                  handleSelectFlower(f);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-serif whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#FF6B9D] text-white shadow-[0_0_15px_rgba(255,107,157,0.6)] scale-105'
                    : 'bg-[#170D29]/80 backdrop-blur-md border border-[#FF6B9D]/30 text-[#FFD6E0] hover:bg-[#4A001F]'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: f.bloomColor }}
                />
                <span>Rose {f.id}</span>
                {isDiscovered && <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Flower Secret Message Modal */}
      <AnimatePresence>
        {selectedFlower && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative max-w-lg w-full p-8 rounded-3xl glass-panel-glow border border-[#D4AF37]/40 shadow-[0_0_50px_rgba(255,107,157,0.3)] text-left"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#170D29]/80 border border-[#FF6B9D]/30 text-[#FFD6E0] hover:text-white hover:bg-[#FF6B9D]/20 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Flower Tag */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="w-3 h-3 rounded-full shadow-[0_0_10px_currentColor]"
                  style={{ backgroundColor: selectedFlower.bloomColor, color: selectedFlower.bloomColor }}
                />
                <span className="text-xs uppercase tracking-widest font-mono text-[#D4AF37]">
                  {selectedFlower.meaning}
                </span>
              </div>

              {/* Title & Name */}
              <h3 className="font-serif text-2xl sm:text-3xl text-[#FFF8F5] mb-1">
                {selectedFlower.title}
              </h3>
              <p className="text-xs font-serif italic text-[#FF6B9D] mb-6">
                {selectedFlower.name}
              </p>

              {/* Heartfelt Poetic Love Message */}
              <div className="p-5 rounded-2xl bg-[#0B0314]/50 border border-[#FF6B9D]/15 mb-6">
                <p className="font-editorial text-lg sm:text-xl text-[#FFF8F5] italic leading-relaxed">
                  “{selectedFlower.message}”
                </p>
              </div>

              {/* Footer Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-[#FFD6E0]/60">
                  <Heart className="w-3.5 h-3.5 text-[#FF6B9D] fill-[#FF6B9D]" />
                  <span>Dedicated to My Mardal</span>
                </div>

                <button
                  onClick={handleNextFlower}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#4A001F] to-[#FF6B9D] text-white text-xs font-serif uppercase tracking-wider hover:shadow-[0_0_15px_rgba(255,107,157,0.4)] transition-all cursor-pointer"
                >
                  <span>Next Secret Message</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
