import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

/**
 * CustomCursor
 * Bright mouse cursor icon (no circles) with high-contrast Dark #17191C outline & drop-shadow,
 * precision-aligned with 0ms pointer tracking.
 */
export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isInsideModal, setIsInsideModal] = useState(false);

  // Direct mouse position motion values (instant tracking, 0 latency)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (target) {
        const inModalOrInput = target.closest(
          '#launch-manager-modal, [role="dialog"], input, textarea, select, .modal-content'
        );
        setIsInsideModal(!!inModalOrInput);
      }

      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Detect clickable / interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const inModalOrInput = target.closest(
        '#launch-manager-modal, [role="dialog"], input, textarea, select, .modal-content'
      );
      setIsInsideModal(!!inModalOrInput);

      const interactiveEl = target.closest(
        'a, button, input, textarea, select, [role="button"], .cursor-pointer, [data-cursor]'
      );

      setIsHovered(!!interactiveEl);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  // Don't render on touch or server
  if (typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window)) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100010] overflow-hidden transition-opacity duration-150"
      style={{ opacity: isVisible && !isInsideModal ? 1 : 0 }}
      aria-hidden="true"
    >
      {/* Precision Mouse Pointer Icon (No Circles) */}
      <motion.div
        className="absolute top-0 left-0 pointer-events-none select-none origin-top-left"
        style={{
          x: mouseX,
          y: mouseY,
          // Offset so the arrow's top-left tip (coordinate 2,2) sits directly under the mouse point
          marginLeft: '-2px',
          marginTop: '-2px',
        }}
        animate={{
          scale: isClicking ? 0.88 : isHovered ? 1.15 : 1,
          rotate: isHovered ? -6 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 450,
          damping: 25,
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter transition-all duration-200"
          style={{
            filter: isHovered
              ? 'drop-shadow(0 0 10px #FFD21F) drop-shadow(0 2px 4px rgba(23, 25, 28, 0.9))'
              : 'drop-shadow(0 0 6px rgba(255, 210, 31, 0.65)) drop-shadow(0 2px 4px rgba(23, 25, 28, 0.8))',
          }}
        >
          {/* Main Pointer Arrow in Bright Vibrant Yellow with sharp Dark #17191C Stroke */}
          <path
            d="M3 3L10.07 20.97L13.58 13.58L20.97 10.07L3 3Z"
            fill="#FFD21F"
            stroke="#17191C"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Inner Highlight Facet for Premium Dimensionality */}
          <path
            d="M5 5.5L10 18.2L12.6 12.6L18.2 10L5 5.5Z"
            fill="#FFE875"
            opacity="0.5"
          />
        </svg>

        {/* Small bright pulse dot at interactive hover */}
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 left-4 w-2 h-2 rounded-full bg-[#FFD21F] shadow-[0_0_8px_#FFD21F] border border-[#17191C]"
          />
        )}
      </motion.div>
    </div>
  );
};
