import React from 'react';
import { TrendingUp, BarChart3, Target, ChevronDown } from 'lucide-react';
import { useScrollJourney } from '../../context/ScrollJourneyContext';

export const GrowthJourneySection: React.FC = () => {
  const { scrollToSection } = useScrollJourney();

  return (
    <section
      id="section-growth"
      className="min-h-screen flex flex-col justify-center items-center relative px-4 sm:px-6 lg:px-8 py-24"
    >
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/70 border border-blue-500/30 text-blue-400 text-xs font-mono mb-6">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>PHASE 05 // COMMERCIAL MOMENTUM</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
          TURN DIGITAL <br />
          <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            INTO GROWTH.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed mb-10">
          Software without growth is inert. We couple deep engineering with search engine domination (SEO), performance marketing campaigns, and data-driven conversion funnels that systematically acquire high-value clients.
        </p>

        {/* Growth Impact Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10 text-left">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-xs text-sky-400 font-mono mb-1">LOCAL & NATIONAL SEO</div>
            <div className="text-2xl font-black text-white">#1 Rankings</div>
            <p className="text-xs text-slate-400 mt-1">High-intent keyword visibility across Google search.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-xs text-blue-400 font-mono mb-1">CONVERSION BOOST</div>
            <div className="text-2xl font-black text-white">+340%</div>
            <p className="text-xs text-slate-400 mt-1">Optimized landing pages and WhatsApp lead workflows.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-xs text-cyan-400 font-mono mb-1">RETENTION & ANALYTICS</div>
            <div className="text-2xl font-black text-white">Real-Time</div>
            <p className="text-xs text-slate-400 mt-1">End-to-end attribution tracking and customer insights.</p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400">
          <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
          <span>Data points elevate and form an intelligent neural network ↓</span>
        </div>
      </div>

      <button
        onClick={() => scrollToSection(6)}
        aria-label="Next chapter"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer"
      >
        <ChevronDown className="w-4 h-4 animate-bounce text-blue-400" />
      </button>
    </section>
  );
};
