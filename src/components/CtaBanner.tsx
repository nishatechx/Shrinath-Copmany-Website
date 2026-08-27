import React from 'react';
import { Send, ArrowRight } from 'lucide-react';
import { WebGLSectionReveal } from './WebGLSectionReveal';
import { TiltCard3D } from './TiltCard3D';

interface CtaBannerProps {
  onOpenContact: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenContact }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mb-16 z-20 perspective-1000">
      <WebGLSectionReveal preset="depth-lift" duration={0.8}>
        <TiltCard3D maxTilt={4} scale={1.01} className="w-full">
          <div
            id="cta-project-banner"
            className="bg-gradient-to-r from-[#071126] via-[#0b1b3d] to-[#071126] rounded-3xl p-8 sm:p-12 border border-blue-900/50 shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
          >
            {/* Background glow effects */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[70px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-sky-500/15 rounded-full blur-[70px] pointer-events-none" />

            {/* Left Side: Icon & Copy */}
            <div className="flex items-center gap-5 sm:gap-6 relative z-10 text-center md:text-left flex-col md:flex-row">
              {/* Blue Circular Icon */}
              <div className="w-16 h-16 rounded-full bg-blue-600/90 flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/40 ring-4 ring-blue-500/20">
                <Send className="w-7 h-7 text-white transform -rotate-12 translate-x-0.5" />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Have A Project In Mind?
                </h3>
                <p className="text-slate-300 text-sm sm:text-base mt-1 font-normal">
                  Let's discuss how we can help you achieve your goals.
                </p>
              </div>
            </div>

            {/* Right Side: Button */}
            <div className="relative z-10 shrink-0 w-full md:w-auto">
              <button
                id="cta-banner-get-in-touch-btn"
                onClick={onOpenContact}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </TiltCard3D>
      </WebGLSectionReveal>
    </div>
  );
};
