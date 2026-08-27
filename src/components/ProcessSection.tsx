import React from 'react';
import { PROCESS_STEPS } from '../data/content';
import { Search, ClipboardList, Code2, Rocket, Activity } from 'lucide-react';
import { ProcessStep } from '../types';
import { motion } from 'motion/react';
import { WebGLSectionReveal } from './WebGLSectionReveal';
import { TiltCard3D } from './TiltCard3D';
import { useSiteContent } from '../context/SiteContentContext';

export const ProcessSection: React.FC = () => {
  const { content } = useSiteContent();
  const currentSteps = content.processSteps?.length ? content.processSteps : PROCESS_STEPS;

  const getStepIcon = (iconName: ProcessStep['iconName']) => {
    const iconClass = "w-5 h-5 text-white";
    switch (iconName) {
      case 'search':
        return <Search className={iconClass} />;
      case 'clipboard-list':
        return <ClipboardList className={iconClass} />;
      case 'code-2':
        return <Code2 className={iconClass} />;
      case 'rocket':
        return <Rocket className={iconClass} />;
      default:
        return <Search className={iconClass} />;
    }
  };

  return (
    <section id="process" className="py-14 sm:py-16 lg:py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Cyber Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none select-none"
        style={{
          backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with 3D Matrix Reveal */}
        <WebGLSectionReveal preset="matrix-3d" className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-950/80 border border-sky-800/60 mb-3">
            <Activity className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span className="text-sky-400 text-xs font-bold tracking-widest uppercase">
              AGILE EXECUTION PIPELINE
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3">
            Our High-Velocity 4-Step Process
          </h2>
          <div className="w-12 h-1 bg-blue-600 rounded-full mx-auto" />
        </WebGLSectionReveal>

        {/* 4-Step Process Flow with High-Tech Laser Connection & 3D Stagger */}
        <div className="relative">
          
          {/* Animated Connecting Laser Beam for desktop */}
          <div className="hidden lg:block absolute top-7 left-16 right-16 h-0.5 bg-slate-800 -z-0 overflow-hidden">
            <motion.div 
              className="w-32 h-full bg-gradient-to-r from-transparent via-sky-400 to-transparent"
              animate={{ x: [-100, 800] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: "linear" }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 relative z-10 perspective-1000">
            {currentSteps.map((step, idx) => (
              <WebGLSectionReveal
                key={step.number || idx}
                preset="grid-stagger"
                delay={idx * 0.12}
                duration={0.7}
                className="h-full"
              >
                <TiltCard3D
                  id={`process-step-${step.number || idx}`}
                  maxTilt={6}
                  scale={1.03}
                  className="h-full"
                >
                  <div className="h-full flex flex-col items-center sm:items-start text-center sm:text-left group bg-slate-900/60 p-6 rounded-2xl border border-slate-800/90 hover:border-sky-500/60 transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-sky-950/40">
                    {/* Node with Badge & Number */}
                    <div className="flex items-center gap-3 mb-5">
                      {/* Circular Blue Icon Badge with Pulse Ring */}
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-700 to-sky-500 flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-110 group-hover:shadow-blue-500/60 transition-transform duration-300 ring-4 ring-slate-900">
                          {getStepIcon(step.iconName)}
                        </div>
                        {/* Pulsing radar ring */}
                        <div className="absolute inset-0 rounded-full border border-sky-400/40 animate-ping pointer-events-none opacity-20" />
                      </div>

                      {/* Step Number with Tech Styling */}
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] text-slate-400 tracking-wider">PHASE</span>
                        <span className="text-2xl sm:text-3xl font-black text-sky-400 tracking-tight font-mono">
                          {step.number || `0${idx + 1}`}
                        </span>
                      </div>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-slate-300 text-sm leading-relaxed max-w-xs font-normal">
                      {step.description}
                    </p>
                  </div>
                </TiltCard3D>
              </WebGLSectionReveal>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};


