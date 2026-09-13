import React, { useRef, useState, useEffect } from 'react';
import { Users, FileText, Star, MapPin } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { PREMIUM_EASE, useMotionSettings } from '../hooks/useMotionConfig';

const AnimatedStatValue: React.FC<{ value: string; inView: boolean; reducedMotion: boolean }> = ({
  value,
  inView,
  reducedMotion,
}) => {
  const [displayValue, setDisplayValue] = useState(() => (reducedMotion ? value : '0'));

  useEffect(() => {
    if (reducedMotion) {
      setDisplayValue(value);
      return;
    }
    if (!inView) return;

    if (value === 'Washim & Nearby') {
      setDisplayValue(value);
      return;
    }

    let target = 0;
    let isDecimal = false;
    let suffix = '';

    if (value === '100+') {
      target = 100;
      suffix = '+';
    } else if (value === '200+') {
      target = 200;
      suffix = '+';
    } else if (value === '4.9/5') {
      target = 4.9;
      isDecimal = true;
      suffix = '/5';
    } else {
      setDisplayValue(value);
      return;
    }

    const duration = 1200; // 1.2s smooth duration
    const startTime = performance.now();

    const updateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic: 1 - (1 - progress)^3
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = target * ease;

      if (isDecimal) {
        setDisplayValue(`${current.toFixed(1)}${suffix}`);
      } else {
        setDisplayValue(`${Math.floor(current)}${suffix}`);
      }

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        if (isDecimal) {
          setDisplayValue(`${target.toFixed(1)}${suffix}`);
        } else {
          setDisplayValue(`${target}${suffix}`);
        }
      }
    };

    const frameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(frameId);
  }, [inView, value, reducedMotion]);

  return <span>{displayValue}</span>;
};

export const StatsBar: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-40px' });
  const { reducedMotion } = useMotionSettings();

  const stats = [
    {
      icon: Users,
      value: '100+',
      label: 'Happy Clients',
    },
    {
      icon: FileText,
      value: '200+',
      label: 'Projects Completed',
    },
    {
      icon: Star,
      value: '4.9/5',
      label: 'Client Satisfaction',
      starFill: true,
    },
    {
      icon: MapPin,
      value: 'Washim & Nearby',
      label: 'Our Service Area',
    },
  ];

  return (
    <section ref={containerRef} className="bg-white border-b border-slate-200 py-6 sm:py-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.1, // 100ms stagger
                  ease: PREMIUM_EASE,
                }}
                whileHover={reducedMotion ? {} : { y: -5 }}
                className="group flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-100 hover:border-amber-200 hover:shadow-md hover:shadow-slate-200/60 transition-all duration-250 cursor-default"
              >
                <motion.div
                  initial={reducedMotion ? { scale: 1 } : { scale: 0.8 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.1 + 0.1,
                    ease: PREMIUM_EASE,
                  }}
                  className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-100/70 group-hover:bg-amber-200/90 flex items-center justify-center text-amber-600 transition-colors duration-250"
                >
                  <Icon
                    className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-250 group-hover:scale-105 ${
                      stat.starFill ? 'fill-amber-500' : ''
                    }`}
                  />
                </motion.div>
                <div>
                  <div className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    <AnimatedStatValue
                      value={stat.value}
                      inView={isInView}
                      reducedMotion={reducedMotion}
                    />
                  </div>
                  <div className="text-[11px] sm:text-xs md:text-sm font-medium text-slate-500 line-clamp-1">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
