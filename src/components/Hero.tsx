import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, Phone, Play, Globe, Code2, Smartphone, TrendingUp } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { PREMIUM_EASE, useMotionSettings } from '../hooks/useMotionConfig';

interface HeroProps {
  onStartProject: () => void;
  onExploreServices?: () => void;
  onViewWork?: () => void;
}

interface RotatingService {
  id: string;
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

const ROTATING_SERVICES: RotatingService[] = [
  {
    id: 'websites',
    title: 'Modern Websites',
    category: 'Fast, Responsive & SEO-Ready',
    icon: Globe,
    tag: 'Websites',
  },
  {
    id: 'software',
    title: 'Custom Software',
    category: 'Billing, ERP & Cloud Portals',
    icon: Code2,
    tag: 'Software',
  },
  {
    id: 'apps',
    title: 'Mobile Applications',
    category: 'Android & iOS App Development',
    icon: Smartphone,
    tag: 'Mobile Apps',
  },
  {
    id: 'marketing',
    title: 'Digital Marketing',
    category: 'SEO, Google Ads & Brand Growth',
    icon: TrendingUp,
    tag: 'Marketing',
  },
];

export const Hero: React.FC<HeroProps> = ({ onStartProject, onExploreServices, onViewWork }) => {
  const { allowParallax, reducedMotion } = useMotionSettings();
  const heroRef = useRef<HTMLElement>(null);
  const [serviceIndex, setServiceIndex] = useState(0);

  // Smooth, calm service rotation every 3.2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setServiceIndex((prev) => (prev + 1) % ROTATING_SERVICES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const currentService = ROTATING_SERVICES[serviceIndex];
  const CurrentServiceIcon = currentService.icon;

  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const textParallaxY = useTransform(scrollYProgress, [0, 1], [0, allowParallax ? -28 : 0]);
  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [0, allowParallax ? 20 : 0]);

