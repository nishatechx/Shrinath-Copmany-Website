import React from 'react';
import { Layers, ChevronDown, Check } from 'lucide-react';
import { useScrollJourney } from '../../context/ScrollJourneyContext';

const TECH_LIST = [
  { name: 'React', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'AI & Data' },
  { name: 'Flutter', category: 'Mobile Native' },
  { name: 'PHP', category: 'Backend' },
  { name: 'WordPress', category: 'CMS' },
  { name: 'AI & LLMs', category: 'Intelligence' },
  { name: 'JavaScript', category: 'Core' },
  { name: 'HTML & CSS', category: 'Web' },
];

export const TechnologyJourneySection: React.FC = () => {
  const { scrollToSection } = useScrollJourney();

  return (
    <section
      id="section-technology"
      className="min-h-screen flex flex-col justify-center items-center relative px-4 sm:px-6 lg:px-8 py-24"
    >
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/70 border border-sky-500/30 text-sky-400 text-xs font-mono mb-6">
          <Layers className="w-3.5 h-3.5" />
          <span>PHASE 07 // BATTLE-TESTED STACK</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
          THE TECHNOLOGY <br />
          <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            CORE.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed mb-8">
          We do not chase ephemeral fads. We select proven, high-performance, and maintainable technology stacks that power mission-critical web applications, enterprise software, and mobile systems.
        </p>

        {/* Orbiting Stack Summary Badges */}
        <div className="flex flex-wrap justify-center gap-3 max-w-xl mx-auto mb-10">
          {TECH_LIST.map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-slate-800/80 backdrop-blur-md text-xs font-medium text-slate-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span className="font-bold text-white">{tech.name}</span>
              <span className="text-[10px] text-slate-500 font-mono">({tech.category})</span>
            </div>
          ))}
        </div>

        <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>Technology core transforms into full agency capabilities ↓</span>
        </div>
      </div>

      <button
        onClick={() => scrollToSection(8)}
        aria-label="Next chapter"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer"
      >
        <ChevronDown className="w-4 h-4 animate-bounce text-sky-400" />
      </button>
    </section>
  );
};
