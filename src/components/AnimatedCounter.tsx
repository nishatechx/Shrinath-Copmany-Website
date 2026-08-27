import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

interface AnimatedCounterProps {
  value: string | number;
  duration?: number;
  delay?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2,
  delay = 0,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const [displayValue, setDisplayValue] = useState<string>('0');

  // Parse prefix, suffix, and numeric target from the string value
  const rawString = String(value).trim();
  const match = rawString.match(/^([^\d]*)([\d,.]+)([^\d]*)$/);

  const prefix = match ? match[1] : '';
  const numStr = match ? match[2].replace(/,/g, '') : '0';
  const suffix = match ? match[3] : '';
  const targetNumber = parseFloat(numStr) || 0;
  const isFloat = numStr.includes('.');
  const decimalPlaces = isFloat ? (numStr.split('.')[1] || '').length : 0;

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;
    let timeoutId: ReturnType<typeof setTimeout>;

    const animateCount = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic curve for smooth organic deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = targetNumber * easeOut;

      const formatted = isFloat
        ? current.toFixed(decimalPlaces)
        : Math.floor(current).toLocaleString();

      setDisplayValue(formatted);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        // Guarantee exact final value formatting
        setDisplayValue(
          isFloat
            ? targetNumber.toFixed(decimalPlaces)
            : targetNumber.toLocaleString()
        );
      }
    };

    if (delay > 0) {
      timeoutId = setTimeout(() => {
        animationFrameId = requestAnimationFrame(animateCount);
      }, delay * 1000);
    } else {
      animationFrameId = requestAnimationFrame(animateCount);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, targetNumber, duration, delay, isFloat, decimalPlaces]);

  return (
    <span ref={ref} className={`inline-flex items-baseline font-mono ${className}`}>
      {prefix && <span className="opacity-90 mr-0.5">{prefix}</span>}
      <span>{isInView ? displayValue : '0'}</span>
      {suffix && <span className="text-sky-400 ml-0.5 font-bold">{suffix}</span>}
    </span>
  );
};
