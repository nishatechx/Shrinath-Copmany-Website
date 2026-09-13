import React from 'react';
import { Smartphone, Monitor, Tablet, ChevronDown, Wifi } from 'lucide-react';
import { useScrollJourney } from '../../context/ScrollJourneyContext';

export const MobileJourneySection: React.FC = () => {
  const { scrollToSection } = useScrollJourney();

  return (
    <section
      id="section-mobile"
      className="min-h-screen flex flex-col justify-center items-center relative px-4 sm:px-6 lg:px-8 py-24"
    >
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/70 border border-sky-500/30 text-sky-400 text-xs font-mono mb-6">
          <Smartphone className="w-3.5 h-3.5" />
          <span>PHASE 04 // MULTI-DEVICE ECOSYSTEM</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
          BUILT FOR <br />
          <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
            EVERY SCREEN.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed mb-10">
          Mobile-first is not an afterthought; it is our foundation. We engineer hyper-responsive web applications, progressive web apps (PWAs), and native iOS & Android applications using Flutter and React Native.
        </p>

        {/* Device Badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 max-w-lg mx-auto mb-10 text-slate-300">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Smartphone className="w-4 h-4 text-sky-400" />
            <span>Mobile Native</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Tablet className="w-4 h-4 text-blue-400" />
            <span>Tablet Adaptive</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Monitor className="w-4 h-4 text-indigo-400" />
            <span>Ultra-Wide Desktop</span>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400">
          <Wifi className="w-3.5 h-3.5 text-sky-400" />
          <span>Real-time data synchronization transitions into analytics ↓</span>
        </div>
      </div>

      <button
        onClick={() => scrollToSection(5)}
        aria-label="Next chapter"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer"
      >
        <ChevronDown className="w-4 h-4 animate-bounce text-sky-400" />
      </button>
    </section>
  );
};
