import React from 'react';
import { useSiteContent } from '../context/SiteContentContext';
import { CLIENT_LOGOS } from '../data/content';

export { CLIENT_LOGOS };

export const ClientsMarquee: React.FC = () => {
  const { content } = useSiteContent();
  const rawLogos = content.clientLogos?.length ? content.clientLogos : CLIENT_LOGOS;
  // Duplicate for seamless infinite marquee scroll
  const marqueeLogos = [...rawLogos, ...rawLogos, ...rawLogos];

  return (
    <div 
      id="clients" 
      className="w-full bg-slate-950/65 backdrop-blur-lg border-t border-b border-slate-700/60 py-3 relative overflow-hidden select-none z-20 flex items-center shadow-2xl"
    >
      {/* Starting "TRUSTED BY" Badge anchored over the hero image */}
      <div className="shrink-0 z-20 pl-4 sm:pl-8 pr-4 sm:pr-6 py-2 flex items-center gap-2 bg-slate-950/85 backdrop-blur-xl border-r border-slate-700/70 shadow-[10px_0_24px_rgba(2,6,23,0.85)]">
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
        <span className="text-[11px] sm:text-xs font-bold text-slate-100 uppercase tracking-widest font-mono whitespace-nowrap">
          TRUSTED BY
        </span>
      </div>

      {/* Infinite scrolling marquee track directly over hero base */}
      <div className="flex w-full overflow-hidden relative">
        {/* Side gradient fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-r from-slate-950/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-950/90 via-slate-950/60 to-transparent z-10 pointer-events-none" />

        <div className="flex items-center gap-4 sm:gap-6 animate-marquee whitespace-nowrap pl-4">
          {marqueeLogos.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-slate-900/75 hover:bg-slate-800/90 border border-slate-700/70 hover:border-sky-400/80 transition-all duration-300 hover:scale-105 shrink-0 group shadow-md backdrop-blur-sm"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                <img
                  src={client.url}
                  alt={client.name}
                  className="w-full h-full object-contain filter group-hover:contrast-105 transition-all"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `<div class="w-full h-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs rounded">${client.name.substring(0, 2).toUpperCase()}</div>`;
                    }
                  }}
                />
              </div>
              <span className="text-slate-200 text-xs sm:text-sm font-semibold tracking-tight group-hover:text-sky-300 transition-colors whitespace-nowrap">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

