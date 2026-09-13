import React from 'react';
import { ArrowRight, ChevronDown, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { useScrollJourney } from '../../context/ScrollJourneyContext';

interface HeroJourneySectionProps {
  onOpenContact: () => void;
}

export const HeroJourneySection: React.FC<HeroJourneySectionProps> = ({ onOpenContact }) => {
  const { scrollToSection } = useScrollJourney();

  return (
    <section
      id="section-hero"
      className="min-h-screen flex flex-col justify-center items-center relative px-4 sm:px-6 lg:px-8 py-28 text-center"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        {/* System Status / High-Tech Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-blue-500/40 backdrop-blur-md shadow-lg shadow-blue-950/40 mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs font-semibold text-blue-300 tracking-wider uppercase">
            System Online // Next-Gen IT Agency
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-xs text-slate-400">Washim • India</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] mb-6">
          WE BUILD DIGITAL <br />
          <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
            EXPERIENCES.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-lg sm:text-xl md:text-2xl text-slate-300 font-medium tracking-wide max-w-2xl mx-auto mb-4">
          Web. Software. Mobile. AI. Digital Growth.
        </p>

        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
          From concept to high-scale deployment, Shrinath IT Solutions designs, engineers, and grows digital products that make an enduring commercial impact.
        </p>

        {/* Dual Primary Call-To-Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
          <button
            onClick={onOpenContact}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollToSection(1)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-base border border-slate-700/80 backdrop-blur-md transition-all duration-200 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>Explore The Journey</span>
          </button>
        </div>

        {/* Value Micro Highlights */}
        <div className="grid grid-cols-3 gap-6 sm:gap-12 pt-6 border-t border-slate-800/80 w-full max-w-lg text-left">
          <div className="flex items-center gap-2.5">
            <Zap className="w-4 h-4 text-blue-400 shrink-0" />
            <div>
              <div className="text-xs text-slate-400 font-mono">DELIVERY</div>
              <div className="text-sm font-bold text-slate-200">Rapid & Agile</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <div className="text-xs text-slate-400 font-mono">UPTIME</div>
              <div className="text-sm font-bold text-slate-200">99.9% Cloud</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
            <div>
              <div className="text-xs text-slate-400 font-mono">CLIENTS</div>
              <div className="text-sm font-bold text-slate-200">50+ Projects</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Prompt Indicator */}
      <button
        onClick={() => scrollToSection(1)}
        aria-label="Scroll down"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
      >
        <span className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
          Scroll to Begin
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-blue-400" />
      </button>
    </section>
  );
};
