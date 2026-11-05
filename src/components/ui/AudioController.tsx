import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';
import { romanticAudio } from '../../utils/romanticAudio';

export const AudioController: React.FC = () => {
  const [isMuted, setIsMuted] = useState(romanticAudio.getMuted());
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      setIsMuted(romanticAudio.getMuted());
    };
    const interval = setInterval(checkStatus, 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Pulse animation timer while playing
    if (!isMuted) {
      const interval = setInterval(() => {
        setPulse((prev) => !prev);
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [isMuted]);

  const handleToggle = () => {
    const nextMuted = romanticAudio.toggleMute();
    setIsMuted(nextMuted);
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-2">
      <button
        onClick={handleToggle}
        aria-label={isMuted ? "Play romantic ambient music" : "Mute audio"}
        className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-full transition-all duration-500 backdrop-blur-xl border ${
          isMuted
            ? 'bg-[#170D29]/70 border-[#FF6B9D]/20 text-[#FFD6E0]/70 hover:border-[#FF6B9D]/50 hover:text-white'
            : 'bg-[#4A001F]/80 border-[#D4AF37]/60 text-[#FFF8F5] shadow-[0_0_20px_rgba(212,175,55,0.4)]'
        }`}
      >
        {/* Animated Sound Wave Bars when active */}
        {!isMuted ? (
          <div className="flex items-center gap-0.5 h-4">
            <span className="w-0.5 bg-[#D4AF37] h-2.5 animate-[bounce_1.2s_infinite]" />
            <span className="w-0.5 bg-[#FF6B9D] h-4 animate-[bounce_0.8s_infinite]" />
            <span className="w-0.5 bg-[#FFF8F5] h-3 animate-[bounce_1.4s_infinite]" />
            <span className="w-0.5 bg-[#D4AF37] h-1.5 animate-[bounce_1.0s_infinite]" />
          </div>
        ) : (
          <Music className="w-4 h-4 text-[#FF6B9D]/70 group-hover:scale-110 transition-transform" />
        )}

        <div className="flex items-center gap-1.5 text-xs tracking-wider uppercase font-medium">
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-[#FF6B9D]/60" />
              <span className="hidden sm:inline">Play Melody</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[#FFD6E0] hidden sm:inline">Our Melody</span>
            </>
          )}
        </div>

        {/* Ambient Sparkle icon on hover */}
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Ambient Ring Glow */}
        {!isMuted && (
          <span
            className={`absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#FF6B9D] to-[#D4AF37] opacity-25 blur-sm transition-opacity ${
              pulse ? 'opacity-40' : 'opacity-20'
            }`}
          />
        )}
      </button>
    </div>
  );
};
