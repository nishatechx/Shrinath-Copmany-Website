import React, { useState, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { PREMIUM_EASE, useMotionSettings } from '../hooks/useMotionConfig';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}

const ALL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'sagar-pawar',
    name: 'Sagar Pawar',
    role: 'Business Owner, Washim',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    quote: '"Very professional service. Our website looks amazing and we are getting more customers now!"',
    rating: 5,
  },
  {
    id: 'pooja-deshmukh',
    name: 'Pooja Deshmukh',
    role: 'Entrepreneur, Washim',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    quote: '"Great support and creative ideas. Highly recommended for digital marketing services."',
    rating: 5,
  },
  {
    id: 'rahul-kale',
    name: 'Rahul Kale',
    role: 'Shop Owner, Washim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    quote: '"Affordable pricing and excellent work. They understand local business needs very well."',
    rating: 5,
  },
  {
    id: 'anita-shinde',
    name: 'Anita Shinde',
    role: 'Clinic Director, Washim',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    quote: '"Our clinic patient appointment scheduling doubled in 30 days after Shrinath IT launched our portal!"',
    rating: 5,
  },
  {
    id: 'vikram-patil',
    name: 'Vikram Patil',
    role: 'Coaching Institute Head, Washim',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
    quote: '"Remarkable speed, clear communication in Marathi & English, and zero downtime. Highly recommended."',
    rating: 5,
  },
];

export const TestimonialsSection: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });
  const { reducedMotion } = useMotionSettings();

  const handlePrev = () => {
    setDirection(-1);
    setStartIndex((prev) => (prev === 0 ? ALL_TESTIMONIALS.length - 3 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setStartIndex((prev) => (prev >= ALL_TESTIMONIALS.length - 3 ? 0 : prev + 1));
  };

  // Get current 3 testimonials window
  const currentReviews = [
    ALL_TESTIMONIALS[startIndex % ALL_TESTIMONIALS.length],
    ALL_TESTIMONIALS[(startIndex + 1) % ALL_TESTIMONIALS.length],
    ALL_TESTIMONIALS[(startIndex + 2) % ALL_TESTIMONIALS.length],
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Nav Arrows */}
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: PREMIUM_EASE }}
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAB308] text-slate-950 text-xs font-extrabold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-slate-950"></span>
              TESTIMONIALS
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-2">
              What Our Clients Say
            </h2>
            <p className="text-sm sm:text-base text-slate-500">
              Trusted by businesses across Washim and beyond.
            </p>
          </motion.div>

          {/* Nav Controls with micro-interactions */}
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* 3 Testimonial Cards Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="wait" initial={false}>
            {currentReviews.map((item, idx) => (
              <motion.div
                key={`${item.id}-${startIndex}`}
                initial={
                  reducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: direction * 24 }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={
                  reducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: -direction * 24 }
                }
                transition={{
                  duration: 0.45,
                  delay: idx * 0.06,
                  ease: PREMIUM_EASE,
                }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl p-6 border border-slate-200 hover:border-amber-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* User Info Header */}
                  <div className="flex items-center space-x-3.5 mb-4">
                    <motion.img
                      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 + idx * 0.05 }}
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-xs"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h3 className="font-bold text-base text-slate-900 leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {/* 5 Yellow Stars with staggered entrance */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.15 + i * 0.04, // 0.04s stagger between stars
                          ease: PREMIUM_EASE,
                        }}
                      >
                        <Star className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-slate-700 leading-relaxed italic">
                    {item.quote}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
