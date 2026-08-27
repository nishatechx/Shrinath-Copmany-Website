import React, { useEffect, useState } from 'react';
import { ChevronUp, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BackToTopButtonProps {
  scrollThreshold?: number;
}

export const BackToTopButton: React.FC<BackToTopButtonProps> = ({
  scrollThreshold = 400,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      
      const progress =
        totalHeight > 0 ? (currentScrollY / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));

      if (currentScrollY > scrollThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollThreshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-24 right-6 z-40 group"
        >
          {/* Circular Progress Ring Background */}
          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
            className="relative flex items-center justify-center w-12 h-12 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-sky-400 border border-slate-700 hover:border-sky-400/60 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ring-2 ring-slate-950"
          >
            {/* SVG Progress Circle */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5">
              <circle
                cx="22"
                cy="22"
                r="19"
                className="text-slate-800"
                strokeWidth="2"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="22"
                cy="22"
                r="19"
                className="text-sky-400 transition-all duration-150"
                strokeWidth="2.5"
                strokeDasharray={119.38}
                strokeDashoffset={119.38 - (119.38 * scrollProgress) / 100}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>

            {/* Arrow Icon */}
            <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" />

            {/* Hover Tooltip */}
            <span className="absolute right-14 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-[11px] font-medium text-slate-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl">
              Back to top
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
