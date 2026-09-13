import React, { useRef } from 'react';
import {
  Monitor,
  BarChart3,
  Smartphone,
  PenTool,
  Instagram,
  Video,
  Server,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { PREMIUM_EASE, useMotionSettings } from '../hooks/useMotionConfig';
import { TiltCard } from './TiltCard';

export interface ServiceData {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
}

export const SERVICES_LIST: ServiceData[] = [
  {
    id: 'web-dev',
    icon: Monitor,
    title: 'Website Development',
    description: 'Modern, mobile-friendly websites for businesses, startups and professionals.',
    longDescription:
      'We build high-speed, SEO-optimized, responsive websites tailored to convert visitors into loyal clients. From corporate portfolios to high-conversion landing pages.',
    features: ['100% Mobile Responsive', 'Fast Page Load Speeds', 'Built-in Local SEO', 'Easy Content Management'],
  },
  {
    id: 'digital-marketing',
    icon: BarChart3,
    title: 'Digital Marketing',
    description: 'Social media marketing, Google ads and strategies to grow your brand online.',
    longDescription:
      'Targeted pay-per-click ads, local search visibility, and data-driven marketing campaigns to capture qualified leads across Washim and Maharashtra.',
    features: ['Google Search & Maps Ads', 'Meta Lead Ads', 'High ROI Strategy', 'Bi-weekly Analytics'],
  },
  {
    id: 'mobile-app',
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Custom Android & iOS apps to bring your ideas to life.',
    longDescription:
      'Native and cross-platform mobile apps with intuitive UI/UX, push notifications, offline syncing, and secure backend integrations for business scalability.',
    features: ['Android & iOS Apps', 'Google Play Submission', 'Real-time Notifications', 'Cloud Database Sync'],
  },
  {
    id: 'branding',
    icon: PenTool,
    title: 'Logo Design & Branding',
    description: 'Create a strong identity that makes your business stand out.',
    longDescription:
      'Memorable corporate identity systems, vector brand marks, corporate stationery, color guidelines, and social media brand kits.',
    features: ['Vector SVG & EPS Files', 'Multiple Concepts & Revisions', 'Complete Stationery Kit', 'Brand Style Guide'],
  },
  {
    id: 'social-media',
    icon: Instagram,
    title: 'Social Media Management',
    description: 'Engage your audience and increase your online presence.',
    longDescription:
      'Daily creative posts, reels, stories, community management, and paid boost strategies to turn followers into active paying customers.',
    features: ['Custom Graphic Designs', 'Viral Reel Creation', 'Audience Engagement', 'Growth Reports'],
  },
  {
    id: 'content-creation',
    icon: Video,
    title: 'Content Creation',
    description: 'High-quality graphics, videos and content for your brand.',
    longDescription:
      'Compelling copywriting, product photography, animated promo videos, and infographic brochures designed to articulate your core strengths.',
    features: ['Commercial Ad Videos', 'Product Showcases', 'SEO Articles & Copy', 'High-Res Graphics'],
  },
  {
    id: 'hosting',
    icon: Server,
    title: 'Domain & Hosting',
    description: 'Reliable domain registration and hosting services.',
    longDescription:
      'High-speed SSD cloud hosting with 99.9% uptime, free SSL certificates, automated daily backups, and business email setup.',
    features: ['99.9% Uptime SLA', 'Free SSL Certificates', 'Business Email (you@company.in)', 'Malware Protection'],
  },
  {
    id: 'consultation',
    icon: MessageSquare,
    title: 'IT Consultation',
    description: 'Get expert guidance for your digital journey.',
    longDescription:
      'Strategic tech guidance for small businesses and growing enterprises looking to automate operations, migrate to cloud, or build digital products.',
    features: ['Tech Architecture Audit', 'Software Recommendations', 'Automation Advisory', 'Vendor Assessment'],
  },
];

interface ServicesSectionProps {
  onSelectService: (service: ServiceData) => void;
  onViewAllServices: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onViewAllServices,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useInView(sectionRef, { once: true, margin: '-50px' });
  const isGridInView = useInView(gridRef, { once: true, margin: '-40px' });
  const { reducedMotion } = useMotionSettings();

  return (
    <section ref={sectionRef} id="services" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 25 }}
            animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: PREMIUM_EASE }}
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAB308] text-slate-950 text-xs font-extrabold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-slate-950"></span>
              OUR SERVICES
            </div>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Everything You Need <br />
              to Grow Online
            </h2>
          </motion.div>

          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: PREMIUM_EASE }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:max-w-md"
          >
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              End-to-end digital solutions to help your business build, promote and
              grow in today's digital world.
            </p>
            <motion.button
              onClick={onViewAllServices}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-shrink-0 relative inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:via-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-orange-500/35 transition-all cursor-pointer whitespace-nowrap group overflow-hidden"
            >
              <span className="relative z-10">View All Services</span>
              <ArrowRight className="relative z-10 w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/10 opacity-70 group-hover:opacity-100 pointer-events-none" />
            </motion.button>
          </motion.div>
        </div>

        {/* 8 Dark Cards Grid: 80-120ms staggered entrance, 6px upward lift, line expand */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_LIST.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 35, scale: 0.98 }}
                animate={isGridInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.09, // 90ms stagger (first row 0..3, second row 4..7)
                  ease: PREMIUM_EASE,
                }}
                className="h-full"
              >
                <TiltCard
                  onClick={() => onSelectService(service)}
                  className="group relative h-full bg-[#161922] hover:bg-[#1c212c] border border-slate-800 hover:border-amber-500/40 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/60 cursor-pointer overflow-hidden"
                >
                  {/* Yellow Accent Line along bottom border on hover */}
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EAB308] to-amber-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 pointer-events-none" />

                  <div>
                    {/* Yellow Icon with scale and subtle brighten */}
                    <div className="w-12 h-12 rounded-lg bg-amber-500/10 group-hover:bg-amber-500/20 flex items-center justify-center text-[#EAB308] group-hover:text-amber-300 mb-5 transition-all duration-300">
                      <Icon className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-[#F5A623] transition-colors duration-200">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-6">
                      {service.description}
                    </p>
                  </div>

                  {/* Learn More Link with arrow translation */}
                  <div className="inline-flex items-center text-sm font-semibold text-[#EAB308] group-hover:text-amber-300 transition-colors duration-200">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-250 ease-out group-hover:translate-x-[6px]" />
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
