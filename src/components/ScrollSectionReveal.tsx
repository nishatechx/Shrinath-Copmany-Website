import React, { ReactNode, useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PREMIUM_EASE } from '../utils/motionVariants';
import { useMotionSettings } from '../hooks/useMotionConfig';

interface ScrollSectionRevealProps {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  yOffset?: number;
}

/**
 * ScrollSectionReveal
 * Ensures sections below the hero stay hidden on initial load ("do not reveal, only remain hero")
 * and only reveal with high-end deceleration physics when the user actively scrolls.
 * Once revealed, sections stay visible without re-triggering ("do not re-reveal").
 */
export const ScrollSectionReveal: React.FC<ScrollSectionRevealProps> = ({
  children,
  id,
  className = '',
  delay = 0,
  yOffset = 38,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-40px 0px -40px 0px',
    amount: 0.08,
  });
  const [hasScrolled, setHasScrolled] = useState(false);
  const { reducedMotion } = useMotionSettings();

  useEffect(() => {
    // If the window is already scrolled past the top (e.g. reload or anchor link)
    if (typeof window !== 'undefined' && window.scrollY > 20) {
      setHasScrolled(true);
      return;
    }

    const onScroll = () => {
      if (window.scrollY > 15) {
        setHasScrolled(true);
        window.removeEventListener('scroll', onScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Section reveals only when user has initiated scroll AND section is in viewport
  const shouldReveal = reducedMotion || (hasScrolled && isInView);

  return (
    <motion.div
      ref={ref}
      id={id}
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: yOffset }}
      animate={shouldReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{
        duration: 0.75,
        delay,
        ease: PREMIUM_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
