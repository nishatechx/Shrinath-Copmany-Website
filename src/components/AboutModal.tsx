import React from 'react';
import { X, CheckCircle2, MapPin, Users, Award, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandIconMark } from './Logo';
import { PREMIUM_EASE } from '../hooks/useMotionConfig';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onOpenConsultation,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            id="about-modal-container"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: PREMIUM_EASE }}
            className="bg-[#12151c] border border-slate-800 text-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <BrandIconMark size={36} />
                <div>
                  <span className="text-[#EAB308] text-xs font-bold uppercase tracking-wider block">
                    ABOUT US
                  </span>
                  <h3 className="text-2xl font-extrabold text-white tracking-tight">
                    Shrinath IT Solutions
                  </h3>
                </div>
              </div>

              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  Shrinath IT Solutions was founded with a singular mission: to empower local businesses,
                  startups, and educational institutions in Washim and Vidarbha with modern, world-class
                  digital tools and strategies.
                </p>
                <p>
                  Too many traditional businesses struggle with high agency fees and distant metro agencies
                  that don't understand regional markets. We bridge that gap by offering personalized,
                  honest, and high-performance digital services right here at your doorstep.
                </p>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                  <div className="text-xl font-extrabold text-[#EAB308]">200+</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Projects Delivered</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                  <div className="text-xl font-extrabold text-[#EAB308]">100+</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Satisfied Clients</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                  <div className="text-xl font-extrabold text-[#EAB308]">4.9★</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Average Rating</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                  <div className="text-xl font-extrabold text-[#EAB308]">100%</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Local Dedication</div>
                </div>
              </div>

              {/* Core Values */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Why Washim Businesses Trust Us
                </h4>
                <div className="space-y-2.5">
                  {[
                    'Honest pricing with zero hidden fees',
                    'Fast turnaround & mobile-first responsive architecture',
                    'Local in-person & WhatsApp consultations',
                    'Ongoing website maintenance, SEO and security support',
                  ].map((val, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-[#EAB308] flex-shrink-0" />
                      <span>{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Office Location & Contact */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#EAB308] flex-shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300">
                  <strong className="text-white block text-sm">Corporate Office</strong>
                  SIS, Near Circuit House, Civil Lines, Washim 444505 Maharshtra. <br />
                  Direct Phone: <span className="text-[#EAB308] font-bold">+91 79728 65688</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <motion.button
                  onClick={() => {
                    onClose();
                    onOpenConsultation();
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:via-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm shadow-md shadow-amber-500/30 hover:shadow-lg hover:shadow-orange-500/40 transition-all cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/10 opacity-70 pointer-events-none" />
                  <span className="relative z-10">Start a Conversation</span>
                </motion.button>
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
