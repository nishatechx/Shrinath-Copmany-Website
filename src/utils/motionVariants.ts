import type { Variants, Transition } from 'framer-motion';

/**
 * Premium agency cubic-bezier curve for smooth, high-end acceleration and deceleration.
 */
export const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Spring configurations for interactive physics
 */
export const SMOOTH_SPRING: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 28,
  mass: 0.8,
};

export const GENTLE_SPRING: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 24,
  mass: 1,
};

export const BOUNCY_SPRING: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 20,
};

/**
 * Stagger Container Variants for cascading child item reveals.
 * Usage: attach to parent `<motion.div variants={staggerContainer(0.08, 0.1)} initial="hidden" animate="visible" />`
 */
export const staggerContainer = (
  staggerChildren = 0.08,
  delayChildren = 0.05
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
});

/**
 * Reusable default stagger variant object
 */
export const stagger: Variants = staggerContainer(0.08, 0.05);

/**
 * Fade-Up Animation Variants
 * Consistent upward reveal with elegant deceleration
 */
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: PREMIUM_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: -14,
    transition: {
      duration: 0.3,
      ease: PREMIUM_EASE,
    },
  },
};

/**
 * Alias for fadeUp for consistency across naming preferences
 */
export const fadeInUp: Variants = fadeUp;

/**
 * Fade-Down Animation Variants
 * Ideal for headers, navigation elements, and badges
 */
export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: PREMIUM_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: {
      duration: 0.3,
      ease: PREMIUM_EASE,
    },
  },
};

/**
 * Slide-In Variants (Left, Right, Up, Down)
 */
export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -36,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: PREMIUM_EASE,
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.3,
      ease: PREMIUM_EASE,
    },
  },
};

export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 36,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: PREMIUM_EASE,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.3,
      ease: PREMIUM_EASE,
    },
  },
};

export const slideInUp: Variants = fadeUp;

export const slideInDown: Variants = fadeInDown;

/**
 * Backward-compatible aliases
 */
export const fadeInLeft: Variants = slideInLeft;
export const fadeInRight: Variants = slideInRight;

/**
 * Scale and Pop Entrance
 */
export const scaleUp: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: PREMIUM_EASE,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.25,
      ease: PREMIUM_EASE,
    },
  },
};

/**
 * Premium Mask Clip-Path Reveal
 * Smoothly unmasks content from bottom to top
 */
export const revealMask: Variants = {
  hidden: {
    clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
    opacity: 0,
    y: 20,
  },
  visible: {
    clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: PREMIUM_EASE,
    },
  },
};

/**
 * Editorial Headline Text Reveal
 */
export const textReveal: Variants = {
  hidden: {
    opacity: 0,
    y: '100%',
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: PREMIUM_EASE,
    },
  },
};

/**
 * Subtle Micro-Interaction Variants for Cards and Buttons
 */
export const cardHoverVariants: Variants = {
  initial: { y: 0, scale: 1 },
  hover: {
    y: -6,
    scale: 1.015,
    transition: SMOOTH_SPRING,
  },
  tap: {
    scale: 0.99,
  },
};

export const buttonPressVariants: Variants = {
  initial: { scale: 1, y: 0 },
  hover: {
    y: -2,
    scale: 1.025,
    transition: { duration: 0.18, ease: PREMIUM_EASE },
  },
  tap: {
    y: 0,
    scale: 0.97,
  },
};

/**
 * Modal Backdrop and Dialog Animations
 */
export const modalBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.22, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

export const modalContentVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 16,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: PREMIUM_EASE,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 12,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

/**
 * Mobile Navigation Drawer Variants
 */
export const mobileMenuVariants: Variants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.25,
      ease: PREMIUM_EASE,
      when: 'afterChildren',
    },
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.35,
      ease: PREMIUM_EASE,
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const mobileMenuItemVariants: Variants = {
  closed: { opacity: 0, x: -16 },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.28, ease: PREMIUM_EASE },
  },
};
