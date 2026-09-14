import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Pause, Play } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { PREMIUM_EASE, useMotionSettings } from '../hooks/useMotionConfig';

interface Testimonial {
  id: string;
  name: string;
  quote: string;
  rating: number;
  initials: string;
}

// Client testimonials with all business names and locations removed
const ALL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'ganesh-deshmukh',
    name: 'Ganesh Deshmukh',
    quote: '"Namaskar! Amchya business sathi billing aani stock management software banavun ghetla Shrinath IT kadun. Khupach sopi aani fast ahe system. Direct WhatsApp var customer la invoice aani reminder message jato. Prompt aani reliable support milto!"',
    rating: 5,
    initials: 'GD',
  },
  {
    id: 'sneha-kulkarni',
    name: 'Dr. Sneha Kulkarni',
    quote: '"Appointment booking website aani digital profile setup keli hoti. Aata daily online appointments yetat aani WhatsApp alerts mule patients che follow-up miss hot nahit. Ekdam professional aani clean work!"',
    rating: 5,
    initials: 'SK',
  },
  {
    id: 'nilesh-zanwar',
    name: 'Nilesh Zanwar',
    quote: '"Namaskar mitrano, digital catalog aani online marketing campaigns Shrinath IT ne setup kela. Direct customers che calls aani WhatsApp inquiries khup vadhele. Khup honest aani hardworking team ahe!"',
    rating: 5,
    initials: 'NZ',
  },
  {
    id: 'ajay-wankhede',
    name: 'Prof. Ajay Wankhede',
    quote: '"We got our student admission portal and test series system developed. Outstanding speed and transparent communication. Saglyat changli gosht mhanje phone kelyavar lagtech solution milta, kontech delay hot nahi."',
    rating: 5,
    initials: 'AW',
  },
  {
    id: 'santosh-rathod',
    name: 'Santosh Rathod',
    quote: '"Fast GST billing software hav hota. Barcode scanning aani invoice print ekdam smooth hoto. Seasonal rush madhe pan software kadhi hang hot nahi. Very dependable team!"',
    rating: 5,
    initials: 'SR',
  },
  {
    id: 'pooja-deshmukh',
    name: 'Pooja Deshmukh',
    quote: '"Reports direct WhatsApp var auto-share honyacha setup kela Shrinath IT ni. Patients aani clients khup khush ahet aani amcha daily 2-3 tasacha vel vachla. Itki high-standard tech company sobat kam karnyacha abhiman ahe."',
    rating: 5,
    initials: 'PD',
  },
  {
    id: 'pravin-gaikwad',
    name: 'Pravin Gaikwad',
    quote: '"Lead generation campaign chalavla hota. Genuine inquiries aale aani cost per lead khup kami aali. Shrinath IT Solutions chi digital marketing strategy khup effective ahe."',
    rating: 5,
    initials: 'PG',
  },
  {
    id: 'yogesh-jadhav',
    name: 'Yogesh Jadhav',
    quote: '"Online room booking inquiry system aani modern showcase website banavli. Search madhe top ranking milali. Clean design, fast loading, and exceptional support."',
    rating: 5,
    initials: 'YJ',
  },
  {
    id: 'sagar-pawar',
    name: 'Sagar Pawar',
    quote: '"Website speed 98+ ahe aani mobile phone var ekdam instant open hote. Direct face-to-face bhetun sagli requirement samjavun sangta aali. Ekdam trusted team!"',
    rating: 5,
    initials: 'SP',
  },
  {
    id: 'sunil-tayade',
    name: 'Sunil Tayade',
    quote: '"Billing aani daily counter sales track karnyasathi software ghetla. Staff la train pan kela Shrinath IT team ne. Payment reminders automated ahet. 100% recommended."',
    rating: 5,
    initials: 'ST',
  },
  {
    id: 'anita-shinde',
    name: 'Anita Shinde',
    quote: '"Student admissions doubled through targeted awareness campaigns and digital branding done by Shrinath IT. Extremely courteous, patient, and knowledgeable team."',
    rating: 5,
    initials: 'AS',
  },
  {
    id: 'rahul-kale',
    name: 'Rahul Kale',
    quote: '"Special festive offers che WhatsApp bulk broadcast aani promotional banners banavun ghetle. Response khup bhari aala! Affordable budget madhe aamhi brand banavun ghetla."',
    rating: 5,
    initials: 'RK',
  },
];

// Duplicate for continuous infinite horizontal scroll
const DISPLAY_TESTIMONIALS = [...ALL_TESTIMONIALS, ...ALL_TESTIMONIALS];

