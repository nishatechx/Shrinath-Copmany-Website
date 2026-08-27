import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/content';
import { Star, Quote, MessageSquareQuote, CheckCircle2, MapPin, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { WebGLSectionReveal } from './WebGLSectionReveal';
import { TiltCard3D } from './TiltCard3D';
import { useSiteContent } from '../context/SiteContentContext';

export const TestimonialsSection: React.FC = () => {
  const { content } = useSiteContent();
  const currentTestimonials = content.testimonials?.length ? content.testimonials : TESTIMONIALS;
  const [showAll, setShowAll] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  // Color accents for initials badges
  const avatarColors = [
    'from-blue-600 to-indigo-700 text-white shadow-blue-500/25',
    'from-sky-600 to-blue-700 text-white shadow-sky-500/25',
    'from-indigo-600 to-blue-800 text-white shadow-indigo-500/25',
    'from-blue-700 to-sky-800 text-white shadow-blue-500/25',
    'from-violet-600 to-blue-700 text-white shadow-purple-500/25',
    'from-emerald-600 to-teal-700 text-white shadow-emerald-500/25',
    'from-amber-600 to-orange-700 text-white shadow-amber-500/25',
    'from-cyan-600 to-blue-700 text-white shadow-cyan-500/25',
  ];

  const displayedTestimonials = showAll ? currentTestimonials : currentTestimonials.slice(0, 6);

  return (
    <section id="testimonials" className="py-14 sm:py-16 lg:py-20 bg-slate-50 text-slate-900 relative overflow-hidden">
      
      {/* Decorative Large Watermark Quote Mark */}
      <div className="absolute top-10 right-10 lg:right-24 text-slate-200/50 pointer-events-none select-none -z-0">
        <Quote className="w-48 h-48 lg:w-72 lg:h-72 transform rotate-180 opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with 3D Matrix Reveal */}
        <WebGLSectionReveal preset="matrix-3d" className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-blue-600 text-xs font-bold tracking-widest uppercase">
              CLIENT TESTIMONIALS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            What Our Clients Say
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto mb-3">
            Real feedback from local business owners, academy directors, and healthcare professionals who trust Shrinath IT Solutions.
          </p>
          <div className="w-12 h-1 bg-blue-600 rounded-full mx-auto" />
        </WebGLSectionReveal>

        {/* Testimonials Cards Grid with 3D Stagger & Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10 perspective-1000">
          {displayedTestimonials.map((t, idx) => (
            <WebGLSectionReveal
              key={t.id}
              preset="grid-stagger"
              delay={(idx % 6) * 0.08}
              duration={0.65}
              className="h-full"
            >
              <TiltCard3D
                id={`testimonial-card-${t.id}`}
                maxTilt={5}
                scale={1.02}
                onClick={() => setActiveIdx(idx)}
                className="h-full"
              >
                <div
                  className={`h-full bg-white rounded-2xl p-7 border transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl cursor-pointer ${
                    activeIdx === idx
                      ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-blue-100'
                      : 'border-slate-200/90 hover:border-blue-300'
                  }`}
                >
                  <div>
                    {/* Header inside card: Stars + Verified Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(t.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      {t.verified !== false && (
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Verified Client</span>
                        </div>
                      )}
                    </div>

                    {/* Quote Text */}
                    <p className="text-slate-700 text-sm sm:text-[15px] leading-relaxed mb-6 font-normal">
                      "{t.quote}"
                    </p>
                  </div>

                  {/* Author Info: Clean Monogram Initials + Realistic Marathi Name & Location/Role */}
                  <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${avatarColors[idx % avatarColors.length]} flex items-center justify-center font-bold text-sm tracking-wider font-mono shadow-md shrink-0`}>
                      {t.initials || t.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-slate-900 text-sm truncate">
                        {t.name}
                      </h4>
                      <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mt-0.5 flex-wrap">
                        {t.role && <span>{t.role}</span>}
                        {t.role && t.location && <span className="text-slate-300">•</span>}
                        {t.location && (
                          <span className="inline-flex items-center gap-0.5 text-blue-600 font-semibold">
                            <MapPin className="w-3 h-3 text-blue-500 shrink-0" />
                            {t.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard3D>
            </WebGLSectionReveal>
          ))}
        </div>

        {/* View All / Toggle Button if more than 6 testimonials */}
        {currentTestimonials.length > 6 && (
          <div className="flex justify-center pt-2 pb-4">
            <button
              id="toggle-all-testimonials-btn"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-sm font-semibold shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>{showAll ? 'Show Fewer Reviews' : `View All Reviews (${currentTestimonials.length})`}</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

