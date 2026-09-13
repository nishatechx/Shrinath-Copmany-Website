import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustedBySection } from './components/TrustedBySection';
import { StatsBar } from './components/StatsBar';
import { ServicesSection, ServiceData, SERVICES_LIST } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { WorkSection, ProjectData } from './components/WorkSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { ScrollSectionReveal } from './components/ScrollSectionReveal';

// Modals
import { ContactModal } from './components/ContactModal';
import { ServiceModal } from './components/ServiceModal';
import { ProjectModal } from './components/ProjectModal';
import { AboutModal } from './components/AboutModal';
import { PrivacyModal } from './components/PrivacyModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { BackToTopButton } from './components/BackToTopButton';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgressBar } from './components/ScrollProgressBar';

export default function App() {
  // Modal states
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationServicePrefill, setConsultationServicePrefill] = useState('');
  const [consultationTitle, setConsultationTitle] = useState('Get Free Consultation');

  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

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

  const handleSelectProject = (project: ProjectData) => {
    setSelectedProject(project);
  };

  const handleScrollToWork = () => {
    const el = document.getElementById('portfolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-[#FFD21F] selection:text-[#17191C]">
      {/* Slim Fixed Progress Bar at top of page */}
      <ScrollProgressBar />

      {/* Interactive Gradient Mouse Cursor (Dark: #17191C, Yellow: #FFD21F) */}
      <CustomCursor />

      {/* 1. Top Navbar */}
      <Navbar
        onOpenConsultation={() => handleOpenConsultation(undefined, 'Get Free Consultation')}
        onOpenContact={() => handleOpenConsultation(undefined, 'Contact Our Team')}
      />

      {/* Main Page Layout */}
      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero
          onStartProject={() => handleOpenConsultation(undefined, 'Start Your Project')}
          onViewWork={handleScrollToWork}
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

        {/* 6. Our Work / Recent Projects Section */}
        <ScrollSectionReveal id="work-section">
          <WorkSection onSelectProject={handleSelectProject} />
        </ScrollSectionReveal>

        {/* 7. Testimonials Section */}
        <ScrollSectionReveal id="testimonials-section">
          <TestimonialsSection />
        </ScrollSectionReveal>

        {/* 8. Call to Action Banner */}
        <ScrollSectionReveal id="cta-section">
          <CtaBanner
            onOpenConsultation={() => handleOpenConsultation(undefined, 'Claim Your Free Consultation')}
          />
        </ScrollSectionReveal>
      </main>

      {/* 9. Footer */}
      <ScrollSectionReveal id="footer-section">
        <Footer
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
          onOpenTerms={() => setIsPrivacyOpen(true)}
          onOpenContact={() => handleOpenConsultation(undefined, 'Get In Touch')}
        />
      </ScrollSectionReveal>

      {/* Floating Action Buttons */}
      <BackToTopButton scrollThreshold={500} />
      <WhatsAppFloatingButton
        onOpenContact={() => handleOpenConsultation(undefined, 'WhatsApp Priority Inquiry')}
        phoneNumber="7972865688"
      />

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

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onDiscussSimilar={(projectName) => {
          setSelectedProject(null);
          handleOpenConsultation(undefined, `Build Similar: ${projectName}`);
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
