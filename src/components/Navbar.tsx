import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { NAV_ITEMS } from '../data/content';
import { ArrowRight, Menu, X, Lock } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

interface NavbarProps {
  onOpenContact: (servicePrefill?: string) => void;
  onOpenAdminLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onOpenAdminLogin }) => {
  const { isAdminLoggedIn } = useSiteContent();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Track active section
      const sections = ['home', 'about', 'services', 'process', 'testimonials', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navigation-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 py-3.5 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 focus:outline-none py-1"
            aria-label="Shrinath IT Solutions Home"
          >
            <Logo size="lg" />
          </a>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav-menu" className="hidden md:flex items-center gap-7 lg:gap-9">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.label}
                  id={`nav-link-${sectionId}`}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-sm font-medium transition-all duration-200 relative py-1 ${
                    isActive
                      ? 'text-blue-400 font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full animate-fade-in" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA & Login Buttons Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {/* Login button near Get in touch */}
            <button
              id="header-login-btn"
              onClick={onOpenAdminLogin}
              title="Admin Login & CMS"
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                isAdminLoggedIn
                  ? 'bg-blue-950/60 border-blue-500 text-blue-300 hover:bg-blue-900/60 shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                  : 'bg-slate-900/90 border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 hover:bg-slate-800'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-blue-400" />
              <span>{isAdminLoggedIn ? 'Admin Panel' : 'Login'}</span>
            </button>

            {/* Get in Touch Button */}
            <button
              id="header-get-in-touch-btn"
              onClick={() => onOpenContact()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenAdminLogin}
              className="px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white bg-slate-900 border border-slate-800 text-xs font-medium flex items-center gap-1.5"
              aria-label="Admin Login"
            >
              <Lock className="w-3.5 h-3.5 text-blue-400" />
              <span>Login</span>
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 backdrop-blur-xl shadow-2xl animate-in slide-in-from-top duration-200"
        >
          <div className="flex flex-col space-y-2 pt-2">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.label}
                  id={`mobile-nav-link-${sectionId}`}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 font-semibold border-l-4 border-blue-500'
                      : 'text-slate-200 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="pt-3 space-y-2">
            <button
              id="mobile-get-in-touch-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 cursor-pointer transition-all"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminLogin();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium text-xs border border-slate-800 cursor-pointer transition-all"
            >
              <Lock className="w-3.5 h-3.5 text-blue-400" />
              <span>{isAdminLoggedIn ? 'Open Admin CMS Panel' : 'Admin CMS Login (/admin)'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
