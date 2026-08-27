import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { WebGLCanvasBackground } from './WebGLCanvasBackground';
import { ClientsMarquee } from './ClientsMarquee';
import { useSiteContent } from '../context/SiteContentContext';

interface HeroProps {
  onExploreServices: () => void;
  onOpenContact: () => void;
  heroImage?: string;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreServices,
  onOpenContact,
  heroImage: propHeroImage,
}) => {
  const { content } = useSiteContent();
  const heroData = content.hero;
  const currentHeroImage = propHeroImage || heroData.heroImage;

  return (
    <section
      id="home"
      style={{ perspective: 1400 }}
      className="relative w-full min-h-[90vh] lg:min-h-screen pt-24 sm:pt-28 lg:pt-32 pb-0 text-white flex flex-col justify-between overflow-hidden bg-slate-950"
    >
      {/* Full Background Image Layer - Edge-to-Edge Perfect Fit */}
      <div className="absolute inset-0 select-none pointer-events-none z-0">
        <img
          id="hero-bg-image"
          src={currentHeroImage}
          alt="Shrinath IT Solutions Hero"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Cinematic gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950/95" />
      </div>

      {/* WebGL Ambient Particle Matrix */}
      <WebGLCanvasBackground variant="hero" particleCount={40} className="z-[2] opacity-75" />

      {/* Hero Content Over Image with 3D Matrix Perspective Entrance */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto py-6 sm:py-10">
        <div className="max-w-2xl lg:max-w-3xl flex flex-col items-start space-y-6">

          {/* Main Headline with 3D Depth Entrance */}
          <motion.h1
            id="hero-main-heading"
            initial={{ opacity: 0, y: 35, rotateX: 18, scale: 0.95, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-white"
          >
            {heroData.headlinePart1}{' '}
            <span className="text-gradient-blue">{heroData.headlineGradient}</span>
          </motion.h1>

          {/* Subtitle / Paragraph */}
          <motion.p
            id="hero-subtext"
            initial={{ opacity: 0, y: 25, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-xl font-normal"
          >
            {heroData.subtext}
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto"
          >
            <motion.button
              id="hero-explore-services-btn"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={onExploreServices}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all cursor-pointer w-full sm:w-auto shadow-lg shadow-blue-600/35 hover:shadow-blue-600/50"
            >
              <span>{heroData.primaryCta || 'Explore Services'}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              id="hero-contact-btn"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenContact}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-medium text-sm border border-slate-700/80 hover:border-slate-500 transition-all cursor-pointer w-full sm:w-auto shadow-md"
            >
              <span>{heroData.secondaryCta || 'Get In Touch'}</span>
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </motion.button>
          </motion.div>

        </div>
      </div>

      {/* Trusted By Client Logos Marquee - Overlaid on the hero section image at the bottom below CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="w-full relative z-10"
      >
        <ClientsMarquee />
      </motion.div>
    </section>
  );
};


