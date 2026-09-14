import React, { useRef } from 'react';
import { Logo } from './Logo';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, Linkedin, MessageCircle, ArrowUp, Globe, Lock } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { PREMIUM_EASE, useMotionSettings } from '../hooks/useMotionConfig';
interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
  onOpenContact?: () => void;
  onNavigateTeam?: () => void;
  onNavigateContact?: () => void;
  onOpenLaunchManager?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
  onOpenContact,
  onNavigateTeam,
  onNavigateContact,
  onOpenLaunchManager,
}) => {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: '-40px' });
  const { reducedMotion } = useMotionSettings();

  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (id === 'team') {
      if (onNavigateTeam) {
        onNavigateTeam();
        return;
      }
    }
    if (id === 'contact') {
      if (onNavigateContact) {
        onNavigateContact();
        return;
      }
      if (onOpenContact) {
        onOpenContact();
        return;
      }
    }

    const cleanPath = id === 'home' ? '/' : `/${id}`;
    window.history.pushState({ section: id }, '', cleanPath);

    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: 'https://wa.me/917972865688?text=Hello%20Shrinath%20IT%20Solutions',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com',
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://youtube.com',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com',
    },
  ];

  return (
    <footer ref={footerRef} className="bg-[#0b0e14] text-slate-400 text-sm border-t border-slate-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Brand & Socials (4 cols) */}
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0, ease: PREMIUM_EASE }}
            className="lg:col-span-4 flex flex-col space-y-4"
          >
            <a href="/" onClick={(e) => scrollTo(e, 'home')} className="inline-block transition-transform hover:scale-105 duration-200">
              <Logo size="lg" />
            </a>

            <p className="text-sm text-slate-300 font-medium">
              Your Growth. Our Digital Expertise.
            </p>

            {/* Social Icons with smooth 3px lift */}
            <div className="flex items-center space-x-3 pt-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.name}
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-full bg-slate-900 hover:bg-[#EAB308] text-slate-300 hover:text-slate-950 flex items-center justify-center border border-slate-800 transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Column 2: Quick Links (2 cols) */}
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.06, ease: PREMIUM_EASE }}
            className="lg:col-span-2"
          >
            <h3 className="font-bold text-white text-base mb-4 tracking-tight">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', target: 'home' },
                { label: 'About Us', target: 'about' },
                { label: 'Services', target: 'services' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.target === 'home' ? '/' : `/${link.target}`}
                    onClick={(e) => scrollTo(e, link.target)}
                    className="inline-block hover:text-[#EAB308] hover:translate-x-1 transition-all duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/team"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateTeam) onNavigateTeam();
                  }}
                  className="inline-block hover:text-[#EAB308] hover:translate-x-1 transition-all duration-200 cursor-pointer text-left font-medium"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateContact) onNavigateContact();
                    else if (onOpenContact) onOpenContact();
                  }}
                  className="inline-block hover:text-[#EAB308] hover:translate-x-1 transition-all duration-200 cursor-pointer text-left"
                >
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Column 3: Our Services (3 cols) */}
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.12, ease: PREMIUM_EASE }}
            className="lg:col-span-3"
          >
            <h3 className="font-bold text-white text-base mb-4 tracking-tight">
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {[
                'Website Development',
                'Digital Marketing',
                'Mobile App Development',
                'Logo & Branding',
                'Content Creation',
                'Domain & Hosting',
                'IT Consultation',
              ].map((serviceName) => (
                <li key={serviceName}>
                  <a
                    href="/services"
                    onClick={(e) => scrollTo(e, 'services')}
                    className="inline-block hover:text-[#EAB308] hover:translate-x-1 transition-all duration-200"
                  >
                    {serviceName}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Get In Touch & Maharashtra/Washim Map graphic (3 cols) */}
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.18, ease: PREMIUM_EASE }}
            className="lg:col-span-3 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-bold text-white text-base mb-4 tracking-tight">
                Get In Touch
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-[#EAB308] flex-shrink-0 mt-1" />
                  <span className="text-slate-300 leading-snug">
                    SIS, Near Circuit House, <br />
                    Civil Lines, Washim 444505 <br />
                    Maharashtra, India
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-[#EAB308] flex-shrink-0" />
                  <a
                    href="tel:+917972865688"
                    className="text-slate-300 hover:text-[#EAB308] transition-colors font-medium"
                  >
                    +91 79728 65688
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Globe className="w-4 h-4 text-[#EAB308] flex-shrink-0" />
                  <a
                    href="https://shrinathit.in"
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-300 hover:text-[#EAB308] transition-colors font-medium"
                  >
                    shrinathit.in
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-[#EAB308] flex-shrink-0" />
                  <a
                    href="mailto:shrinathit.in@gmail.com"
                    className="text-slate-300 hover:text-[#EAB308] transition-colors break-all"
                  >
                    shrinathit.in@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Map Silhouette & Proudly Serving Washim Graphic */}
            <div className="mt-6 p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center space-x-4">
              {/* Stylized Maharashtra / Washim District Outline */}
              <div className="relative w-14 h-14 flex-shrink-0">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-slate-700 fill-current opacity-80"
                >
                  <path d="M 20,30 Q 35,15 65,20 T 90,45 Q 85,75 60,85 T 25,80 Q 15,60 20,30 Z" />
                  <path d="M 45,45 Q 55,40 65,48 T 58,62 Q 48,60 45,45 Z" fill="#334155" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#EAB308] fill-[#EAB308] drop-shadow-md" />
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400">Proudly Serving</p>
                <p className="text-sm font-extrabold text-white">Washim</p>
                <p className="text-[11px] text-slate-400">and Nearby Areas</p>
              </div>
            </div>

          </motion.div>

        </div>

        {/* Bottom Sub-footer with Back to top button */}
        <div className="mt-14 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © 2025 Shrinath IT Solutions. All Rights Reserved.
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>|</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span>|</span>
            <span className="hover:text-slate-200 transition-colors cursor-pointer">
              Sitemap
            </span>
            {onOpenLaunchManager && (
              <>
                <span>|</span>
                <button
                  type="button"
                  onClick={onOpenLaunchManager}
                  title="Launch Settings (Alt + L)"
                  className="text-slate-500 hover:text-amber-400 transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  <Lock className="w-3 h-3" />
                  <span>Launch Portal (Alt+L)</span>
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span>
              Made with <span className="text-red-500">❤️</span> in Washim
            </span>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back to top"
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-[#EAB308] hover:text-slate-950 border border-slate-800 transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>

      </div>
    </footer>
  );
};
