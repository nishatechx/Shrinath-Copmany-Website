import React from 'react';
import { ABOUT_STATS } from '../data/content';
import { CheckCircle2, ArrowRight, Compass, Smile, UserCheck, Award, Sparkles, ShieldCheck } from 'lucide-react';
import { StatItem } from '../types';
import { motion } from 'motion/react';
import { AnimatedCounter } from './AnimatedCounter';
import { WebGLSectionReveal } from './WebGLSectionReveal';
import { TiltCard3D } from './TiltCard3D';
import { useSiteContent } from '../context/SiteContentContext';

interface AboutSectionProps {
  onOpenAboutModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenAboutModal }) => {
  const { content } = useSiteContent();
  const aboutData = content.about;
  const currentStats = aboutData.stats?.length ? aboutData.stats : ABOUT_STATS;
  const bullets = aboutData.bullets?.length
    ? aboutData.bullets
    : [
        'Client-focused approach & dedicated engineering',
        'Innovative, scalable & cost-effective architecture',
        'On-time delivery, 99.9% uptime & 24/7 technical support',
      ];

  const getStatIcon = (iconName: StatItem['iconName']) => {
    switch (iconName) {
      case 'folder-git':
        return <Compass className="w-6 h-6 text-sky-400" />;
      case 'smile':
        return <Smile className="w-6 h-6 text-blue-400" />;
      case 'clock':
        return <UserCheck className="w-6 h-6 text-sky-400" />;
      case 'award':
        return <Award className="w-6 h-6 text-blue-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-blue-400" />;
    }
  };

  return (
    <section id="about" className="py-14 sm:py-16 lg:py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: About Copy with 3D Split-Left Reveal */}
          <WebGLSectionReveal preset="split-left" duration={0.8} className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-800/60 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-sky-400 text-xs font-bold tracking-widest uppercase">
                  {aboutData.badgeText || 'ENTERPRISE-GRADE EXPERTISE'}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {aboutData.headline || 'Your Strategic Partner For'} <br />
                <span className="text-gradient-blue">{aboutData.headlineGradient || 'Digital Success'}</span>
              </h2>
            </div>

            <p className="text-slate-300 text-base leading-relaxed">
              {aboutData.paragraph}
            </p>

            {/* Checklist */}
            <div className="space-y-3 pt-2">
              {bullets.map((bullet, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                  <span className="text-slate-200 text-sm font-medium">
                    {bullet}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                id="about-know-more-btn"
                onClick={onOpenAboutModal}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Know More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </WebGLSectionReveal>

          {/* Right Column: 2x2 Stats Grid with Staggered 3D Tilt Cards */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 perspective-1000">
              {currentStats.map((stat, idx) => (
                <WebGLSectionReveal
                  key={idx}
                  preset="grid-stagger"
                  delay={idx * 0.1}
                  duration={0.65}
                >
                  <TiltCard3D
                    id={`stat-card-${idx}`}
                    maxTilt={8}
                    scale={1.03}
                    className="h-full"
                  >
                    <div className="h-full bg-slate-900/90 hover:bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-lg hover:shadow-blue-900/30 transition-all duration-300 group relative overflow-hidden">
                      {/* Subtle top laser line */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="flex items-center justify-between mb-3">
                        {/* Icon */}
                        <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-800/40 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-blue-500/60 transition-all">
                          {getStatIcon(stat.iconName)}
                        </div>
                        {/* Tech telemetry label */}
                        <span className="font-mono text-[10px] text-slate-500 tracking-wider">
                          STAT // 0{idx + 1}
                        </span>
                      </div>

                      {/* Stat text */}
                      <div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-sky-300 transition-colors font-mono flex items-baseline">
                          <AnimatedCounter
                            value={stat.value}
                            duration={2}
                            delay={0.1 + idx * 0.12}
                          />
                        </div>
                        <div className="text-slate-400 text-xs sm:text-sm font-medium mt-1">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </TiltCard3D>
                </WebGLSectionReveal>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};


