import React from 'react';
import { ArrowRight, Sparkles, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useScrollJourney } from '../../context/ScrollJourneyContext';
import { ServiceItem } from '../../types';
import { SERVICES } from '../../data/content';

interface ServicesJourneySectionProps {
  onSelectService: (service: ServiceItem) => void;
}

const SERVICE_ITEMS_CONFIG = [
  { name: 'Web Development', desc: 'Custom enterprise websites, high-speed landing pages, Next.js & React architectures.' },
  { name: 'Software Development', desc: 'Scalable cloud software, billing ERPs, inventory management systems, and APIs.' },
  { name: 'Mobile App Development', desc: 'Native iOS, Android & Flutter cross-platform applications with offline-first sync.' },
  { name: 'Digital Marketing', desc: 'Search Engine Optimization (SEO), high-ROI Google & Meta ads, and local Washim dominance.' },
  { name: 'Graphic Design', desc: 'High-impact digital banners, social creatives, UI assets, and print collaterals.' },
  { name: 'Branding', desc: 'Comprehensive corporate visual identity, trademark logos, typography, and brand guides.' },
  { name: 'AI Solutions', desc: 'Private generative AI assistants, automated document processing, and predictive ML models.' },
];

export const ServicesJourneySection: React.FC<ServicesJourneySectionProps> = ({ onSelectService }) => {
  const { activeServiceIndex, setActiveServiceIndex, scrollToSection } = useScrollJourney();

  return (
    <section
      id="section-services"
      className="min-h-screen flex flex-col justify-center items-center relative px-4 sm:px-6 lg:px-8 py-24"
    >
      <div className="max-w-4xl mx-auto w-full relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/70 border border-blue-500/30 text-blue-400 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PHASE 08 // CAPABILITIES & SERVICES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
            OUR CORE <br />
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              SERVICES.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Select any capability below to trigger its unique 3D transformation in the central ecosystem.
          </p>
        </div>

        {/* Interactive 3D Service Selector List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
          {SERVICE_ITEMS_CONFIG.map((srv, idx) => {
            const isActive = idx === activeServiceIndex;
            const fullService = SERVICES[idx] || SERVICES[0];

            return (
              <div
                key={idx}
                onClick={() => {
                  setActiveServiceIndex(idx);
                }}
                className={`p-4 rounded-xl transition-all duration-200 cursor-pointer border text-left flex items-start justify-between ${
                  isActive
                    ? 'bg-blue-950/50 border-blue-500 shadow-lg shadow-blue-900/30 backdrop-blur-md'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40 backdrop-blur-sm'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[11px] font-bold text-sky-400">
                      0{idx + 1}
                    </span>
                    <h3 className={`text-base font-bold ${isActive ? 'text-white' : 'text-slate-200'}`}>
                      {srv.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {srv.desc}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0 ml-3">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isActive ? 'bg-sky-400 animate-ping' : 'bg-slate-700'
                    }`}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectService(fullService);
                    }}
                    className="text-[11px] text-sky-400 hover:text-sky-300 font-semibold inline-flex items-center gap-1 mt-1 cursor-pointer"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => scrollToSection(9)}
        aria-label="Next chapter"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer"
      >
        <ChevronDown className="w-4 h-4 animate-bounce text-blue-400" />
      </button>
    </section>
  );
};
