import React, { useState, useEffect } from 'react';
import { Heart, Menu, X, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Our Love', href: '#hero' },
    { label: 'Our Story', href: '#story' },
    { label: 'Enchanted Garden', href: '#garden' },
    { label: 'Make a Wish', href: '#cake' },
    { label: 'Love Letter', href: '#letter' },
    { label: 'Memories', href: '#memories' },
    { label: 'Forever & Always', href: '#surprise' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0B0314]/85 backdrop-blur-md border-b border-[#FF6B9D]/15 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
          className="group flex items-center gap-2.5 text-left"
        >
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[#4A001F] to-[#FF6B9D] flex items-center justify-center border border-[#D4AF37]/40 shadow-[0_0_15px_rgba(255,107,157,0.4)] group-hover:scale-105 transition-transform">
            <Heart className="w-4 h-4 text-[#FFF8F5] fill-[#FF6B9D] animate-pulse" />
          </div>
          <div>
            <div className="font-display text-sm tracking-[0.15em] uppercase text-[#FFF8F5] group-hover:text-[#FFD6E0] transition-colors flex items-center gap-1.5">
              Forever With You
              <Sparkles className="w-3 h-3 text-[#D4AF37] opacity-80" />
            </div>
            <div className="text-[10px] tracking-wider text-[#FF6B9D]/80 font-serif italic">
              A Romantic Universe For My Queen
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 bg-[#170D29]/60 backdrop-blur-xl border border-[#FF6B9D]/20 px-4 py-1.5 rounded-full shadow-inner">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="text-xs uppercase tracking-wider text-[#FFD6E0]/80 hover:text-[#FFF8F5] hover:bg-[#FF6B9D]/15 px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#170D29]/70 border border-[#FF6B9D]/30 text-[#FFD6E0]"
            aria-label="Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0314]/95 backdrop-blur-2xl border-b border-[#FF6B9D]/20 px-6 py-6 transition-all">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-left text-sm font-serif tracking-wide text-[#FFD6E0] hover:text-[#D4AF37] py-2.5 px-3 rounded-lg hover:bg-[#FF6B9D]/10 transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <Heart className="w-3.5 h-3.5 text-[#FF6B9D]/40" />
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
