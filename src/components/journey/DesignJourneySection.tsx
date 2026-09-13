import React from 'react';
import { Layout, Layers, Sparkles, ChevronDown } from 'lucide-react';
import { useScrollJourney } from '../../context/ScrollJourneyContext';

export const DesignJourneySection: React.FC = () => {
  const { scrollToSection } = useScrollJourney();

  return (
    <section
      id="section-design"
      className="min-h-screen flex flex-col justify-center items-center relative px-4 sm:px-6 lg:px-8 py-24"
    >
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/70 border border-blue-500/30 text-blue-400 text-xs font-mono mb-6">
          <Layout className="w-3.5 h-3.5" />
          <span>PHASE 02 // USER EXPERIENCE</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
          TURNING IDEAS <br />
          <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            INTO EXPERIENCES.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed mb-10">
          World-class UI/UX is where engineering precision meets human intuition. We design atomic component systems, pixel-perfect interfaces, and fluid micro-interactions that build brand authority and convert visitors into loyal customers.
        </p>

        {/* Structured UI Component Chips */}
        <div className="flex flex-wrap justify-center gap-2.5 max-w-lg mx-auto mb-10">
          {[
            'Design Systems',
            'Atomic UI Components',
            'Micro-Interactions',
            'WCAG Accessibility',
            'Frictionless UX',
            'Rapid Prototyping',
          ].map((pill, i) => (
            <span
              key={i}
              className="px-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs font-medium text-slate-300 backdrop-blur-sm"
            >
              {pill}
            </span>
          ))}
        </div>

        {/* Narrative hint */}
        <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400">
          <Layers className="w-3.5 h-3.5 text-blue-400" />
          <span>Components deconstruct into code as you scroll down ↓</span>
        </div>
      </div>

      <button
        onClick={() => scrollToSection(3)}
        aria-label="Next chapter"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer"
      >
        <ChevronDown className="w-4 h-4 animate-bounce text-blue-400" />
      </button>
    </section>
  );
};
