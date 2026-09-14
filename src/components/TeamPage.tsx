import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import {
  Phone,
  ArrowRight,
  Menu,
  X,
  Linkedin,
  Mail,
  Users,
  Lightbulb,
  UserCheck,
  Smile,
  GraduationCap,
  MessageSquare,
  Sparkles,
  Send,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  ArrowUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TeamPageProps {
  onNavigateHome: (targetSection?: string) => void;
  onOpenConsultation: (service?: string, title?: string) => void;
  onNavigateContact?: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  cropTouch: 'both' | 'right' | 'none';
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'shrinath-ghodake',
    name: 'Shrinath Ghodake',
    role: 'Founder & CEO',
    description: 'Leading with a vision to empower businesses through technology and scalable digital solutions.',
    image: 'https://blogger.googleusercontent.com/img/a/AVvXsEgrBXusOLCQdKD6COU2KWuu4WOZVpA8M6XdgLiRfk5Eqgq6qLZEqAz09MQ2FaPmRdQiu6xFmSfQOLddW204NGaJ8t2ba06iq7jLfJcIjQVSLcNIJZ0QmI0ncdnT25IPH99RZ7_ufIylrPO4g4eaSzVGttj1Fjze4lQwnU7cnLNu-1uXEK0hYQY1aHIjCXE',
    cropTouch: 'right', // Cropped from right side: card touches from right
  },
  {
    id: 'yashwantrao-ghodake',
    name: 'Yashwantrao Ghodake',
    role: 'Director',
    description: 'Guiding corporate direction, operational excellence, and long-term organizational strategy.',
    image: 'https://blogger.googleusercontent.com/img/a/AVvXsEj9bmdEwtDdzEVH8QleF52T-QwhN4oASsa4tH3B60bC3PbOU9jvYQiFkUm8fMVJXMIQTMy-doBFdpIbatsxQpbSAYr5C_rOi61ajhbBBdVTJhwKTUzmmuJV5AVEBTD_jI5py5km8opMhxiH_6sGcLOLQ44_GTuVQjIhu-sDdanQX25P9lgoR0ksLvA0QKo',
    cropTouch: 'both', // Cropped from both sides: cards touch from both sides
  },
  {
    id: 'rushali-babhane',
    name: 'Rushali Babhane',
    role: 'HR Manager',
    description: 'Cultivating our positive workplace culture, talent acquisition, and team development.',
    image: 'https://blogger.googleusercontent.com/img/a/AVvXsEh97WjaVIeNnlExTgwQ3Mvg9bV6tN0k5WN7Q5WwSBsH2f_yKWSJa8z-n6HF-YmeHFo3pj8IUK5s9KHrNRSeMppDCCk0QK9nD0PRRv7dzMvhzoVCg1JJAUD9AoONXHJc00E4fgPlKUok1Aw_BtEdfsoPYoDebS-qIGzx5yWlI38ex4mCvNauvNZXNitcJHc',
    cropTouch: 'none', // Natural borders: no touch forced
  },
  {
    id: 'bushan-bhise',
    name: 'Bushan Bhise',
    role: 'UI/UX Designer',
    description: 'Crafting intuitive user interfaces, engaging visual identities, and seamless product experiences.',
    image: 'https://blogger.googleusercontent.com/img/a/AVvXsEg0QXEyOZapaMKotkpm45_lS69tPQaulzpd5fQOEeSGFLyAb_KX-WBLSCVH8uvG7i1ScTFYSk_rMQMN0lLH9UGm8QHdIcUI-xQU5SC6paGC93XxSAnBTJm-GSP0-ZPnMmFJT1jpOGkvouum_9F5pUEuHudkhOJQFs0zHD5JDUNtDVlVpCbmeeU5dUFjmGU',
    cropTouch: 'both', // Cropped from both sides: cards touch from both sides
  },
  {
    id: 'naresh-nagare',
    name: 'Naresh Nagare',
    role: 'Content & Social Media Manager',
    description: 'Leading compelling brand storytelling, community engagement, and digital media strategies.',
    image: 'https://blogger.googleusercontent.com/img/a/AVvXsEhP7SyUKfTDak0HUAUCOcrr_R62XgBv7joo32tl0qmRY4nJF-VJAmqdk7qisIYaAWq6WBXCNEBBD-25LrwOfyXyar9Q-tazLaLq5AtXEUrMimjQ26Jl9qQ03Xw83MhcRijpEtLAizVFkjHHv6L2SOSyF_6beBMqpOMwyT8Qk6fC6ZEc54TbSN6wrTZqpOU',
    cropTouch: 'both', // Cropped from both sides: cards touch from both sides
  },
];

