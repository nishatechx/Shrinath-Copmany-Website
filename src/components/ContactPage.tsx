import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageCircle, 
  ArrowRight, 
  Menu, 
  X, 
  Navigation,
  ArrowUp,
  Instagram,
  Facebook,
  Youtube,
  Linkedin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PREMIUM_EASE } from '../hooks/useMotionConfig';

interface ContactPageProps {
  onNavigateHome: (section?: string) => void;
  onNavigateTeam: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

const SERVICES_OPTIONS = [
  'Website Development',
  'Custom Billing & Accounting Software',
  'Digital Marketing & Google Ads',
  'Mobile Application Development',
  'SEO & Google Maps Ranking',
  'Logo & Brand Identity',
  'Bulk WhatsApp Automation',
  'IT Consultation & Support',
  'Other Inquiry',
];

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigateHome,
  onNavigateTeam,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Clean Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: SERVICES_OPTIONS[0],
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: SERVICES_OPTIONS[0],
      message: '',
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Namaskar Shrinath IT Solutions, I am contacting you from your website.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || 'N/A'}\nService: ${formData.service}\nMessage: ${formData.message || 'I would like to discuss a project.'}`
  );

  const directWhatsAppUrl = `https://wa.me/917972865688?text=${whatsappMessage}`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-900 flex flex-col font-sans selection:bg-[#EAB308] selection:text-slate-950">
      
      {/* =========================================================================
          1. HEADER / NAVBAR (Dark theme matching Team & Home)
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
            <button
              onClick={onNavigateTeam}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Team
            </button>
            {/* Active Contact Link */}
            <div className="relative py-1 text-white font-semibold">
              <span>Contact</span>
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#EAB308] rounded-full" />
            </div>
          </nav>

          {/* Right Action: Phone + Quick Contact */}
          <div className="hidden lg:flex items-center space-x-6">
            <a
              href="tel:+917972865688"
              className="flex items-center text-sm font-semibold text-white hover:text-[#EAB308] transition-colors"
            >
              <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center mr-2 text-[#EAB308]">
                <Phone className="w-4 h-4 fill-current" />
              </span>
              <span>+91 79728 65688</span>
            </a>

            <a
              href="https://wa.me/917972865688?text=Namaskar%20Shrinath%20IT%20Solutions,%20I%20would%20like%20to%20discuss%20a%20project"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white focus:outline-hidden cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#0e121d] border-b border-slate-800 px-4 pt-2 pb-6 space-y-3"
            >
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateHome('home');
                }}
                className="block w-full text-left py-2 text-slate-300 hover:text-white font-medium text-sm"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateHome('about');
                }}
                className="block w-full text-left py-2 text-slate-300 hover:text-white font-medium text-sm"
              >
                About
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateHome('services');
                }}
                className="block w-full text-left py-2 text-slate-300 hover:text-white font-medium text-sm"
              >
                Services
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateTeam();
                }}
                className="block w-full text-left py-2 text-slate-300 hover:text-white font-medium text-sm"
              >
                Team
              </button>
              <div className="block w-full text-left py-2 text-[#EAB308] font-bold text-sm">
                Contact (Active)
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
                <a
                  href="tel:+917972865688"
                  className="flex items-center text-sm font-semibold text-white hover:text-[#EAB308]"
                >
                  <Phone className="w-4 h-4 mr-2 text-[#EAB308]" />
                  <span>+91 79728 65688</span>
                </a>
                <a
                  href="https://wa.me/917972865688?text=Namaskar%20Shrinath%20IT%20Solutions"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-emerald-600 text-white font-bold text-sm shadow-md"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* =========================================================================
          2. HERO SECTION
      ========================================================================= */}
      <section className="bg-[#0B0F17] text-white pt-16 pb-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Yellow horizontal dash + Contact */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-1 bg-[#EAB308] rounded-full" />
              <span className="text-xs sm:text-sm font-bold tracking-wider text-slate-400 uppercase">
                Contact Shrinath IT Solutions
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              Let&apos;s Build Something <span className="text-[#EAB308]">Remarkable</span> Together
            </h1>

            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              Have a question, need custom software, or want to grow your local business online? 
              Visit our office in Washim or send us a message below. We respond promptly.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. MAIN CONTENT: CLEAN FORM + MAP & CONTACT DETAILS
      ========================================================================= */}
      <section className="py-14 sm:py-18 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: Clean Contact Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-9 border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
              <div className="mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold uppercase tracking-wider mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#EAB308]" />
                  Direct Inquiry
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                  Send Us a Direct Message
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Fill out this clean form and our lead engineer will get back to you within 2 business hours.
                </p>
              </div>

              {isSuccess ? (
                <div className="py-10 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Message Received Successfully!</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-slate-950">{formData.name}</strong>! We have received your inquiry regarding <strong>{formData.service}</strong>. Our team will contact you at <strong>{formData.phone}</strong> promptly.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={directWhatsAppUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all duration-200"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      <span>Send Instant Copy on WhatsApp</span>
                    </a>

                    <button
                      onClick={handleReset}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Name & Phone in 2 cols */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Patil"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-hidden focus:bg-white focus:border-[#EAB308] focus:ring-2 focus:ring-[#EAB308]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Phone / WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="10-digit mobile number"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-hidden focus:bg-white focus:border-[#EAB308] focus:ring-2 focus:ring-[#EAB308]/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & Service Required */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@business.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-hidden focus:bg-white focus:border-[#EAB308] focus:ring-2 focus:ring-[#EAB308]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-service" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Service Needed <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="contact-service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-hidden focus:bg-white focus:border-[#EAB308] focus:ring-2 focus:ring-[#EAB308]/20 transition-all cursor-pointer"
                      >
                        {SERVICES_OPTIONS.map((srv) => (
                          <option key={srv} value={srv}>
                            {srv}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Your Message or Project Details
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your shop, website requirement, software features, or timeline..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-hidden focus:bg-white focus:border-[#EAB308] focus:ring-2 focus:ring-[#EAB308]/20 transition-all resize-none"
                    />
                  </div>

                  {/* Actions: Primary Submit + WhatsApp Fast Track */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-[#EAB308] hover:bg-[#FACC15] text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Message</span>
                        </>
                      )}
                    </button>

                    <a
                      href="https://wa.me/917972865688?text=Namaskar%20Shrinath%20IT%20Solutions,%20I%20want%20to%20inquire%20about%20your%20services"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-sm transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      <span>Direct WhatsApp</span>
                    </a>
                  </div>

                  <p className="text-center text-xs text-slate-500 pt-1">
                    🔒 We respect your privacy. No spam. 100% confidential.
                  </p>
                </form>
              )}
            </div>

            {/* RIGHT COLUMN: Contact Info & Embedded Google Maps (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Contact Information Details */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.03)] space-y-5">
                <h3 className="font-extrabold text-slate-950 text-xl tracking-tight">
                  Office Contact Info
                </h3>

                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D97706] flex items-center justify-center flex-shrink-0 mt-0.5 border border-amber-200">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Headquarters Address</h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                        SIS, Near Circuit House,<br />
                        Civil Lines, Washim 444505<br />
                        Maharashtra, India
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-200">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Call Us Directly</h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                        <a href="tel:+917972865688" className="hover:text-[#D97706] font-semibold text-slate-900">
                          +91 79728 65688
                        </a>
                        {' / '}
                        <a href="tel:+919373245688" className="hover:text-[#D97706] text-slate-600">
                          +91 93732 45688
                        </a>
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Direct line to Technical & Sales Consultant</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-purple-200">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Email Support</h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                        <a href="mailto:shrinathit.in@gmail.com" className="hover:text-[#D97706] font-semibold text-slate-900">
                          shrinathit.in@gmail.com
                        </a>
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Inquiries answered in 24 hours</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-200">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Business Hours</h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                        Monday - Saturday: 9:30 AM - 7:30 PM
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Sunday: Closed (Emergency support available)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exact Google Maps Embed as requested */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.03)] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-slate-950 font-bold text-sm">
                    <Navigation className="w-4 h-4 text-[#D97706]" />
                    <span>Locate Us on Google Maps</span>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/wJk6dYyS62qKz17T6"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-amber-700 hover:text-amber-800 underline"
                  >
                    Open Full Map
                  </a>
                </div>

                <div className="w-full rounded-xl overflow-hidden border border-slate-200 shadow-xs aspect-4/3 sm:aspect-16/10">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3746.183862195575!2d77.13425477376832!3d20.126375618162506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd0e3e798519327%3A0x9152c7cb54c211b0!2sShrinath%20IT%20Solutions!5e0!3m2!1sen!2sin!4v1789386487370!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="Shrinath IT Solutions Office Location"
                    className="w-full h-full min-h-[280px]"
                  />
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          4. FOOTER
      ========================================================================= */}
      <footer className="bg-[#0b0e14] text-slate-400 text-sm border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center space-x-3">
              <div onClick={() => onNavigateHome('home')} className="cursor-pointer">
                <Logo size="md" />
              </div>
              <span className="text-xs text-slate-500">| Washim, Maharashtra</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <button onClick={() => onNavigateHome('home')} className="hover:text-white transition-colors cursor-pointer">
                Home
              </button>
              <button onClick={() => onNavigateHome('about')} className="hover:text-white transition-colors cursor-pointer">
                About
              </button>
              <button onClick={() => onNavigateHome('services')} className="hover:text-white transition-colors cursor-pointer">
                Services
              </button>
              <button onClick={onNavigateTeam} className="hover:text-white transition-colors cursor-pointer">
                Team
              </button>
              <span className="text-[#EAB308] font-bold">Contact</span>
              {onOpenPrivacy && (
                <button onClick={onOpenPrivacy} className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </button>
              )}
              {onOpenTerms && (
                <button onClick={onOpenTerms} className="hover:text-white transition-colors cursor-pointer">
                  Terms of Service
                </button>
              )}
            </div>

            <div className="text-xs text-slate-500 text-center md:text-right">
              © {new Date().getFullYear()} Shrinath IT Solutions. All rights reserved.
            </div>

          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 left-6 z-40 w-11 h-11 rounded-full bg-slate-900 border border-slate-700 text-white flex items-center justify-center shadow-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <ArrowUp className="w-5 h-5 text-[#EAB308]" />
        </button>
      )}

    </div>
  );
};
