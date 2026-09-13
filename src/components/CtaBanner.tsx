import React, { useRef } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { PREMIUM_EASE, useMotionSettings } from '../hooks/useMotionConfig';

interface CtaBannerProps {
  onOpenConsultation: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenConsultation }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const { reducedMotion } = useMotionSettings();

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#0d1017]">
      {/* Container with responsive split design */}
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[220px]">
          
          {/* Left Dark Content Area (8 cols) */}
          <div className="lg:col-span-8 relative z-10 px-6 sm:px-10 lg:px-12 py-12 flex flex-col justify-center text-left">
            {/* Spotlight Beam Graphic with very subtle ambient glow */}
            <motion.div
              animate={reducedMotion ? {} : { opacity: [0.35, 0.55, 0.35] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-10 top-0 bottom-0 w-48 bg-gradient-to-r from-amber-500/25 via-amber-500/5 to-transparent pointer-events-none transform -skew-x-12"
            />

            <motion.h2
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, ease: PREMIUM_EASE }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3"
            >
              Ready to Take Your Business Online?
            </motion.h2>

            <motion.p
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.12, ease: PREMIUM_EASE }}
              className="text-sm sm:text-base text-slate-300 max-w-xl mb-7 leading-relaxed"
            >
              Get a free consultation and let's discuss how we can help your business grow
              with websites, digital marketing and more.
            </motion.p>

            <motion.div
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.22, ease: PREMIUM_EASE }}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.button
                onClick={onOpenConsultation}
                id="cta-consultation-btn"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:via-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm sm:text-base shadow-lg shadow-amber-500/35 hover:shadow-xl hover:shadow-orange-500/40 transition-all cursor-pointer overflow-hidden"
              >
                <span className="relative z-10">Get Free Consultation</span>
                <ArrowRight className="relative z-10 w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/10 opacity-70 group-hover:opacity-100 pointer-events-none" />
              </motion.button>

              <motion.a
                href="tel:+917972865688"
                id="cta-call-btn"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 hover:from-slate-800 hover:to-slate-700 text-white font-bold text-sm sm:text-base border-2 border-amber-400/60 hover:border-amber-400 shadow-md shadow-amber-500/10 transition-all"
              >
                <Phone className="w-4 h-4 mr-2 text-[#F59E0B] transition-transform duration-200 group-hover:rotate-12" />
                <span>Call Now</span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right Golden Yellow Visual Area (4 cols) */}
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: PREMIUM_EASE }}
            className="lg:col-span-4 relative bg-gradient-to-br from-[#F5A623] via-[#EAB308] to-[#D97706] px-8 py-12 flex items-center justify-center text-center overflow-hidden"
          >
            {/* Subtle light reflections */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-200/40 via-transparent to-black/10 pointer-events-none" />

            <div className="relative z-10 transform -rotate-3 select-none">
              <p
                className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                Your Success <br />
                <span className="text-slate-950/85">Our Priority</span>
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
