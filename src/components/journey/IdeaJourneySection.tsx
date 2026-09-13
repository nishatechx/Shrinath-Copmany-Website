import React from 'react';
import { Lightbulb, Compass, CheckCircle2, ChevronDown } from 'lucide-react';
import { useScrollJourney } from '../../context/ScrollJourneyContext';

export const IdeaJourneySection: React.FC = () => {
  const { scrollToSection } = useScrollJourney();

  return (
    <section
      id="section-idea"
      className="min-h-screen flex flex-col justify-center items-center relative px-4 sm:px-6 lg:px-8 py-24"
    >
      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Section Chapter Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/70 border border-sky-500/30 text-sky-400 text-xs font-mono mb-6">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>PHASE 01 // THE GENESIS</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
          EVERYTHING STARTS <br />
          <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
            WITH AN IDEA.
          </span>
        </h2>

        {/* Subtext & Narrative */}
        <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed mb-10">
          Every category-defining application, enterprise system, and digital initiative begins as a spark of human imagination. We deconstruct vague ideas into clear, mathematically sound blueprints and scalable product roadmaps.
        </p>

        {/* Technical Blueprint Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-md">
            <div className="flex items-center gap-2 text-sky-400 font-mono text-xs mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>01. DISCOVERY</span>
            </div>
            <div className="text-sm font-semibold text-white">Requirement Mapping</div>
            <p className="text-xs text-slate-400 mt-1">Deep stakeholder audits and target persona alignment.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-md">
            <div className="flex items-center gap-2 text-blue-400 font-mono text-xs mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>02. ARCHITECTURE</span>
            </div>
            <div className="text-sm font-semibold text-white">System Blueprints</div>
            <p className="text-xs text-slate-400 mt-1">Data schemas, cloud architecture, and security modeling.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-md">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>03. FEASIBILITY</span>
            </div>
            <div className="text-sm font-semibold text-white">Tech Stack Strategy</div>
            <p className="text-xs text-slate-400 mt-1">Selecting the optimal framework for rapid execution and scale.</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToSection(2)}
        aria-label="Next chapter"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer"
      >
        <ChevronDown className="w-4 h-4 animate-bounce text-sky-400" />
      </button>
    </section>
  );
};
