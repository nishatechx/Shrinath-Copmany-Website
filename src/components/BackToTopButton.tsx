import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BackToTopButtonProps {
  scrollThreshold?: number;
}

export const BackToTopButton: React.FC<BackToTopButtonProps> = ({
  scrollThreshold = 500,
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

      // Appears strictly only after the user scrolls down 500px
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
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-[88px] right-6 z-40 group"
        >
          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group/btn relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:via-amber-400 hover:to-orange-400 text-slate-950 font-extrabold shadow-lg shadow-amber-500/35 hover:shadow-xl hover:shadow-orange-500/40 ring-4 ring-slate-950/80 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer overflow-hidden"
          >
            {/* Specular light sheen */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-black/10 opacity-80 pointer-events-none" />

            {/* Circular Progress Stroke on outer rim */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5">
              <circle
                cx="22"
                cy="22"
                r="20"
                className="text-amber-600/30"
                strokeWidth="2.5"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="22"
                cy="22"
                r="20"
                className="text-slate-950 transition-all duration-150 opacity-90"
                strokeWidth="2.5"
                strokeDasharray={125.66}
                strokeDashoffset={125.66 - (125.66 * scrollProgress) / 100}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>

            {/* Up Arrow with smooth hover lift */}
            <ArrowUp className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover/btn:-translate-y-0.5" strokeWidth={2.6} />

            {/* Tooltip on hover */}
            <span className="absolute right-14 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-[11px] font-bold text-amber-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl">
              Back to top
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
