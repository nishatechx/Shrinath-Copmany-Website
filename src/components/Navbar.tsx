import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Phone, ArrowRight, Menu, X } from 'lucide-react';
import { motion } from 'motion/react';
import { PREMIUM_EASE } from '../hooks/useMotionConfig';

interface NavbarProps {
  onOpenConsultation: () => void;
  onOpenContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConsultation,
  onOpenContact,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);

      const sections = ['home', 'services', 'about', 'portfolio'];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (id === 'contact' && onOpenContact) {
      onOpenContact();
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <motion.header
      id="main-navigation-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: PREMIUM_EASE }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#0e1117]/95 backdrop-blur-md border-b h-[68px] sm:h-[76px] lg:h-[82px] flex items-center ${
        isScrolled
          ? 'border-slate-800 shadow-xl shadow-black/30'
          : 'border-slate-800/80'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo with subtle scale-in and hover glow */}
          <motion.a
            href="#home"
            onClick={(e) => scrollToSection(e, 'home')}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease: PREMIUM_EASE }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center py-0.5 transition-all duration-200 hover:drop-shadow-[0_0_10px_rgba(234,179,8,0.35)]"
            aria-label="Shrinath IT Solutions Home"
          >
            <Logo size="lg" />
          </motion.a>

          {/* Desktop Navigation Links with staggered reveal and center-expanding underline */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.id;
              return (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + idx * 0.05,
                    ease: PREMIUM_EASE,
                  }}
                  className={`text-sm font-medium transition-colors duration-250 relative py-1 group ${
                    isActive
                      ? 'text-[#F5A623] font-semibold'
                      : 'text-slate-200 hover:text-[#F5A623]'
                  }`}
                >
                  {link.label}
                  {/* Underline expanding from center */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[#F5A623] rounded-full transition-transform duration-300 origin-center ${
                      isActive
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </motion.a>
              );
            })}
          </nav>

          {/* Right Action: Phone + Consultation Button */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease: PREMIUM_EASE }}
            className="hidden lg:flex items-center space-x-6"
          >
            <a
              href="tel:+917972865688"
              className="flex items-center text-sm font-semibold text-white hover:text-[#F5A623] transition-colors duration-200 group"
            >
              <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center mr-2 text-[#F5A623] group-hover:bg-[#F5A623] group-hover:text-black transition-all duration-300 group-hover:scale-105">
                <Phone className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12 group-hover:translate-x-0.5" />
              </span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                +91 79728 65688
              </span>
            </a>

            <motion.button
              onClick={onOpenConsultation}
              id="header-consultation-btn"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: PREMIUM_EASE }}
              className="group relative inline-flex items-center justify-center px-4.5 py-2.5 rounded-lg bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:via-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm shadow-md shadow-amber-500/30 hover:shadow-lg hover:shadow-orange-500/40 transition-all cursor-pointer overflow-hidden"
            >
              <span className="relative z-10">Get Free Consultation</span>
              <ArrowRight className="relative z-10 w-4 h-4 ml-1.5 transition-transform duration-250 ease-out group-hover:translate-x-[5px]" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/10 opacity-70 group-hover:opacity-100 pointer-events-none" />
            </motion.button>
          </motion.div>

          {/* Tablet & Mobile Controls */}
          <div className="flex lg:hidden items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <a
              href="tel:+917972865688"
              className="hidden sm:inline-flex items-center text-xs font-semibold text-white hover:text-[#F5A623] px-2.5 py-1.5 rounded-md bg-slate-800"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5 text-[#F5A623]" />
              <span>Call Us</span>
            </a>
            <button
              onClick={onOpenConsultation}
              className="px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-extrabold rounded-md bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 shadow-sm transition-all whitespace-nowrap active:scale-95 cursor-pointer"
            >
              Consultation
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d1016] border-b border-slate-800 px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                className={`text-base font-medium px-3 py-2 rounded-md ${
                  activeSection === link.id
                    ? 'bg-[#EAB308]/15 text-[#EAB308] font-bold'
                    : 'text-slate-200 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 border-t border-slate-800/80 flex flex-col space-y-3">
              <a
                href="tel:+917972865688"
                className="flex items-center text-sm font-semibold text-white px-3 py-2 rounded-md bg-slate-900"
              >
                <Phone className="w-4 h-4 mr-2 text-[#EAB308]" />
                +91 79728 65688
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full flex items-center justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/30 active:scale-[0.99] transition-all cursor-pointer"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.header>
  );
};