  // Desktop subtle mouse-follow parallax (3-6px)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 120, damping: 22 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 120, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!allowParallax || !heroRef.current) return;
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x * 10); // yields range approx -5px to +5px
    mouseY.set(y * 10);
  };

  const handleMouseLeave = () => {
    if (!allowParallax) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={heroRef}
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-[68px] sm:pt-[76px] lg:pt-[82px] bg-[#fefdfd] border-b border-slate-200 overflow-hidden"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-start relative z-10">
        
        {/* Left Column: #fefdfd Background with high-contrast copy & responsive CTAs */}
        <motion.div
          style={{ y: textParallaxY }}
          className="bg-[#fefdfd] flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-8 xl:px-14 2xl:px-18 py-8 sm:py-10 lg:py-10 xl:py-12 z-10"
        >
          <div className="max-w-xl mx-auto lg:mx-0 w-full">
            {/* Tag Badge */}
            <motion.div
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: PREMIUM_EASE }}
              className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/90 shadow-xs mb-3 sm:mb-4 lg:mb-3 xl:mb-5"
            >
              <Play className="w-3 h-3 text-[#D97706] fill-[#D97706]" />
              <span className="text-[11px] sm:text-xs font-bold text-amber-900 tracking-wide uppercase">
                Washim's Trusted IT Partner
              </span>
            </motion.div>

            {/* Main Headline: line-by-line reveal using overflow mask + upward translation */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-3 sm:mb-4 lg:mb-3 xl:mb-5">
              <span className="block overflow-hidden py-0.5">
                <motion.span
                  initial={reducedMotion ? { opacity: 0 } : { y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.35, ease: PREMIUM_EASE }}
                  className="block"
                >
                  You Build the Business.
                </motion.span>
              </span>

              <span className="block overflow-hidden py-0.5">
                <motion.span
                  initial={reducedMotion ? { opacity: 0 } : { y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.48, ease: PREMIUM_EASE }}
                  className="block"
                >
                  We Build Its{' '}
                  <span className="text-[#D97706] relative inline-block">
                    Digital Future.
                    {/* Subtle highlight sweep */}
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.7, delay: 0.85, ease: PREMIUM_EASE }}
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-amber-400/60 origin-left rounded-full"
                    />
                  </span>
                </motion.span>
              </span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={reducedMotion ? { opacity: 0 } : { y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65, ease: PREMIUM_EASE }}
              className="text-xs sm:text-sm md:text-base lg:text-sm xl:text-base text-slate-600 font-normal leading-relaxed mb-6 sm:mb-8"
            >
              Grow your business online with{' '}
              <span className="font-bold text-slate-900 underline decoration-amber-400 decoration-2 underline-offset-3">
                us
              </span>{' '}
              for businesses in Washim and across Maharashtra.
            </motion.p>

            {/* Action Buttons directly below hero text */}
            <motion.div
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.75, ease: PREMIUM_EASE }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <motion.button
                onClick={onStartProject}
                id="hero-start-project-btn"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:via-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm sm:text-base shadow-lg shadow-amber-500/35 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 cursor-pointer text-center overflow-hidden"
              >
                <span className="relative z-10">Start Your Project</span>
                <ArrowRight className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 ml-2 flex-shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                {/* Subtle top light sheen for high-gloss bright gradient look */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/10 opacity-70 group-hover:opacity-100 pointer-events-none transition-opacity" />
              </motion.button>

              <motion.button
                onClick={onExploreServices || onViewWork}
                id="hero-explore-services-btn"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center justify-center px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-amber-50 via-white to-amber-50/80 hover:from-amber-100 hover:via-orange-50 hover:to-amber-100 text-slate-950 font-bold text-sm sm:text-base border-2 border-amber-400/90 hover:border-orange-500 shadow-md shadow-amber-500/15 hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 cursor-pointer text-center"
              >
                <Globe className="w-4 h-4 mr-2 text-[#D97706] flex-shrink-0 transition-transform duration-200 group-hover:rotate-12" />
                <span>Explore Services</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column: Hero image touching header directly with zero top space */}
        <div className="relative w-full bg-[#fefdfd] flex items-start justify-center lg:justify-end self-start pt-0 pb-0">
          <motion.div
            style={{
              y: imageParallaxY,
              x: smoothMouseX,
            }}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full flex justify-center lg:justify-end items-start will-change-transform"
          >
            <div className="relative inline-block w-full max-w-xl lg:max-w-none">
              <img
                src="https://blogger.googleusercontent.com/img/a/AVvXsEhRrAV1fzueknaj4xisUMYWS4GiIvQCP2c-qMaICUv01lHnMUaqKabCcrraxq8beCp9BzWW15Jr7ZjH7aE0cRjAYQnadqYUhHSFJDTBVdznCxET-Aj89Ij7nu1G0FUhC_8eTjtvFKFn1lIzM-QKCVY0902cVv6tT9nGzSlaby9ozZ8eIvRcTELRSNDypuo=s1600"
                alt="Shrinath IT Solutions - Website Development & Digital Marketing Agency in Washim"
                width={1536}
                height={1024}
                className="w-full h-auto object-contain object-top block max-w-xl lg:max-w-none"
                referrerPolicy="no-referrer"
              />

              {/* Minimal beacon at pointing fingertip */}
              <div
                className="absolute z-20 pointer-events-none"
                style={{ left: '57.3%', top: '50.8%', transform: 'translate(-50%, -50%)' }}
                aria-hidden="true"
              >
                <span className="absolute -inset-2 rounded-full bg-amber-400/25 animate-ping duration-1000" />
                <span className="relative block w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-500 border border-white shadow-xs" />
              </div>

              {/* Minimal, elegant floating card kept at a comfortable distance from finger - static frame never blinks */}
              <div
                className="absolute z-30 pointer-events-auto"
                style={{ left: '52%', top: '48%', transform: 'translate(-88%, -80%)' }}
              >
                <div
                  className="group cursor-pointer bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-[0_12px_28px_-6px_rgba(15,23,42,0.12),0_3px_10px_-2px_rgba(15,23,42,0.06)] border border-slate-200/90 hover:border-amber-400/80 hover:shadow-lg transition-all duration-300 min-w-[165px] sm:min-w-[210px] max-w-[245px]"
                  onClick={() => {
                    const elem = document.getElementById('services');
                    if (elem) {
                      elem.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      setServiceIndex((prev) => (prev + 1) % ROTATING_SERVICES.length);
                    }
                  }}
                >
                  {/* Header: Icon + Title (smooth text/icon crossfade, card frame stays solid) */}
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-50 border border-amber-200/70 text-[#D97706] flex items-center justify-center shrink-0">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={currentService.id}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.85 }}
                          transition={{ duration: 0.25 }}
                          className="flex items-center justify-center"
                        >
                          <CurrentServiceIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <div className="min-w-0 flex-1">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={currentService.id}
                          initial={{ opacity: 0, y: 3 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -3 }}
                          transition={{ duration: 0.25 }}
                        >
                          <span className="text-xs sm:text-sm font-bold text-slate-900 truncate block">
                            {currentService.title}
                          </span>
                          <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-tight truncate">
                            {currentService.category}
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Footer: Service indicator line */}
                  <div className="flex items-center justify-between gap-1.5 mt-2 pt-1.5 border-t border-slate-100/90">
                    <div className="flex items-center gap-1">
                      {ROTATING_SERVICES.map((srv, idx) => (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setServiceIndex(idx);
                          }}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            idx === serviceIndex ? 'w-3.5 bg-amber-500' : 'w-1 bg-slate-200 hover:bg-slate-300'
                          }`}
                          aria-label={`Select ${srv.title}`}
                        />
                      ))}
                    </div>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={currentService.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[9px] font-bold text-amber-600 uppercase tracking-wider"
                      >
                        {currentService.tag}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
