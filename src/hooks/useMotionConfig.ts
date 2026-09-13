import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export * from '../utils/motionVariants';

export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);

  return isTouch;
}

export function useMotionSettings() {
  const prefersReduced = useReducedMotion();
  const isTouch = useIsTouchDevice();

  return {
    reducedMotion: !!prefersReduced,
    isTouch,
    allowTilt: !prefersReduced && !isTouch,
    allowParallax: !prefersReduced && !isTouch,
  };
}
