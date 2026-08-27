import React, { ReactNode } from 'react';
import { motion, Variants } from 'motion/react';

export type WebGLRevealPreset =
  | 'matrix-3d'
  | 'split-left'
  | 'split-right'
  | 'holo-expand'
  | 'grid-stagger'
  | 'depth-lift';

interface WebGLSectionRevealProps {
  children: ReactNode;
  preset?: WebGLRevealPreset;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

export const WebGLSectionReveal: React.FC<WebGLSectionRevealProps> = ({
  children,
  preset = 'matrix-3d',
  className = '',
  delay = 0,
  duration = 0.75,
  once = true,
}) => {
  const getVariants = (): Variants => {
    switch (preset) {
      case 'matrix-3d':
        return {
          hidden: {
            opacity: 0,
            y: 45,
            scale: 0.94,
            rotateX: 14,
            filter: 'blur(8px)',
          },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            filter: 'blur(0px)',
            transition: {
              duration,
              delay,
              ease: [0.16, 1, 0.3, 1], // Pro cubic bezier
            },
          },
        };

      case 'split-left':
        return {
          hidden: {
            opacity: 0,
            x: -40,
            rotateY: 10,
            scale: 0.95,
            filter: 'blur(6px)',
          },
          visible: {
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: {
              duration,
              delay,
              ease: [0.16, 1, 0.3, 1],
            },
          },
        };

      case 'split-right':
        return {
          hidden: {
            opacity: 0,
            x: 40,
            rotateY: -10,
            scale: 0.95,
            filter: 'blur(6px)',
          },
          visible: {
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: {
              duration,
              delay,
              ease: [0.16, 1, 0.3, 1],
            },
          },
        };

      case 'holo-expand':
        return {
          hidden: {
            opacity: 0,
            scale: 0.88,
            rotateX: 10,
            filter: 'blur(10px)',
          },
          visible: {
            opacity: 1,
            scale: 1,
            rotateX: 0,
            filter: 'blur(0px)',
            transition: {
              duration: duration * 1.1,
              delay,
              ease: [0.22, 1, 0.36, 1],
            },
          },
        };

      case 'depth-lift':
        return {
          hidden: {
            opacity: 0,
            y: 35,
            scale: 0.96,
            filter: 'blur(4px)',
          },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: {
              duration,
              delay,
              ease: [0.16, 1, 0.3, 1],
            },
          },
        };

      case 'grid-stagger':
      default:
        return {
          hidden: {
            opacity: 0,
            y: 30,
            rotateX: 12,
            scale: 0.95,
            filter: 'blur(6px)',
          },
          visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: {
              duration,
              delay,
              ease: [0.16, 1, 0.3, 1],
            },
          },
        };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      variants={getVariants()}
      style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
