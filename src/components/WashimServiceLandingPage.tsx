import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Star,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ShieldCheck,
  Clock,
  Users,
  Zap,
  ChevronDown,
  Globe,
  ShoppingCart,
  GraduationCap,
  Activity,
  RefreshCw,
  Search,
  Target,
  TrendingUp,
  MessageSquare,
  Palette,
  Building,
  ShoppingBag,
  Server,
  Receipt,
  Wheat,
  Database,
  Leaf,
  Truck,
  BookOpen,
  HeartPulse,
  Smartphone,
  Wrench,
  BadgeCheck,
  Award,
  ArrowLeft,
  MessageCircle,
} from 'lucide-react';
import { WashimPageSEOData, WASHIM_LANDING_PAGES } from '../data/washimPagesData';
import { TiltCard3D } from './TiltCard3D';
import { WebGLSectionReveal } from './WebGLSectionReveal';
import { Interactive3DTechBackground } from './Interactive3DTechBackground';

interface WashimServiceLandingPageProps {
  pageData: WashimPageSEOData;
  onNavigateHome: () => void;
  onNavigateServicePage: (slug: string) => void;
  onOpenContact: (servicePrefill?: string) => void;
}

// Icon mapper helper
const renderIcon = (name: string, className: string = 'w-6 h-6') => {
  switch (name) {
    case 'Globe': return <Globe className={className} />;
    case 'ShoppingCart': return <ShoppingCart className={className} />;
    case 'GraduationCap': return <GraduationCap className={className} />;
    case 'Activity': return <Activity className={className} />;
    case 'RefreshCw': return <RefreshCw className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'Search': return <Search className={className} />;
    case 'MapPin': return <MapPin className={className} />;
    case 'Target': return <Target className={className} />;
    case 'TrendingUp': return <TrendingUp className={className} />;
    case 'MessageSquare': return <MessageSquare className={className} />;
    case 'Palette': return <Palette className={className} />;
    case 'Building': return <Building className={className} />;
    case 'ShoppingBag': return <ShoppingBag className={className} />;
    case 'Server': return <Server className={className} />;
    case 'Receipt': return <Receipt className={className} />;
    case 'Wheat': return <Wheat className={className} />;
    case 'Database': return <Database className={className} />;
    case 'Leaf': return <Leaf className={className} />;
    case 'Truck': return <Truck className={className} />;
    case 'BookOpen': return <BookOpen className={className} />;
    case 'HeartPulse': return <HeartPulse className={className} />;
    case 'Smartphone': return <Smartphone className={className} />;
    case 'Wrench': return <Wrench className={className} />;
    default: return <Sparkles className={className} />;
  }
};

