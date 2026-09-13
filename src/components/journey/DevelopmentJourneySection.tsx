import React from 'react';
import { Terminal, Cpu, ShieldCheck, ChevronDown } from 'lucide-react';
import { useScrollJourney } from '../../context/ScrollJourneyContext';

export const DevelopmentJourneySection: React.FC = () => {
  const { scrollToSection } = useScrollJourney();

  return (
    <section
      id="section-development"
      className="min-h-screen flex flex-col justify-center items-center relative px-4 sm:px-6 lg:px-8 py-24"
    >
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/70 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-6">
          <Terminal className="w-3.5 h-3.5" />
          <span>PHASE 03 // ROBUST ENGINEERING</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
          ENGINEERED TO <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            PERFORM.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed mb-10">
          Clean architecture, type-safe development, and resilient cloud backends. We construct software systems built for high throughput, sub-second response times, and effortless long-term maintainability.
        </p>

        {/* Engineering Performance Benchmarks */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10 text-left">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-xs text-slate-400 font-mono">LATENCY</div>
            <div className="text-lg font-bold text-white">&lt; 100ms</div>
            <div className="text-[11px] text-slate-500">Global Edge CDN</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-xs text-slate-400 font-mono">TYPE SAFETY</div>
            <div className="text-lg font-bold text-emerald-400">100% Strict</div>
            <div className="text-[11px] text-slate-500">TypeScript Native</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-xs text-slate-400 font-mono">UPTIME</div>
            <div className="text-lg font-bold text-sky-400">99.99%</div>
            <div className="text-[11px] text-slate-500">Auto-Scaling Cloud</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-xs text-slate-400 font-mono">SECURITY</div>
            <div className="text-lg font-bold text-indigo-400">Hardened</div>
            <div className="text-[11px] text-slate-500">SSL & Cloudflare</div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400">
          <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          <span>Code structures assemble into a responsive ecosystem ↓</span>
        </div>
      </div>

      <button
        onClick={() => scrollToSection(4)}
        aria-label="Next chapter"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer"
      >
        <ChevronDown className="w-4 h-4 animate-bounce text-emerald-400" />
      </button>
    </section>
  );
};
