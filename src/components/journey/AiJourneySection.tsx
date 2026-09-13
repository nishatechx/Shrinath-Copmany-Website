import React from 'react';
import { Cpu, Network, Sparkles, ChevronDown } from 'lucide-react';
import { useScrollJourney } from '../../context/ScrollJourneyContext';

export const AiJourneySection: React.FC = () => {
  const { scrollToSection } = useScrollJourney();

  return (
    <section
      id="section-ai"
      className="min-h-screen flex flex-col justify-center items-center relative px-4 sm:px-6 lg:px-8 py-24"
    >
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/70 border border-purple-500/30 text-purple-400 text-xs font-mono mb-6">
          <Network className="w-3.5 h-3.5" />
          <span>PHASE 06 // ARTIFICIAL INTELLIGENCE</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
          INTELLIGENCE, <br />
          <span className="bg-gradient-to-r from-purple-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">
            BUILT IN.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed mb-10">
          No superficial gimmicks or plastic robots. We embed production-ready generative AI, custom fine-tuned LLMs, neural workflow automation, and predictive algorithms directly into enterprise software and customer-facing platforms.
        </p>

        {/* AI Capabilities Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-10 text-left">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-xs text-purple-400 font-mono mb-1">ENTERPRISE AUTOMATION</div>
            <div className="text-sm font-semibold text-white">AI Agent Pipelines</div>
            <p className="text-xs text-slate-400 mt-1">Autonomous workflows that handle document parsing, support, and billing.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-xs text-sky-400 font-mono mb-1">PROPRIETARY LLMs</div>
            <div className="text-sm font-semibold text-white">Private Knowledge Bases</div>
            <p className="text-xs text-slate-400 mt-1">Secure Retrieval-Augmented Generation (RAG) on your proprietary company data.</p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400">
          <Cpu className="w-3.5 h-3.5 text-purple-400" />
          <span>Neural network converges into the central technology core ↓</span>
        </div>
      </div>

      <button
        onClick={() => scrollToSection(7)}
        aria-label="Next chapter"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer"
      >
        <ChevronDown className="w-4 h-4 animate-bounce text-purple-400" />
      </button>
    </section>
  );
};