export const TeamPage: React.FC<TeamPageProps> = ({
  onNavigateHome,
  onOpenConsultation,
  onNavigateContact,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-900 flex flex-col font-sans selection:bg-[#EAB308] selection:text-slate-950">
      
      {/* =========================================================================
          1. HEADER / NAVBAR (Exact dark navbar from image.png)
      ========================================================================= */}
      <header className="sticky top-0 left-0 right-0 z-50 bg-[#0B0F17] text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div
            onClick={() => onNavigateHome('home')}
            className="cursor-pointer flex items-center py-1 transition-transform duration-200 hover:scale-[1.02]"
            aria-label="Shrinath IT Solutions Home"
          >
            <Logo size="lg" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium">
            <button
              onClick={() => onNavigateHome('home')}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => onNavigateHome('about')}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => onNavigateHome('services')}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Services
            </button>
            {/* Active Team Link with yellow underline as in screenshot */}
            <div className="relative py-1 text-white font-semibold">
              <span>Team</span>
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#EAB308] rounded-full" />
            </div>
            <button
              onClick={() => {
                if (onNavigateContact) onNavigateContact();
                else onOpenConsultation(undefined, 'Contact Our Team');
              }}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Right Action: Phone + Get Free Consultation Button */}
          <div className="hidden lg:flex items-center space-x-6">
            <a
              href="tel:+919373245688"
              className="flex items-center text-sm font-semibold text-white hover:text-[#EAB308] transition-colors"
            >
              <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center mr-2 text-[#EAB308]">
                <Phone className="w-4 h-4 fill-current" />
              </span>
              <span>+91 93732 45688</span>
            </a>

            <button
              onClick={() => onOpenConsultation(undefined, 'Get Free Consultation')}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#EAB308] hover:bg-[#FACC15] text-slate-950 font-bold text-sm shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center space-x-3">
            <button
              onClick={() => onOpenConsultation(undefined, 'Get Free Consultation')}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[#EAB308] text-slate-950 shadow-sm"
            >
              Consultation
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#0F172A] border-b border-slate-800 px-5 py-4 space-y-3"
            >
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateHome('home');
                }}
                className="block w-full text-left text-slate-300 hover:text-white py-1.5 font-medium"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateHome('about');
                }}
                className="block w-full text-left text-slate-300 hover:text-white py-1.5 font-medium"
              >
                About
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateHome('services');
                }}
                className="block w-full text-left text-slate-300 hover:text-white py-1.5 font-medium"
              >
                Services
              </button>
              <div className="block w-full text-left text-[#EAB308] font-bold py-1.5">
                Team (Current Page)
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigateContact) onNavigateContact();
                  else onOpenConsultation(undefined, 'Contact Our Team');
                }}
                className="block w-full text-left text-slate-300 hover:text-white py-1.5 font-medium"
              >
                Contact
              </button>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <a href="tel:+919373245688" className="flex items-center text-xs text-white font-semibold">
                  <Phone className="w-3.5 h-3.5 mr-2 text-[#EAB308]" />
                  <span>+91 93732 45688</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* =========================================================================
          2. HERO SECTION (People Behind Our Success - Minimal Height)
      ========================================================================= */}
      <section className="relative overflow-hidden py-6 sm:py-8 lg:py-9 bg-gradient-to-b from-[#FAF8F2] via-[#FAF9F5] to-white border-b border-amber-100/60">
        
        {/* User-requested Team Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <img
            src="https://blogger.googleusercontent.com/img/a/AVvXsEjPNeP2csxfvk7lsiqYg3DLwIqieLVbLfZeCfTZc9tfSK-90-NGa6vgkmoeSDa6yrOZ-Mgz5u7r7DPi5YAlD8v-t8CSjgTl9FnXfFvcwe_xBii_RgyF9QGAXfRww-PWo7Tmf24p5jNEfqjPy0VU0sy_2LE08xHwobkzXV3GZFti-rUUl648xmFP7Q7dbrg=s1600"
            alt="Team Background"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Soft radial yellow glow on top right */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-200/30 via-amber-100/15 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Column: Heading + Description + Button (5 cols) */}
            <div className="lg:col-span-5">
              {/* Yellow Dash + "Our Team" subtitle */}
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-0.5 bg-[#EAB308] rounded-full" />
                <span className="text-[11px] sm:text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Our Team
                </span>
              </div>

              {/* Main Headline (Minimal Height) */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight mb-2">
                People Behind Our <span className="text-[#EAB308]">Success</span>
              </h1>

              {/* Subtext */}
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-md">
                A passionate team of creators, strategists and developers working together to build digital solutions that make a real impact.
              </p>
            </div>

            {/* Center Artistic Cursive Text: "Build Innovate Grow Together" (3 cols) */}
            <div className="lg:col-span-3 flex justify-center items-center py-2 lg:py-0">
              <div className="relative text-center select-none rotate-[-4deg] sm:rotate-[-6deg]">
                <div className="font-['Caveat',cursive] font-bold text-2xl sm:text-3xl lg:text-[34px] leading-tight text-slate-700 tracking-wide">
                  <div>Build</div>
                  <div className="pl-3 sm:pl-4">Innovate</div>
                  <div className="pl-6 sm:pl-8">Grow</div>
                  <div className="pl-8 sm:pl-10 relative inline-block text-slate-900">
                    <span>Together</span>
                    {/* Hand-drawn double yellow brush curve under "Together" */}
                    <svg
                      viewBox="0 0 160 24"
                      className="absolute -bottom-2 left-0 w-full h-3.5 text-[#EAB308]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    >
                      <path d="M 5,8 Q 80,18 155,6" />
                      <path d="M 20,16 Q 90,24 145,14" opacity="0.8" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 4 Feature Value Items in a compact 2x2 grid (4 cols) */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-2.5 sm:gap-3">
              
              {/* 1. Team Work */}
              <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-white/70 border border-amber-100/70 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] text-[#D97706] flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-950 text-xs truncate">Team Work</h3>
                  <p className="text-[11px] text-slate-500 truncate">We grow together</p>
                </div>
              </div>

              {/* 2. Innovation */}
              <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-white/70 border border-amber-100/70 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] text-[#D97706] flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-950 text-xs truncate">Innovation</h3>
                  <p className="text-[11px] text-slate-500 truncate">Always learning</p>
                </div>
              </div>

              {/* 3. Client Focus */}
              <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-white/70 border border-amber-100/70 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] text-[#D97706] flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-950 text-xs truncate">Client Focus</h3>
                  <p className="text-[11px] text-slate-500 truncate">Your success</p>
                </div>
              </div>

              {/* 4. Positive Culture */}
              <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-white/70 border border-amber-100/70 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] text-[#D97706] flex items-center justify-center flex-shrink-0">
                  <Smile className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-950 text-xs truncate">Positive Culture</h3>
                  <p className="text-[11px] text-slate-500 truncate">Great people</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          3. "MEET OUR TEAM" / "OUR EXPERT TEAM" (8 Team Cards)
      ========================================================================= */}
      <section className="relative py-16 bg-[#FAF9F5] overflow-hidden">
        {/* User-requested Team Section Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src="https://blogger.googleusercontent.com/img/a/AVvXsEjPNeP2csxfvk7lsiqYg3DLwIqieLVbLfZeCfTZc9tfSK-90-NGa6vgkmoeSDa6yrOZ-Mgz5u7r7DPi5YAlD8v-t8CSjgTl9FnXfFvcwe_xBii_RgyF9QGAXfRww-PWo7Tmf24p5jNEfqjPy0VU0sy_2LE08xHwobkzXV3GZFti-rUUl648xmFP7Q7dbrg=s1600"
            alt="Shrinath IT Team Background"
            className="w-full h-full object-cover object-center opacity-25"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F5]/90 via-[#FAF9F5]/80 to-[#FAF9F5]/95" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              {/* Yellow horizontal dash + Meet Our Team */}
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-1 bg-[#EAB308] rounded-full" />
                <span className="text-xs sm:text-sm font-bold tracking-wider text-slate-600 uppercase">
                  Meet Our Team
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                Our <span className="text-[#EAB308]">Expert</span> Team
              </h2>
            </div>

            <p className="text-slate-600 text-sm sm:text-base max-w-md leading-relaxed">
              Get to know the people who make Shrinath IT Solutions what it is today. A dedicated team committed to your growth.
            </p>
          </div>

          {/* Minimal Team Cards Grid (2 in each row, cards touch cropped images from both sides or right side for Shrinath, 50% image protrusion, flush bottom) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-24 sm:gap-y-28 max-w-6xl mx-auto items-end">
            {TEAM_MEMBERS.map((member, index) => {
              const isFifth = index === 4;
              const touchesBoth = member.cropTouch === 'both';
              const touchesRight = member.cropTouch === 'right';

              return (
                <div
                  key={member.id}
                  className={`pt-24 sm:pt-28 ${isFifth ? 'md:col-span-2 md:max-w-[calc(50%-0.75rem)] lg:max-w-[calc(50%-1rem)] md:mx-auto w-full' : 'w-full'}`}
                >
                  <div className="relative bg-[#111315] rounded-2xl border border-neutral-800 shadow-md flex flex-row items-stretch min-h-[125px] sm:min-h-[135px]">
                    
                    {/* LEFT COLUMN: Name & Designation */}
                    <div
                      className={`${
                        touchesBoth
                          ? 'w-[34%] border-r border-neutral-800/80'
                          : touchesRight
                          ? 'w-[35%]'
                          : 'w-[35%]'
                      } p-3 sm:p-4 flex flex-col justify-center text-left z-10`}
                    >
                      <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                        {member.name}
                      </h3>
                      <p className="text-[#FFD21F] font-semibold text-[11px] sm:text-xs mt-0.5 leading-tight">
                        {member.role}
                      </p>
                    </div>

                    {/* CENTRE COLUMN: Photo (Touches card panels from both sides for Naresh/Bushan/Yashwantrao, from right for Shrinath) */}
                    <div
                      className={`${
                        touchesBoth
                          ? 'w-[32%] justify-center'
                          : touchesRight
                          ? 'w-[31%] justify-end pr-0'
                          : 'w-[30%] justify-center'
                      } flex items-end relative self-end pointer-events-none overflow-visible`}
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className={`relative -mt-[110px] sm:-mt-[125px] h-[235px] sm:h-[260px] ${
                          touchesBoth
                            ? 'w-full object-cover object-top'
                            : touchesRight
                            ? 'w-auto max-w-[170px] sm:max-w-[190px] object-cover object-top object-right ml-auto'
                            : 'w-auto max-w-[150px] sm:max-w-[170px] object-cover object-top mx-auto'
                        } drop-shadow-xl z-20 pointer-events-auto`}
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* RIGHT COLUMN: Description */}
                    <div
                      className={`${
                        touchesBoth
                          ? 'w-[34%]'
                          : touchesRight
                          ? 'w-[34%]'
                          : 'w-[35%]'
                      } p-3 sm:p-4 flex flex-col justify-center text-left border-l border-neutral-800/80 z-10`}
                    >
                      <p className="text-neutral-300 text-[11px] sm:text-xs leading-relaxed line-clamp-3 sm:line-clamp-4">
                        {member.description}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. 4 HORIZONTAL VALUE BADGES BAR
      ========================================================================= */}
      <section className="py-8 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            
            {/* 1. Collaborative Mindset */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-950 text-sm sm:text-base">Collaborative Mindset</h4>
                <p className="text-xs text-slate-500 mt-0.5">We work as one team</p>
              </div>
            </div>

            {/* 2. Continuous Learning */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-950 text-sm sm:text-base">Continuous Learning</h4>
                <p className="text-xs text-slate-500 mt-0.5">We grow every day</p>
              </div>
            </div>

            {/* 3. Open Communication */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-950 text-sm sm:text-base">Open Communication</h4>
                <p className="text-xs text-slate-500 mt-0.5">Ideas are always welcome</p>
              </div>
            </div>

            {/* 4. Work-Life Balance */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-950 text-sm sm:text-base">Work-Life Balance</h4>
                <p className="text-xs text-slate-500 mt-0.5">Happiness drives productivity</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          5. "BE A PART OF OUR GROWING TEAM" CTA BANNER
      ========================================================================= */}
      <section className="py-8 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-[#0A101D] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800 shadow-xl">
            
            {/* Left side: Paper airplane yellow box + Text */}
            <div className="flex items-center space-x-4 sm:space-x-5 z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#EAB308] text-slate-950 flex items-center justify-center flex-shrink-0 shadow-md">
                <Send className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Be a Part of Our <span className="text-[#EAB308]">Growing Team</span>
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                  We're always looking for talented and passionate people to join us.
                </p>
              </div>
            </div>

            {/* Decorative yellow dot matrix grid (subtle tech graphic) */}
            <div className="hidden md:block absolute right-64 inset-y-0 w-32 pointer-events-none opacity-20">
              <div className="grid grid-cols-6 gap-2 h-full py-4">
                {Array.from({ length: 24 }).map((_, i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#EAB308]" />
                ))}
              </div>
            </div>

            {/* Right side: Button */}
            <div className="z-10 flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={() => onOpenConsultation(undefined, 'Career Inquiry: View Open Positions')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#EAB308] hover:bg-[#FACC15] text-slate-950 font-extrabold text-sm shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>View Open Positions</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          7. FOOTER (Exact dark footer matching image.png)
      ========================================================================= */}
      <footer className="mt-auto bg-[#070B12] text-slate-400 text-sm border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
            
            {/* Col 1: Logo & Socials (4 cols) */}
            <div className="lg:col-span-4 flex flex-col space-y-4">
              <div
                onClick={() => onNavigateHome('home')}
                className="cursor-pointer inline-block"
              >
                <Logo size="lg" />
              </div>

              <p className="text-sm text-slate-300 font-medium">
                Your Growth. Our Digital Expertise.
              </p>

              {/* 5 Social Icons */}
              <div className="flex items-center space-x-3 pt-2">
                <a
                  href="https://wa.me/917972865688?text=Hello%20Shrinath%20IT%20Solutions"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="w-8 h-8 rounded-full bg-slate-900 hover:bg-[#EAB308] text-slate-300 hover:text-slate-950 flex items-center justify-center border border-slate-800 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-slate-900 hover:bg-[#EAB308] text-slate-300 hover:text-slate-950 flex items-center justify-center border border-slate-800 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-slate-900 hover:bg-[#EAB308] text-slate-300 hover:text-slate-950 flex items-center justify-center border border-slate-800 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full bg-slate-900 hover:bg-[#EAB308] text-slate-300 hover:text-slate-950 flex items-center justify-center border border-slate-800 transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-full bg-slate-900 hover:bg-[#EAB308] text-slate-300 hover:text-slate-950 flex items-center justify-center border border-slate-800 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Quick Links (2 cols) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-white font-bold text-sm">Quick Links</h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  <button
                    onClick={() => onNavigateHome('home')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateHome('about')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateHome('services')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Services
                  </button>
                </li>
                <li>
                  {/* Team Link highlighted in yellow as shown in image.png */}
                  <span className="text-[#EAB308] font-bold cursor-default">
                    Team
                  </span>
                </li>
                <li>
                  <button
                    onClick={() => {
                      if (onNavigateContact) onNavigateContact();
                      else onOpenConsultation(undefined, 'Contact Our Team');
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Our Services (3 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-white font-bold text-sm">Our Services</h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  <button
                    onClick={() => onNavigateHome('services')}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    Website Development
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateHome('services')}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    Digital Marketing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateHome('services')}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    Mobile App Development
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateHome('services')}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    Logo & Branding
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateHome('services')}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    Content Creation
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateHome('services')}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    Domain & Hosting
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateHome('services')}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    IT Consultation
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Get In Touch (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-white font-bold text-sm">Get In Touch</h4>
              
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-[#EAB308] mt-0.5 flex-shrink-0" />
                  <span className="leading-snug">
                    SIS, Near Circuit House,<br />
                    Civil Lines, Washim 444505<br />
                    Maharashtra, India
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-[#EAB308] flex-shrink-0" />
                  <a href="tel:+919373245688" className="hover:text-[#EAB308] transition-colors">
                    +91 93732 45688
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-[#EAB308] flex-shrink-0" />
                  <a href="mailto:shrinathit.in@gmail.com" className="hover:text-[#EAB308] transition-colors">
                    shrinathit.in@gmail.com
                  </a>
                </div>
              </div>

              {/* India Map Silhouette & "Proudly Serving Washim & Nearby Businesses" Card */}
              <div className="mt-4 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center space-x-3.5">
                {/* Silhouette map */}
                <div className="relative w-11 h-11 flex-shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-amber-500/80 fill-current">
                    {/* Stylized India/Maharashtra contour */}
                    <path d="M 45,10 Q 55,8 60,18 Q 62,30 75,38 Q 85,50 68,65 Q 55,85 48,92 Q 40,85 30,70 Q 20,55 28,40 Q 32,25 45,10 Z" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308] shadow-[0_0_8px_#EAB308] animate-pulse" />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-white leading-tight">
                    Proudly Serving
                  </p>
                  <p className="text-xs font-extrabold text-[#EAB308] leading-tight">
                    Washim & Nearby
                  </p>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Businesses
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Bar: Copyright & Links */}
          <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div>
              © 2025 Shrinath IT Solutions. All rights reserved.
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={onOpenPrivacy}
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <span>|</span>
              <button
                onClick={onOpenTerms}
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                Terms & Conditions
              </button>
              <span>|</span>
              <button
                onClick={() => onNavigateHome('services')}
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                Sitemap
              </button>
            </div>
          </div>
        </div>

        {/* Floating Back to Top Yellow Button (Exact matching bottom right button in screenshot) */}
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#EAB308] hover:bg-[#FACC15] text-slate-950 font-bold shadow-lg shadow-amber-500/30 flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ArrowUp className="w-5 h-5 stroke-[2.8]" />
          </motion.button>
        )}
      </footer>

    </div>
  );
};
