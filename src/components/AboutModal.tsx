import React from 'react';
import { X, CheckCircle2, ArrowRight, Shield, Award, Users, Target } from 'lucide-react';
import { ABOUT_STATS } from '../data/content';
import { AnimatedCounter } from './AnimatedCounter';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onOpenContact,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
      <div
        id="about-modal-container"
        className="bg-slate-900 border border-slate-800 text-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-sky-400 text-xs font-bold uppercase tracking-widest block mb-1">
            ABOUT SHRINATH IT SOLUTIONS
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Pioneering Digital Innovation
          </h3>
          <p className="text-slate-300 text-sm mt-3 leading-relaxed">
            Headquartered in Civil Line, Washim, Maharashtra, Shrinath IT Solutions is a premier digital technology partner dedicated to helping startups, enterprises, and high-growth brands excel in the modern digital landscape.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-sky-400 flex items-center justify-center mb-2">
              <Target className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-white text-sm">Strategic Precision</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Every line of code and marketing funnel is engineered to maximize conversions and business ROI.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-sky-400 flex items-center justify-center mb-2">
              <Shield className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-white text-sm">Reliable Engineering</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Rock-solid performance, HIPAA & SOC2-ready standards, 99.9% uptime architectures.
            </p>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center mb-6">
          {ABOUT_STATS.map((s, i) => (
            <div key={i}>
              <div className="text-xl font-extrabold text-sky-400">
                <AnimatedCounter value={s.value} duration={1.5} delay={i * 0.1} />
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Footer actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <button
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            <span>Partner With Us</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
