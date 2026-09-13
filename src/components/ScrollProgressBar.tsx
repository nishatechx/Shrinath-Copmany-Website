import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { useMotionSettings } from '../hooks/useMotionConfig';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const { reducedMotion } = useMotionSettings();

  // Smooth, responsive spring for fluid progress tracking without lag
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 38,
    restDelta: 0.001,
  });

  const [currentPercent, setCurrentPercent] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setCurrentPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <div
      id="scroll-progress-container"
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] sm:h-[3.5px] pointer-events-none overflow-hidden bg-transparent"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={currentPercent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        id="scroll-progress-bar"
        style={{ scaleX: reducedMotion ? scrollYProgress : scaleX }}
        className="h-full w-full origin-left bg-gradient-to-r from-amber-400 via-orange-500 to-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.85),0_0_4px_rgba(217,119,6,0.9)]"
      />
    </div>
  );
};
