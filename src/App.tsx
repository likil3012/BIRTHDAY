import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { OpeningCurtain } from './components/ui/OpeningCurtain';
import { WebsiteBackground } from './components/ui/WebsiteBackground';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/ui/HeroSection';
import { StorySection } from './components/ui/StorySection';
import { LoveGardenSection } from './components/ui/LoveGardenSection';
import { CakeSection } from './components/ui/CakeSection';
import { LoveLetterSection } from './components/ui/LoveLetterSection';
import { MemoryGallerySection } from './components/ui/MemoryGallerySection';
import { FinalSurpriseSection } from './components/ui/FinalSurpriseSection';
import { Footer } from './components/ui/Footer';

export function App() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <div className="relative min-h-screen bg-transparent text-[#FFF8F5] selection:bg-[#FF6B9D]/30 selection:text-[#FFD6E0] overflow-x-hidden">
      {/* Dynamic Lovely Portrait Background (Appears smoothly when entering) */}
      <WebsiteBackground isVisible={hasEntered} />

      {/* Opening Curtain / Universe Portal */}
      <AnimatePresence>
        {!hasEntered && (
          <OpeningCurtain onEnter={() => setHasEntered(true)} />
        )}
      </AnimatePresence>

      {/* Main Romantic Universe Experience */}
      <div
        className={`relative z-10 transition-opacity duration-1000 ${
          hasEntered ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Navbar />
        <main className="space-y-0">
          <HeroSection />
          <StorySection />
          <LoveGardenSection />
          <CakeSection />
          <LoveLetterSection />
          <MemoryGallerySection />
          <FinalSurpriseSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
