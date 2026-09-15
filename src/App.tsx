import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustedBySection } from './components/TrustedBySection';
import { StatsBar } from './components/StatsBar';
import { ServicesSection, ServiceData, SERVICES_LIST } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { ScrollSectionReveal } from './components/ScrollSectionReveal';
import { TeamPage } from './components/TeamPage';
import { ContactPage } from './components/ContactPage';

// Modals
import { ContactModal } from './components/ContactModal';
import { ServiceModal } from './components/ServiceModal';
import { AboutModal } from './components/AboutModal';
import { PrivacyModal } from './components/PrivacyModal';
import { BackToTopButton } from './components/BackToTopButton';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgressBar } from './components/ScrollProgressBar';

export default function App() {
  // Page routing: 'home' vs 'team' vs 'contact' (Separate clean paths: /, /team, /contact)
  const [currentPage, setCurrentPage] = useState<'home' | 'team' | 'contact'>(() => {
    if (typeof window !== 'undefined') {
      const rawHash = window.location.hash.toLowerCase().replace(/^#\/?/, '');
      const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
      if (rawHash === 'team' || path === '/team') {
        return 'team';
      }
      if (rawHash === 'contact' || path === '/contact') {
        return 'contact';
      }
    }
    return 'home';
  });

  // Modal states
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationServicePrefill, setConsultationServicePrefill] = useState('');
  const [consultationTitle, setConsultationTitle] = useState('Get Free Consultation');

  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);

  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Synchronize URL clean paths with page state and handle legacy hashes
  useEffect(() => {
    // 1. Immediately convert any legacy hash URLs to clean paths (e.g., /#about -> /about)
    const rawHash = window.location.hash.toLowerCase().replace(/^#\/?/, '');
    if (rawHash) {
      const cleanPath = rawHash === 'home' ? '/' : `/${rawHash}`;
      window.history.replaceState(null, '', cleanPath);
    }

    const syncRouteFromLocation = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
      if (path === '/team') {
        setCurrentPage('team');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (path === '/contact') {
        setCurrentPage('contact');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        setCurrentPage('home');
        if (path === '/about') {
          setTimeout(() => {
            const el = document.getElementById('about');
            if (el) {
              const offset = 80;
              const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
              window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
            }
          }, 120);
        } else if (path === '/services') {
          setTimeout(() => {
            const el = document.getElementById('services');
            if (el) {
              const offset = 80;
              const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
              window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
            }
          }, 120);
        }
      }
    };

    // Run on mount
    syncRouteFromLocation();

    // Listen for browser Back/Forward navigation
    window.addEventListener('popstate', syncRouteFromLocation);
    return () => {
      window.removeEventListener('popstate', syncRouteFromLocation);
    };
  }, []);

  // Navigation handlers (clean path pushState, zero hashes)
  const navigateToTeam = () => {
    window.history.pushState({ page: 'team' }, '', '/team');
    setCurrentPage('team');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToContact = () => {
    window.history.pushState({ page: 'contact' }, '', '/contact');
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToHome = (targetSection?: string) => {
    const cleanPath = targetSection && targetSection !== 'home' ? `/${targetSection}` : '/';
    window.history.pushState({ page: 'home', section: targetSection }, '', cleanPath);
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (targetSection && targetSection !== 'home') {
      setTimeout(() => {
        const el = document.getElementById(targetSection);
        if (el) {
          const offset = 80;
          const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth',
          });
        }
      }, 100);
    }
  };

  // Handlers
  const handleOpenConsultation = (serviceTitle?: string, customTitle?: string) => {
    if (serviceTitle) {
      setConsultationServicePrefill(serviceTitle);
    }
    setConsultationTitle(customTitle || 'Get Free Consultation');
    setIsConsultationOpen(true);
  };

  const handleSelectService = (service: ServiceData) => {
    setSelectedService(service);
  };

  const handleScrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  // If on separate Team Page
  if (currentPage === 'team') {
    return (
      <div className="min-h-screen bg-[#FAF9F5] text-slate-900 flex flex-col selection:bg-[#EAB308] selection:text-[#17191C]">
        <ScrollProgressBar />
        <CustomCursor />

        <TeamPage
          onNavigateHome={navigateToHome}
          onOpenConsultation={handleOpenConsultation}
          onNavigateContact={navigateToContact}
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
          onOpenTerms={() => setIsPrivacyOpen(true)}
        />

        {/* Interactive Modals */}
        <ContactModal
          isOpen={isConsultationOpen}
          onClose={() => setIsConsultationOpen(false)}
          initialService={consultationServicePrefill}
          title={consultationTitle}
        />

        <PrivacyModal
          isOpen={isPrivacyOpen}
          onClose={() => setIsPrivacyOpen(false)}
        />
      </div>
    );
  }

  // If on separate Contact Page
  if (currentPage === 'contact') {
    return (
      <div className="min-h-screen bg-[#FAF9F5] text-slate-900 flex flex-col selection:bg-[#EAB308] selection:text-[#17191C]">
        <ScrollProgressBar />
        <CustomCursor />

        <ContactPage
          onNavigateHome={navigateToHome}
          onNavigateTeam={navigateToTeam}
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
          onOpenTerms={() => setIsPrivacyOpen(true)}
        />

        <PrivacyModal
          isOpen={isPrivacyOpen}
          onClose={() => setIsPrivacyOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-[#FFD21F] selection:text-[#17191C]">
      {/* Slim Fixed Progress Bar at top of page */}
      <ScrollProgressBar />

      {/* Interactive Gradient Mouse Cursor (Dark: #17191C, Yellow: #FFD21F) */}
      <CustomCursor />

      {/* 1. Top Navbar */}
      <Navbar
        onOpenConsultation={() => handleOpenConsultation(undefined, 'Get Free Consultation')}
        onOpenContact={navigateToContact}
        onNavigateTeam={navigateToTeam}
        onNavigateContact={navigateToContact}
      />

      {/* Main Page Layout */}
      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero
          onStartProject={() => handleOpenConsultation(undefined, 'Start Your Project')}
          onExploreServices={handleScrollToServices}
        />

        {/* Client Logos / Trusted By Scroll Section */}
        <TrustedBySection />

        {/* 3. Metrics / Stats Bar */}
        <StatsBar />

        {/* 4. Our Services Section */}
        <ScrollSectionReveal id="services-section">
          <ServicesSection
            onSelectService={handleSelectService}
            onViewAllServices={() => handleOpenConsultation(SERVICES_LIST[0].title, 'Explore All Digital Services')}
          />
        </ScrollSectionReveal>

        {/* 5. About Us Section */}
        <ScrollSectionReveal id="about-section">
          <AboutSection onKnowMore={() => setIsAboutOpen(true)} />
        </ScrollSectionReveal>

        {/* 6. Testimonials Section */}
        <ScrollSectionReveal id="testimonials-section">
          <TestimonialsSection />
        </ScrollSectionReveal>

        {/* 7. Call to Action Banner */}
        <ScrollSectionReveal id="cta-section">
          <CtaBanner
            onOpenConsultation={() => handleOpenConsultation(undefined, 'Claim Your Free Consultation')}
          />
        </ScrollSectionReveal>
      </main>

      {/* 8. Footer */}
      <ScrollSectionReveal id="footer-section">
        <Footer
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
          onOpenTerms={() => setIsPrivacyOpen(true)}
          onOpenContact={navigateToContact}
          onNavigateTeam={navigateToTeam}
          onNavigateContact={navigateToContact}
        />
      </ScrollSectionReveal>

      {/* Floating Action Buttons */}
      <BackToTopButton scrollThreshold={500} />

      {/* Interactive Modals */}
      <ContactModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialService={consultationServicePrefill}
        title={consultationTitle}
      />

      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onSelectForQuote={(serviceTitle) => {
          setSelectedService(null);
          handleOpenConsultation(serviceTitle, `Inquire: ${serviceTitle}`);
        }}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onOpenConsultation={() => {
          setIsAboutOpen(false);
          handleOpenConsultation(undefined, 'Start a Project with Us');
        }}
      />

      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}
