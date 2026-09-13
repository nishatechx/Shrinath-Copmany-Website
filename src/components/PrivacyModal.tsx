import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PREMIUM_EASE } from '../hooks/useMotionConfig';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  tab?: 'privacy' | 'terms';
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
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
            id="privacy-modal-container"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: PREMIUM_EASE }}
            className="bg-[#12151c] border border-slate-800 text-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#EAB308]/20 text-[#EAB308] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Privacy Policy & Terms</h3>
                <p className="text-xs text-slate-400">Shrinath IT Solutions • Washim, Maharashtra • 2025</p>
              </div>
            </div>

            <div className="space-y-4 text-slate-300 text-sm leading-relaxed border-t border-slate-800 pt-4">
              <h4 className="font-bold text-white text-base">1. Commitment to Data Privacy</h4>
              <p>
                At Shrinath IT Solutions, we prioritize confidentiality and security. All client source code, design assets, user records, and proprietary business metrics are strictly protected.
              </p>

              <h4 className="font-bold text-white text-base">2. Scope of Services</h4>
              <p>
                We provide website development, mobile apps, graphic design, branding, and digital marketing consulting. Deliverables, timelines, and milestones are outlined upfront with clear written quotes.
              </p>

              <h4 className="font-bold text-white text-base">3. Ownership of Assets</h4>
              <p>
                Upon settlement of final project fees, full source code and design ownership is transferred directly to the client without recurring vendor lock-in.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-right">
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:via-amber-400 hover:to-orange-400 text-slate-950 text-sm font-extrabold shadow-md shadow-amber-500/30 transition-all cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/10 opacity-70 pointer-events-none" />
                <span className="relative z-10">I Understand</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
