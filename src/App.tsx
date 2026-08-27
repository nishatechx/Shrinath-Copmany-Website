import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ClientsMarquee } from './components/ClientsMarquee';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { ProcessSection } from './components/ProcessSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';

// Admin CMS & Modals
import { AdminPanel } from './components/AdminPanel';
import { AdminLoginModal } from './components/AdminLoginModal';
import { ContactModal } from './components/ContactModal';
import { ServiceModal } from './components/ServiceModal';
import { AboutModal } from './components/AboutModal';
import { PrivacyModal } from './components/PrivacyModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { BackToTopButton } from './components/BackToTopButton';

// Types, Data & Context
import { ServiceItem } from './types';
import { useSiteContent } from './context/SiteContentContext';

export default function App() {
  const { isAdminLoggedIn } = useSiteContent();

  // State for modals and interaction
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactServicePrefill, setContactServicePrefill] = useState('');
  
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  // Admin CMS State
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  // URL route listener for /admin or #admin
  useEffect(() => {
    const checkAdminRoute = () => {
      const isRouteAdmin = 
        window.location.pathname === '/admin' || 
        window.location.pathname.endsWith('/admin') || 
        window.location.hash === '#admin' ||
        window.location.hash === '#/admin';

      if (isRouteAdmin) {
        if (isAdminLoggedIn) {
          setIsAdminPanelOpen(true);
          setIsAdminLoginModalOpen(false);
        } else {
          setIsAdminLoginModalOpen(true);
        }
      }
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);
    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
    };
  }, [isAdminLoggedIn]);

  // Smooth scroll helper
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContact = (servicePrefill?: string) => {
    if (servicePrefill) {
      setContactServicePrefill(servicePrefill);
    }
    setIsContactOpen(true);
  };

  const handleOpenAdmin = () => {
    if (isAdminLoggedIn) {
      setIsAdminPanelOpen(true);
    } else {
      setIsAdminLoginModalOpen(true);
    }
  };

  const handleCloseAdminPanel = () => {
    setIsAdminPanelOpen(false);
    if (window.location.hash === '#admin' || window.location.hash === '#/admin') {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  // If Admin Panel is full screen open and user is authorized
  if (isAdminPanelOpen && isAdminLoggedIn) {
    return <AdminPanel onCloseToSite={handleCloseAdminPanel} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* 1. Header Navigation Bar */}
      <Navbar
        onOpenContact={() => handleOpenContact()}
        onOpenAdminLogin={handleOpenAdmin}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero
          onExploreServices={() => scrollTo('services')}
          onOpenContact={() => handleOpenContact()}
        />

        {/* Client Logos Marquee */}
        <ClientsMarquee />

        {/* 3. Services Section (Light Theme) */}
        <ServicesSection
          onSelectService={(service) => setSelectedService(service)}
        />

        {/* 4. About Us Section (Dark Theme with 2x2 Stats) */}
        <AboutSection
          onOpenAboutModal={() => setIsAboutModalOpen(true)}
        />

        {/* 5. Our Process Section (Dark Theme 4-Step Flow) */}
        <ProcessSection />

        {/* 6. Testimonials Section (Light Theme 3 Cards) */}
        <TestimonialsSection />

        {/* 7. Call To Action Banner (Curved Dark Card) */}
        <CtaBanner onOpenContact={() => handleOpenContact()} />
      </main>

      {/* 8. Footer Section (4 Columns + Contact Info) */}
      <Footer
        onOpenContact={handleOpenContact}
        onSelectService={(service) => setSelectedService(service)}
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
      />

      {/* Modals */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialService={contactServicePrefill}
      />

      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onSelectForQuote={(serviceTitle) => {
          setSelectedService(null);
          handleOpenContact(serviceTitle);
        }}
      />

      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        onOpenContact={() => handleOpenContact()}
      />

      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onSuccess={() => {
          setIsAdminLoginModalOpen(false);
          setIsAdminPanelOpen(true);
        }}
      />

      {/* Floating WhatsApp Contact Button */}
      <WhatsAppFloatingButton
        onOpenContact={() => handleOpenContact()}
        phoneNumber="9763658462"
      />

      {/* Floating Back To Top Button */}
      <BackToTopButton scrollThreshold={350} />
    </div>
  );
}