export const WashimServiceLandingPage: React.FC<WashimServiceLandingPageProps> = ({
  pageData,
  onNavigateHome,
  onNavigateServicePage,
  onOpenContact,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Update dynamic document title & meta tags for Google SEO
  useEffect(() => {
    document.title = pageData.pageTitle;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', pageData.metaDescription);
    }

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', pageData.schemaData.serviceUrl);
    }

    // Scroll to top on page mount
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Inject FAQ Schema and Service Schema into head dynamically
    const scriptId = `schema-washim-${pageData.slug}`;
    let existingScript = document.getElementById(scriptId);
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Service',
            '@id': `${pageData.schemaData.serviceUrl}/#service`,
            'name': pageData.h1,
            'serviceType': pageData.schemaData.serviceType,
            'description': pageData.schemaData.serviceDescription,
            'provider': {
              '@type': 'LocalBusiness',
              'name': 'Shrinath IT Solutions',
              'telephone': '+91-7972865688',
              'address': {
                '@type': 'PostalAddress',
                'streetAddress': 'SIS, Near Circuit House, Civil Lines',
                'addressLocality': 'Washim',
                'addressRegion': 'Maharashtra',
                'postalCode': '444505',
                'addressCountry': 'IN',
              },
            },
            'areaServed': [
              { '@type': 'City', 'name': 'Washim' },
              { '@type': 'City', 'name': 'Risod' },
              { '@type': 'City', 'name': 'Karanja Lad' },
              { '@type': 'City', 'name': 'Malegaon' },
              { '@type': 'City', 'name': 'Mangrulpir' },
              { '@type': 'City', 'name': 'Manora' },
            ],
            'url': pageData.schemaData.serviceUrl,
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${pageData.schemaData.serviceUrl}/#breadcrumb`,
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://shrinathit.in',
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Washim City IT Services',
                'item': 'https://shrinathit.in/#services',
              },
              {
                '@type': 'ListItem',
                'position': 3,
                'name': pageData.h1,
                'item': pageData.schemaData.serviceUrl,
              },
            ],
          },
          {
            '@type': 'FAQPage',
            '@id': `${pageData.schemaData.serviceUrl}/#faq`,
            'mainEntity': pageData.faqs.map((faq) => ({
              '@type': 'Question',
              'name': faq.question,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': faq.answer,
              },
            })),
          },
        ],
      });
      document.head.appendChild(script);
    }

    return () => {
      const addedScript = document.getElementById(scriptId);
      if (addedScript) {
        addedScript.remove();
      }
    };
  }, [pageData]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const otherPages = Object.values(WASHIM_LANDING_PAGES).filter(
    (p) => p.slug !== pageData.slug
  );

  return (
    <div className="pt-20 pb-16 bg-slate-950 text-slate-100 min-h-screen">
      
      {/* 1. Breadcrumb Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-md sticky top-[68px] z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 sm:gap-2 text-slate-400 overflow-x-auto whitespace-nowrap py-0.5">
            <button
              onClick={onNavigateHome}
              className="hover:text-blue-400 flex items-center gap-1 text-slate-300 font-medium transition-colors cursor-pointer"
            >
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <span className="text-slate-400">Washim Local Services</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <span className="text-blue-400 font-semibold truncate max-w-[220px] sm:max-w-none">
              {pageData.h1}
            </span>
          </div>

          <button
            onClick={onNavigateHome}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer ml-4 shrink-0 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Main Page</span>
          </button>
        </div>
      </div>

      {/* 2. Hero Section */}
      <section className="relative py-14 sm:py-20 overflow-hidden">
        {/* Interactive 3D Technology Matrix */}
        <Interactive3DTechBackground
          variant="matrix-grid"
          theme="dark"
          density="medium"
          intensity={0.8}
          interactive={true}
          className="opacity-70"
        />

        {/* Background glow accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-xs font-semibold text-blue-300 shadow-sm"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>{pageData.badge}</span>
              </motion.div>

              {/* H1 Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]"
              >
                {pageData.h1}
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl text-blue-200/90 font-medium leading-relaxed"
              >
                {pageData.subheadline}
              </motion.p>

              {/* Summary */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-slate-300 text-sm sm:text-base leading-relaxed"
              >
                {pageData.summary}
              </motion.p>

              {/* Key Bullet Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2"
              >
                {pageData.heroHighlights.map((hl, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 bg-slate-900/70 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-200"
                  >
                    <span>{hl}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center gap-3.5 pt-4"
              >
                <button
                  id="washim-hero-quote-btn"
                  onClick={() => onOpenContact(pageData.h1)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:via-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>Get Free Quotation in Washim</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  id="washim-hero-whatsapp-btn"
                  href="https://wa.me/917972865688?text=Hello%20Shrinath%20IT%20Solutions,%20I%20need%20details%20about%20your%20services%20in%20Washim"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-emerald-600/90 hover:bg-emerald-600 text-white font-semibold text-sm shadow-lg shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp Us Direct</span>
                </a>

                <a
                  href="tel:7972865688"
                  className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-semibold transition-all"
                >
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>+91-7972865688</span>
                </a>
              </motion.div>
            </div>

            {/* Right Card Column / Quick Contact Box */}
            <div className="lg:col-span-5">
              <TiltCard3D maxTilt={6} scale={1.01} className="w-full">
                <div className="bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-blue-950/50 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
                  
                  <div className="border-b border-slate-800 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                        Local Washim Office
                      </span>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-xs font-bold text-slate-200">4.9 / 5.0 (58+ Reviews)</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Direct Project Consultation
                    </h3>
                    <p className="text-slate-400 text-xs mt-1">
                      Discuss your requirements with our technical team at SIS, Near Circuit House, Civil Lines, Washim or book an on-site visit.
                    </p>
                  </div>

                  {/* Local Assurance Highlights */}
                  <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Fast 24-Hour Quote:</strong> Custom milestone estimate with fixed transparent pricing.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Face-to-Face Meetings:</strong> In-person discussions across Washim, Risod & Karanja.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Local Marathi / Hindi / English Support:</strong> Easy communication for your entire team.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>100% Quality & Timely Delivery Guarantee.</strong></span>
                    </div>
                  </div>

                  {/* Fast Action Buttons */}
                  <div className="pt-2 space-y-3">
                    <button
                      onClick={() => onOpenContact(pageData.h1)}
                      className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Request Free Project Demo</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="flex items-center justify-between text-xs text-slate-400 pt-1 px-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        <span>Mon - Sat: 9 AM - 7 PM</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Verified Local IT Firm</span>
                      </span>
                    </div>
                  </div>

                </div>
              </TiltCard3D>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Core Features & Capabilities */}
      <section className="py-16 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">
              Comprehensive Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1.5 mb-3">
              Specialized Services We Deliver in Washim
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Engineered with modern standards, extreme reliability, and Google search ranking in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageData.features.map((feat, idx) => (
              <WebGLSectionReveal
                key={idx}
                preset="card-pop"
                delay={idx * 0.07}
                className="h-full"
              >
                <div className="h-full bg-slate-950/80 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-950/30 group flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      {renderIcon(feat.iconName, 'w-6 h-6')}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-blue-300 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                  
                  <div className="pt-5 mt-4 border-t border-slate-900 flex items-center text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                    <button
                      onClick={() => onOpenContact(`${feat.title} - ${pageData.h1}`)}
                      className="inline-flex items-center gap-1.5 cursor-pointer hover:underline"
                    >
                      <span>Inquire about this feature</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </WebGLSectionReveal>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Why Local Businesses in Washim Choose Us */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                The Shrinath Advantage
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Why Local Brands in Washim Trust Shrinath IT Solutions
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                We combine metropolitan software standards with local proximity in Washim. You never have to worry about unresponsive freelancers or out-of-state agencies who do not understand your local market.
              </p>

              <div className="pt-2">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm space-y-2">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span>Office Location: SIS, Near Circuit House, Civil Lines, Washim 444505 Maharshtra.</span>
                  </div>
                  <p className="text-slate-400 pl-6">
                    Walk in anytime or book a free discovery meeting with our senior technical consultants.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenContact(pageData.h1)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md cursor-pointer"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pageData.localWhyChooseUs.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-5 space-y-2.5 hover:border-slate-700 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                    0{idx + 1}
                  </div>
                  <h4 className="text-base font-bold text-white">
                    {item.title}
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 5. Local Industries Served in Washim */}
      <section className="py-16 bg-slate-900/40 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
              Local Sector Expertise
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1 mb-2">
              Industries We Empower in Washim District
            </h2>
            <p className="text-slate-400 text-sm">
              Customized digital workflows crafted for specific commercial sectors across Washim, Risod, and Karanja.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pageData.localIndustries.map((ind, idx) => (
              <div
                key={idx}
                className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 hover:border-blue-500/40 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-600/10 text-blue-400 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {renderIcon(ind.iconName, 'w-5 h-5')}
                </div>
                <h4 className="font-bold text-white text-base mb-1.5">
                  {ind.title}
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {ind.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Pricing & Packages Table in INR */}
      <section className="py-16 bg-slate-950 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">
              Transparent Investment
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1 mb-2">
              Affordable Packages for Washim Businesses
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              No hidden fees. Every package comes with free setup, training, and dedicated technical support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {pageData.packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                  pkg.popular
                    ? 'bg-gradient-to-b from-blue-950/90 to-slate-900/90 border-2 border-blue-500 shadow-2xl shadow-blue-900/30 scale-[1.02]'
                    : 'bg-slate-900/70 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white font-bold text-[11px] uppercase tracking-wider shadow-md">
                    Most Popular Choice in Washim
                  </div>
                )}

                <div>
                  <div className="border-b border-slate-800 pb-5 mb-5">
                    <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed min-h-[36px]">
                      {pkg.description}
                    </p>
                    <div className="mt-4 flex items-baseline gap-1.5">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white">{pkg.price}</span>
                      {pkg.billingPeriod && (
                        <span className="text-xs text-slate-400 font-medium">/ {pkg.billingPeriod}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Package Includes:
                    </span>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                      {pkg.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    id={`package-btn-${idx}`}
                    onClick={() => onOpenContact(`${pkg.name} (${pkg.price}) - ${pageData.h1}`)}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      pkg.popular
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 hover:scale-[1.01]'
                        : 'bg-slate-800 hover:bg-slate-700 text-white hover:text-blue-300'
                    }`}
                  >
                    <span>Choose {pkg.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Local Area Coverage in Washim District */}
      <section className="py-12 bg-slate-900/60 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-md">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span>Localities & Tehsil Coverage in Washim</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                We provide both remote support and on-site field visits across all locations in Washim district.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {pageData.localAreas.map((area, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-medium text-slate-300"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Frequently Asked Questions (FAQ) Accordion + Local SEO Schema */}
      <section id="washim-faqs" className="py-16 bg-slate-950 border-t border-slate-800/80 relative overflow-hidden">
        {/* Interactive 3D Neural Constellation Background */}
        <Interactive3DTechBackground
          variant="neural-constellation"
          theme="dark"
          density="low"
          intensity={0.6}
          interactive={true}
          className="opacity-50"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Local Business FAQs • Washim District</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1 mb-2">
              Frequently Asked Questions in Washim
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Clear, transparent answers to the questions local business owners, doctors, academies, and traders in Washim ask before starting a project with us.
            </p>
          </div>

          <div className="space-y-3.5">
            {pageData.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  id={`faq-item-${idx}`}
                  className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                    isOpen
                      ? 'bg-slate-900/90 border-blue-500/40 shadow-lg shadow-blue-500/5'
                      : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <button
                    id={`faq-toggle-${idx}`}
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 sm:px-6 py-4.5 text-left flex items-start sm:items-center justify-between gap-4 font-bold text-white text-sm sm:text-base hover:text-blue-300 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold shrink-0 mt-0.5 sm:mt-0 ${
                        isOpen ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}>
                        Q{idx + 1}
                      </span>
                      <span className="leading-snug">{faq.question}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 mt-1 sm:mt-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-400' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 sm:px-6 pb-5 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 pl-11 sm:pl-14">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Local Help CTA Banner under FAQs */}
          <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Have a specific question about your project?</span>
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Speak directly with our local technical team in Washim for quick advice & instant pricing estimates.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <a
                id="faq-whatsapp-btn"
                href="https://wa.me/917972865688?text=Hello%20Shrinath%20IT%20Solutions,%20I%20have%20a%20question%20regarding%20IT%20services%20in%20Washim"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Us</span>
              </a>

              <a
                id="faq-call-btn"
                href="tel:7972865688"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs border border-slate-700 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>Call Directly</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 9. Cross-Linking Grid to Other Washim Service Pages for SEO Power */}
      <section className="py-14 bg-slate-900/60 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
              Explore More Local Services
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Other Google-Ranked IT Services in Washim
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {otherPages.map((p) => (
              <div
                key={p.slug}
                className="bg-slate-950/80 border border-slate-800 hover:border-blue-500/50 rounded-xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-lg group"
              >
                <div>
                  <div className="text-xs font-bold text-blue-400 mb-1.5 uppercase tracking-wider">
                    Washim Service
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors mb-2">
                    {p.h1}
                  </h4>
                  <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                    {p.summary}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-900">
                  <button
                    onClick={() => onNavigateServicePage(p.slug)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                  >
                    <span>View {p.h1}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. Bottom Conversion CTA Banner */}
      <section className="py-14 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl">
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-5">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                Ready to Grow Your Business in Washim?
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Get in touch with Shrinath IT Solutions today for a free project consultation, local portfolio walkthrough, and transparent price quote.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
                <button
                  id="washim-cta-quote-btn"
                  onClick={() => onOpenContact(pageData.h1)}
                  className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-100 text-blue-900 font-extrabold text-sm shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Get Instant Free Quote
                </button>

                <a
                  href="tel:7972865688"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-blue-950/60 hover:bg-blue-950 text-white font-semibold text-sm border border-blue-400/40 transition-all"
                >
                  <Phone className="w-4 h-4 text-blue-300" />
                  <span>Call +91-7972865688</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
