import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type JourneySectionKey =
  | 'hero'
  | 'idea'
  | 'design'
  | 'development'
  | 'mobile'
  | 'growth'
  | 'ai'
  | 'technology'
  | 'services'
  | 'projects'
  | 'final';

export interface JourneySectionInfo {
  key: JourneySectionKey;
  label: string;
  sublabel: string;
}

export const JOURNEY_SECTIONS: JourneySectionInfo[] = [
  { key: 'hero', label: '01', sublabel: 'IDENTITY' },
  { key: 'idea', label: '02', sublabel: 'IDEA' },
  { key: 'design', label: '03', sublabel: 'DESIGN' },
  { key: 'development', label: '04', sublabel: 'ENGINEERING' },
  { key: 'mobile', label: '05', sublabel: 'MOBILE' },
  { key: 'growth', label: '06', sublabel: 'GROWTH' },
  { key: 'ai', label: '07', sublabel: 'AI & INTELLIGENCE' },
  { key: 'technology', label: '08', sublabel: 'TECH CORE' },
  { key: 'services', label: '09', sublabel: 'CAPABILITIES' },
  { key: 'projects', label: '10', sublabel: 'PORTFOLIO' },
  { key: 'final', label: '11', sublabel: 'CONVERGENCE' },
];

interface ScrollJourneyContextType {
  scrollProgress: number; // 0.0 to 1.0 smooth continuous progress
  sectionProgress: number; // 0.0 to 1.0 within active section
  currentSectionIndex: number; // 0 to 10
  currentSectionKey: JourneySectionKey;
  mouse: { x: number; y: number };
  activeServiceIndex: number;
  setActiveServiceIndex: (idx: number) => void;
  activeProjectIndex: number;
  setActiveProjectIndex: (idx: number) => void;
  scrollToSection: (index: number) => void;
  lenis: Lenis | null;
  isMobile: boolean;
  reducedMotion: boolean;
}

const ScrollJourneyContext = createContext<ScrollJourneyContextType | undefined>(undefined);

export const ScrollJourneyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const lenisRef = useRef<Lenis | null>(null);

  // Detect mobile device & reduced motion preference
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Track normalized mouse coordinates (-1 to 1) for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize Lenis smooth scroll & synchronize with ScrollTrigger
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Global scroll progress tracker
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      setScrollProgress(progress);

      const totalSections = JOURNEY_SECTIONS.length;
      const rawIndex = progress * (totalSections - 1);
      const secIdx = Math.min(totalSections - 1, Math.floor(rawIndex));
      const secProg = rawIndex - secIdx;

      setCurrentSectionIndex(secIdx);
      setSectionProgress(secProg);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToSection = (index: number) => {
    const targetKey = JOURNEY_SECTIONS[index]?.key;
    if (!targetKey) return;
    const targetEl = document.getElementById(`section-${targetKey}`);
    if (targetEl) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(targetEl, { offset: -60, duration: 1.4 });
      } else {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const currentSectionKey = JOURNEY_SECTIONS[currentSectionIndex]?.key || 'hero';

  return (
    <ScrollJourneyContext.Provider
      value={{
        scrollProgress,
        sectionProgress,
        currentSectionIndex,
        currentSectionKey,
        mouse,
        activeServiceIndex,
        setActiveServiceIndex,
        activeProjectIndex,
        setActiveProjectIndex,
        scrollToSection,
        lenis: lenisRef.current,
        isMobile,
        reducedMotion,
      }}
    >
      {children}
    </ScrollJourneyContext.Provider>
  );
};

export const useScrollJourney = () => {
  const context = useContext(ScrollJourneyContext);
  if (!context) {
    throw new Error('useScrollJourney must be used within a ScrollJourneyProvider');
  }
  return context;
};