export const TestimonialsSection: React.FC = () => {
  const [isStopped, setIsStopped] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-50px' });
  const { reducedMotion } = useMotionSettings();

  // Drag-to-scroll state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // Smooth continuous auto-scroll loop
  useEffect(() => {
    if (isStopped || reducedMotion || !isInView) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const container = scrollContainerRef.current;
    if (!container) return;

    let lastTimestamp = performance.now();
    const pixelsPerSecond = 38; // Smooth, readable gliding speed

    const scrollLoop = (now: number) => {
      const delta = (now - lastTimestamp) / 1000;
      lastTimestamp = now;

      if (container && !isDraggingRef.current) {
        container.scrollLeft += pixelsPerSecond * delta;

        // Seamless wrap when reaching halfway through duplicated items
        const halfWidth = container.scrollWidth / 2;
        if (container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth;
        }
      }

      animationFrameRef.current = requestAnimationFrame(scrollLoop);
    };

    animationFrameRef.current = requestAnimationFrame(scrollLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isStopped, reducedMotion, isInView]);

  // Click handler: stops auto-scrolling immediately as requested
  const handleContainerClick = () => {
    // If the user just finished a mouse drag, don't trigger stop toggle
    if (hasDraggedRef.current) {
      hasDraggedRef.current = false;
      return;
    }
    // Stop scrolling if running, or toggle
    setIsStopped((prev) => !prev);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasDraggedRef.current) {
      hasDraggedRef.current = false;
      return;
    }
    // Clicking on any testimonial card stops the scroll
    setIsStopped(true);
  };

  const scrollManual = useCallback((direction: 'left' | 'right') => {
    setIsStopped(true);
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 380;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }, []);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 4) {
      hasDraggedRef.current = true;
    }
    container.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials-section"
      className="py-20 bg-white border-b border-slate-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Scroll Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: PREMIUM_EASE }}
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAB308] text-slate-950 text-xs font-extrabold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-slate-950" />
              CLIENT REVIEWS & FEEDBACK
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-2">
              What Our Clients Say
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
              Authentic reviews from entrepreneurs, doctors, institutions, and business leaders who trust our technology.
            </p>
          </motion.div>

          {/* Interactive Status & Manual Navigation Controls */}
          <div className="flex items-center space-x-3 self-start sm:self-auto shrink-0">
            {/* Toggle Status Pill */}
            <button
              onClick={() => setIsStopped((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs ${
                isStopped
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
                  : 'bg-slate-900 text-[#EAB308] hover:bg-slate-800'
              }`}
              title={isStopped ? 'Click to resume auto-scroll' : 'Click to pause auto-scroll'}
              aria-label={isStopped ? 'Resume auto-scroll' : 'Stop auto-scroll'}
            >
              {isStopped ? (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Stopped • Click to Resume</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current animate-pulse" />
                  <span>Scrolling • Click to Stop</span>
                </>
              )}
            </button>

            {/* Manual Slide Arrows */}
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => scrollManual('left')}
                aria-label="Scroll left"
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollManual('right')}
                aria-label="Scroll right"
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Informative Micro-hint */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-4 px-1">
          <span>{isStopped ? 'Scroll stopped. You can drag or use arrows to explore.' : 'Click anywhere on testimonials to stop scrolling.'}</span>
          <span className="font-semibold text-slate-600">{ALL_TESTIMONIALS.length} Verified Reviews</span>
        </div>
      </div>

      {/* Horizontally Scrollable Testimonials Track */}
      <div className="relative w-full">
        {/* Subtle Edge Gradients for Smooth Ingress/Egress */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent z-10" />

        <div
          ref={scrollContainerRef}
          onClick={handleContainerClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="flex space-x-6 overflow-x-auto py-4 px-4 sm:px-8 cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollBehavior: isDraggingRef.current ? 'auto' : 'smooth' }}
        >
          {DISPLAY_TESTIMONIALS.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              onClick={handleCardClick}
              className="w-[310px] sm:w-[370px] shrink-0 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-[#EAB308] hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                {/* Client Info Header (NO business name, NO location) */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {/* Monogram Badge */}
                    <div className="w-11 h-11 rounded-full bg-slate-950 text-[#EAB308] font-black text-sm flex items-center justify-center border border-slate-800 shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform">
                      {item.initials}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-slate-900 leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-xs text-amber-700 font-semibold mt-0.5">
                        Client Review
                      </p>
                    </div>
                  </div>

                  <div className="flex-shrink-0 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center text-[10px] font-bold">
                    <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                    Verified
                  </div>
                </div>

                {/* 5 Yellow Stars */}
                <div className="flex items-center space-x-1 mb-3.5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
                  ))}
                </div>

                {/* Honest Quote */}
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  {item.quote}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-medium text-slate-500">Verified Client Feedback</span>
                <span className="text-amber-600 font-bold">5.0 ★</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
