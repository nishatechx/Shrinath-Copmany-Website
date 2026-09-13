import React, { useRef } from 'react';
import { ArrowRight, MapPin, Headphones, TrendingUp, Receipt, Handshake } from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { PREMIUM_EASE, useMotionSettings } from '../hooks/useMotionConfig';

interface AboutSectionProps {
  onKnowMore: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onKnowMore }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const { allowParallax, reducedMotion } = useMotionSettings();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageParallax = useTransform(scrollYProgress, [0, 1], [-12, allowParallax ? 12 : 0]);

  const valueProps = [
    {
      icon: MapPin,
      title: 'Local Understanding',
      desc: 'Rooted in Washim, we understand local market dynamics, customer behavior and regional growth opportunities.',
    },
    {
      icon: Headphones,
      title: 'Personalized Support',
      desc: 'Direct WhatsApp and phone assistance with fast turnaround times and no ticketing bureaucracy.',
    },
    {
      icon: TrendingUp,
      title: 'Result-Oriented Approach',
      desc: 'We focus on measurable outcomes — inquiries, sales, and digital reach that drive real revenue.',
    },
    {
      icon: Receipt,
      title: 'Affordable & Transparent',
      desc: 'Clear upfront pricing with no hidden charges, crafted specifically for local businesses and startups.',
    },
    {
      icon: Handshake,
      title: 'Long-Term Partnership',
      desc: 'We stand by your side from initial launch through continuous digital upgrades and scaling.',
    },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Pill Badge */}
        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: PREMIUM_EASE }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAB308] text-slate-950 text-xs font-extrabold uppercase tracking-wider mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-slate-950"></span>
          ABOUT US
        </motion.div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Column 1: Heading line-by-line, Paragraph, CTA (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight mb-5">
              <span className="block overflow-hidden py-0.5">
                <motion.span
                  initial={reducedMotion ? { opacity: 0 } : { y: 28, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.55, delay: 0.1, ease: PREMIUM_EASE }}
                  className="block"
                >
                  Local Business.
                </motion.span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <motion.span
                  initial={reducedMotion ? { opacity: 0 } : { y: 28, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.55, delay: 0.2, ease: PREMIUM_EASE }}
                  className="block text-[#D97706]"
                >
                  Global Opportunities.
                </motion.span>
              </span>
            </h2>

            <motion.p
              initial={reducedMotion ? { opacity: 0 } : { y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.55, delay: 0.32, ease: PREMIUM_EASE }}
              className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8"
            >
              Shrinath IT Solutions is a Washim-based IT company passionate about helping
              local businesses, startups and entrepreneurs grow online. We provide reliable,
              affordable and result-driven digital solutions that make your business stand out
              in today's competitive world.
            </motion.p>

            <motion.button
              onClick={onKnowMore}
              id="about-know-more-btn"
              initial={reducedMotion ? { opacity: 0 } : { y: 18, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.42, ease: PREMIUM_EASE }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:via-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm shadow-md shadow-amber-500/30 hover:shadow-lg hover:shadow-orange-500/40 transition-all cursor-pointer overflow-hidden"
            >
              <span className="relative z-10">Know More About Us</span>
              <ArrowRight className="relative z-10 w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1.5" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/10 opacity-70 group-hover:opacity-100 pointer-events-none" />
            </motion.button>
          </div>

          {/* Column 2: Office Reception Image with clip-path bottom-to-top reveal + scroll parallax (4 cols) */}
          <div ref={imageContainerRef} className="lg:col-span-4 flex justify-center items-center">
            <motion.div
              style={{ y: imageParallax }}
              initial={
                reducedMotion
                  ? { opacity: 0 }
                  : { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.2, scale: 1.04 }
              }
              animate={
                isInView
                  ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, scale: 1 }
                  : {}
              }
              transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200 group will-change-transform bg-slate-900"
            >
              {/* Shrinath IT Solutions Office photo - Perfectly fitted with no overlaying logo */}
              <img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjGmCWlZEiUzZVni2yurwmYKgSB51SuitfcFgf1C-H3fSQvtnk4lKR46L7V_PQiHiLLeFwcIGhFCRuujiDoJAL95aGkfM4rwv94D_OcKpUbI0EN8Tfkotfqn6gK_4N8WoEOaeHNeZQr9zLDleXgYIfHlCyCkXO_T7NpRRUMHcygJx_uNNv8GGGIV8lG5mw/s1600/Shrinath%20IT%20Solutions%20Office.png"
                alt="Shrinath IT Solutions Office - SIS, Near Circuit House, Civil Lines, Washim"
                className="w-full h-auto aspect-[4/3] sm:aspect-[16/11] object-cover object-center filter brightness-95 group-hover:scale-103 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Bottom Location Badge */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent flex items-end p-4">
                <span className="text-[11px] sm:text-xs font-semibold text-slate-100 flex items-center gap-1.5 drop-shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-[#EAB308] flex-shrink-0" />
                  <span>SIS, Near Circuit House, Civil Lines, Washim</span>
                </span>
              </div>
            </motion.div>
          </div>

          {/* Column 3: 5 Value Points with Staggered Entrance (4 cols) */}
          <div className="lg:col-span-4 flex flex-col space-y-5">
            {valueProps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.35 + idx * 0.08, // 80ms stagger
                    ease: PREMIUM_EASE,
                  }}
                  className="flex items-center space-x-3.5 group cursor-default"
                >
                  <motion.div
                    initial={reducedMotion ? { scale: 1 } : { scale: 0.8 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{
                      duration: 0.45,
                      delay: 0.35 + idx * 0.08 + 0.05,
                      ease: PREMIUM_EASE,
                    }}
                    className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-50 group-hover:bg-[#EAB308] border border-amber-200 group-hover:border-[#EAB308] flex items-center justify-center text-[#EAB308] group-hover:text-slate-950 transition-all duration-250 shadow-xs"
                  >
                    <Icon className="w-5 h-5 transition-transform duration-250 group-hover:scale-110" />
                  </motion.div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-[#D97706] transition-colors duration-200">
                      {item.title}
                    </h4>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
