import React from 'react';
import { ArrowRight, Phone, Mail, MapPin, Sparkles, ShieldCheck } from 'lucide-react';
import { useScrollJourney } from '../../context/ScrollJourneyContext';
import { COMPANY_CONTACT } from '../../data/content';

interface FinalTransformationSectionProps {
  onOpenContact: () => void;
}

export const FinalTransformationSection: React.FC<FinalTransformationSectionProps> = ({ onOpenContact }) => {
  const { scrollToSection } = useScrollJourney();

  return (
    <section
      id="section-final"
      className="min-h-screen flex flex-col justify-center items-center relative px-4 sm:px-6 lg:px-8 py-28 text-center"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        {/* Culmination Chapter Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-blue-500/40 backdrop-blur-md shadow-xl mb-8">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span className="font-mono text-xs font-bold text-sky-300 uppercase tracking-widest">
            PHASE 10 // CONVERGENCE & TRANSFORMATION
          </span>
        </div>

        {/* Primary Climax Headline */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6">
          LET'S BUILD <br />
          <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            WHAT'S NEXT.
          </span>
        </h2>

        {/* Narrative */}
        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
          Idea, design, code, mobile, growth, and intelligence converge under Shrinath IT Solutions. Whether you are launching a transformative venture or scaling an enterprise platform, our team is ready to engineer your future.
        </p>

        {/* Dual Primary Call-To-Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
          <button
            onClick={onOpenContact}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollToSection(9)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-base border border-slate-700 backdrop-blur-md transition-all duration-200 cursor-pointer"
          >
            <span>Explore Our Work</span>
          </button>
        </div>

        {/* Rapid Direct Contact Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl p-5 rounded-2xl bg-slate-950/80 border border-slate-800 backdrop-blur-md text-left">
          <a
            href={`tel:${COMPANY_CONTACT.phone}`}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-900/60 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-mono">CALL US DIRECTLY</div>
              <div className="text-sm font-semibold text-white">{COMPANY_CONTACT.phone}</div>
            </div>
          </a>

          <a
            href={`mailto:${COMPANY_CONTACT.email}`}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-900/60 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-sky-600/20 text-sky-400 flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-mono">EMAIL INQUIRIES</div>
              <div className="text-sm font-semibold text-white">{COMPANY_CONTACT.email}</div>
            </div>
          </a>

          <div className="flex items-center gap-3 p-2 rounded-lg">
            <div className="w-9 h-9 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-mono">LOCATION</div>
              <div className="text-sm font-semibold text-white">{COMPANY_CONTACT.address}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
