import React, { useState, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { PREMIUM_EASE, useMotionSettings } from '../hooks/useMotionConfig';
import { TiltCard } from './TiltCard';

export interface ProjectData {
  id: string;
  title: string;
  categoryName: string;
  category: 'business' | 'ecommerce' | 'education' | 'healthcare' | 'restaurants';
  image: string;
  demoUrl?: string;
  client: string;
  description: string;
  features: string[];
}

export const PROJECTS_LIST: ProjectData[] = [
  {
    id: 'retail-business',
    title: 'Local Business Website',
    categoryName: 'Retail & Shops',
    category: 'business',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
    client: 'Mahalaxmi Traders, Washim',
    description: 'A modern high-conversion e-catalog and inquiry website for a prominent retail and wholesale merchant in Washim.',
    features: ['Interactive Product Catalog', '1-Click WhatsApp Ordering', 'Google Business Sync', 'Speed Score 98+'],
  },
  {
    id: 'education-portal',
    title: 'Educational Institute',
    categoryName: 'Schools & Coaching',
    category: 'education',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    client: 'Vidarbha Science & IT Academy, Washim',
    description: 'An interactive digital portal for students and parents featuring admission forms, course syllabi, fee notifications and exam schedules.',
    features: ['Online Admission Portal', 'Fee Payment Integration', 'Student Noticeboard', 'Mobile Friendly LMS'],
  },
  {
    id: 'healthcare-clinic',
    title: 'Healthcare Website',
    categoryName: 'Clinics & Hospitals',
    category: 'healthcare',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    client: 'Sanjivani Multispeciality Hospital, Washim',
    description: 'Clean, accessible healthcare website featuring instant appointment booking, doctor profiles, emergency contact hotline, and pathology report status.',
    features: ['Doctor Appointment Booking', 'OPD Timetable & Emergency Hotline', 'Patient Testimonials', 'HIPAA & SSL Security'],
  },
  {
    id: 'restaurant-bistro',
    title: 'Restaurant Website',
    categoryName: 'Food & Beverages',
    category: 'restaurants',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    client: 'Spice Symphony Lounge & Family Dining',
    description: 'Vibrant culinary showcase with digital QR menu, table reservation engine, food photography gallery, and Zomato/Swiggy order integration.',
    features: ['QR Digital Menu', 'Table Booking Form', 'Catering Inquiries', 'Location Directions via Google Maps'],
  },
];

interface WorkSectionProps {
  onSelectProject: (project: ProjectData) => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });
  const { reducedMotion } = useMotionSettings();

  const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'business', label: 'Business Websites' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'education', label: 'Education' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'restaurants', label: 'Restaurants' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS_LIST
    : activeFilter === 'ecommerce'
    ? PROJECTS_LIST.filter((p) => p.category === 'business' || p.category === 'ecommerce')
    : PROJECTS_LIST.filter((p) => p.category === activeFilter);

  return (
    <section ref={sectionRef} id="portfolio" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-6">
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: PREMIUM_EASE }}
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAB308] text-slate-950 text-xs font-extrabold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-slate-950"></span>
              OUR WORK
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Some of Our Recent Projects
            </h2>
          </motion.div>

          {/* Filter Pills with sliding morphing active indicator */}
          <div className="flex flex-wrap items-center gap-2">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'text-slate-950 font-bold'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {/* Sliding Yellow Background Pill */}
                  {isActive && (
                    <motion.span
                      layoutId="activeFilterPill"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 shadow-md shadow-amber-500/30 z-0"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Projects Grid with AnimatePresence & layout transitions */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                  transition={{
                    duration: 0.5,
                    delay: isInView ? idx * 0.08 : 0,
                    ease: PREMIUM_EASE,
                  }}
                  className="h-full"
                >
                  <TiltCard
                    onClick={() => onSelectProject(project)}
                    className="group h-full flex flex-col bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    {/* Laptop Mockup Display Header */}
                    <div className="bg-[#1a1e27] p-2.5 pb-0 rounded-t-xl border-b border-slate-800">
                      {/* Laptop screen bezel */}
                      <div className="flex items-center space-x-1.5 pb-2 px-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                        <div className="ml-2 flex-1 bg-slate-800 rounded px-2 py-0.5 text-[9px] text-slate-400 font-mono truncate">
                          https://{project.id}.shrinathit.in
                        </div>
                      </div>

                      {/* Mockup Preview Image: 1 -> 1.04 smooth scale */}
                      <div className="relative h-44 sm:h-48 overflow-hidden rounded-t-md bg-slate-900">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 filter brightness-95"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-slate-950/20 group-hover:opacity-0 transition-opacity duration-300" />
                      </div>
                    </div>

                    {/* Card Footer: Title, Subtitle, External Link Icon */}
                    <div className="p-4 flex items-center justify-between flex-1">
                      <div className="transform transition-transform duration-250 group-hover:-translate-y-0.5">
                        <h3 className="font-bold text-base text-slate-900 group-hover:text-[#D97706] transition-colors duration-200">
                          {project.title}
                        </h3>
                        <p className="text-xs font-medium text-slate-500 mt-0.5">
                          {project.categoryName}
                        </p>
                      </div>

                      <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-[#EAB308] flex items-center justify-center text-slate-600 group-hover:text-slate-950 transition-all duration-250">
                        <ExternalLink className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
