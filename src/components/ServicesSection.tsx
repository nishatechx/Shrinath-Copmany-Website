import React from 'react';
import { SERVICES } from '../data/content';
import { ServiceItem } from '../types';
import { Monitor, Cpu, Smartphone, Megaphone, Gem, Edit3, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { WebGLSectionReveal } from './WebGLSectionReveal';
import { TiltCard3D } from './TiltCard3D';
import { useSiteContent } from '../context/SiteContentContext';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const { content } = useSiteContent();
  const currentServices = content.services?.length ? content.services : SERVICES;

  const getIcon = (name: ServiceItem['iconName']) => {
    const iconClass = "w-6 h-6 text-blue-600 transition-transform duration-300 group-hover:scale-110";
    switch (name) {
      case 'monitor':
        return <Monitor className={iconClass} />;
      case 'cpu':
        return <Cpu className={iconClass} />;
      case 'smartphone':
        return <Smartphone className={iconClass} />;
      case 'megaphone':
        return <Megaphone className={iconClass} />;
      case 'diamond':
        return <Gem className={iconClass} />;
      case 'edit-3':
        return <Edit3 className={iconClass} />;
      default:
        return <Monitor className={iconClass} />;
    }
  };

  return (
    <section id="services" className="pt-8 pb-14 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20 bg-white text-slate-900 relative overflow-hidden">
      {/* High-tech background grid ambient lines */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none select-none"
        style={{
          backgroundImage: `linear-gradient(to right, #0284c7 1px, transparent 1px), linear-gradient(to bottom, #0284c7 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with WebGL 3D Matrix Entrance */}
        <WebGLSectionReveal preset="matrix-3d" className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 mb-3">
            <Zap className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span className="text-blue-600 text-xs font-bold tracking-widest uppercase">
              HIGH-PERFORMANCE CAPABILITIES
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3.5">
            Complete Digital Solutions Under One Roof
          </h2>
          {/* High-tech pulsing indicator line */}
          <div className="relative w-24 h-1 bg-slate-200 rounded-full mx-auto overflow-hidden">
            <motion.div 
              className="absolute inset-y-0 w-10 bg-blue-600 rounded-full"
              animate={{ x: [-24, 96] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            />
          </div>
        </WebGLSectionReveal>

        {/* High-Tech Services Grid with 3D WebGL Cascading Stagger and Interactive Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 perspective-1000">
          {currentServices.map((service, idx) => (
            <WebGLSectionReveal
              key={service.id}
              preset="grid-stagger"
              delay={idx * 0.08}
              duration={0.65}
              className="h-full"
            >
              <TiltCard3D
                id={`service-card-${service.id}`}
                maxTilt={7}
                scale={1.02}
                onClick={() => onSelectService(service)}
                className="h-full"
              >
                <div className="h-full group bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-blue-400/80 transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden">
                  {/* High-tech Scanning Beam on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
                    <div className="w-full h-24 bg-gradient-to-b from-blue-500/10 via-sky-400/5 to-transparent animate-scanbeam" />
                  </div>

                  {/* High-tech Corner Accents */}
                  <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
                    <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-blue-500/40 group-hover:border-blue-600 transition-colors" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none">
                    <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-blue-500/40 group-hover:border-blue-600 transition-colors" />
                  </div>

                  {/* Top Laser Accent Beam */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Header row: Tech Icon & Cyber Index Tag */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-13 h-13 rounded-xl bg-blue-50/80 border border-blue-100/90 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 shadow-sm group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
                        <div className="group-hover:brightness-0 group-hover:invert transition-all">
                          {getIcon(service.iconName)}
                        </div>
                      </div>

                      {/* High-tech Tag */}
                      <span className="font-mono text-[11px] font-semibold text-slate-400 tracking-wider bg-slate-50 group-hover:bg-blue-50 group-hover:text-blue-600 px-2.5 py-1 rounded-md border border-slate-200/70 group-hover:border-blue-200 transition-all">
                        {idx < 9 ? `0${idx + 1}` : idx + 1} // SYS
                      </span>
                    </div>

                    {/* Service Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                      <span>{service.title}</span>
                    </h3>

                    {/* Service Description */}
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                      {service.description}
                    </p>
                  </div>

                  {/* High-tech Action Link with Animated Arrow */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-blue-600 font-semibold text-sm">
                    <span className="group-hover:underline underline-offset-4">Explore Architecture</span>
                    <div className="w-7 h-7 rounded-full bg-blue-50 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-all duration-200 group-hover:translate-x-1 shadow-sm">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </TiltCard3D>
            </WebGLSectionReveal>
          ))}
        </div>

      </div>
    </section>
  );
};


