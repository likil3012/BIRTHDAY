import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#06010B]/80 backdrop-blur-md border-t border-[#FF6B9D]/15 py-12 px-6 text-center overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6">
        {/* Heart Icon Cluster */}
        <div className="flex items-center gap-3 text-[#FF6B9D]">
          <Heart className="w-4 h-4 fill-current opacity-60" />
          <Heart className="w-6 h-6 fill-current animate-pulse text-[#D4AF37]" />
          <Heart className="w-4 h-4 fill-current opacity-60" />
        </div>

        <div className="space-y-2">
          <p className="font-editorial text-xl sm:text-2xl text-[#FFF8F5] italic">
            “No matter how many lifetimes pass, you will always be my once-in-a-lifetime.”
          </p>
          <p className="font-serif text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
            Forever With You · An Eternal Romantic Journey
          </p>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#170D29]/70 border border-[#FF6B9D]/20 text-xs font-serif uppercase tracking-widest text-[#FFD6E0] hover:text-white hover:border-[#D4AF37] transition-all cursor-pointer"
        >
          <span>Return to Starlight</span>
          <ArrowUp className="w-3.5 h-3.5 text-[#D4AF37] group-hover:-translate-y-1 transition-transform" />
        </button>

        <div className="text-[11px] font-mono text-[#FFD6E0]/40 pt-4">
          © Created with all my heart, exclusively for my dearest Mardal ❤️
        </div>
      </div>
    </footer>
  );
};
