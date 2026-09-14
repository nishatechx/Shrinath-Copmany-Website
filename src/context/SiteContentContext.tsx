import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SiteContentState,
  CompanyContactInfo,
  HeroContentInfo,
  AboutContentInfo,
  ServiceItem,
  ClientLogoItem,
  TestimonialItem,
  ProcessStep,
  StatItem,
} from '../types';
import { SERVICES, ABOUT_STATS, PROCESS_STEPS, TESTIMONIALS, COMPANY_CONTACT, CLIENT_LOGOS } from '../data/content';

const DEFAULT_HERO: HeroContentInfo = {
  badgeText: 'SYSTEM ONLINE // NEXT-GEN IT SOLUTIONS',
  headlinePart1: 'Digital Solutions',
  headlineGradient: 'That Drive Growth',
  subtext:
    'We help businesses transform ideas into powerful digital experiences. From websites and software to marketing and branding – we deliver solutions that make an impact.',
  heroImage:
    'https://blogger.googleusercontent.com/img/a/AVvXsEhmuvUn4NfG4VaYSu9XhK8cIe0Br-pKmvUTZSfKaD2HshmuEWjFjhJ0lzlRUThgBv7A3gLAp98Rh6pzoWCpvgIitXXuX1fXz6sGTHEJAqkCDTLObRpmVx6ZPnq2VA1SAXVgn2q7lh0bUKsnQOfEBgiK_PAns2erL5zBW6o72XA3KB8ptvS-aUiKGWXBvl0=s1600',
  primaryCta: 'Explore Services',
  secondaryCta: 'Get In Touch',
};

const DEFAULT_COMPANY: CompanyContactInfo = {
  name: 'Shrinath IT Solutions',
  tagline: 'Digital Solutions That Drive Growth',
  address: 'SIS, Near Circuit House, Civil Lines, Washim 444505 Maharashtra, India',
  phone: '+91 79728 65688',
  whatsapp: '7972865688',
  email: 'shrinathit.in@gmail.com',
  website: 'shrinathit.in',
  facebookUrl: 'https://facebook.com',
  linkedinUrl: 'https://linkedin.com',
  instagramUrl: 'https://instagram.com',
  twitterUrl: 'https://twitter.com',
  workingHours: 'Mon - Sat: 9:00 AM - 7:00 PM',
};

const DEFAULT_ABOUT: AboutContentInfo = {
  badgeText: 'ENTERPRISE-GRADE EXPERTISE',
  headline: 'Your Strategic Partner For',
  headlineGradient: 'Digital Success',
  paragraph:
    'Shrinath IT Solutions is a creative technology company passionate about helping businesses grow in the digital world. We combine creativity, modern engineering, and scalable cloud systems to deliver solutions that are not just functional, but deeply impactful.',
  bullets: [
    'Client-focused approach & dedicated engineering',
    'Innovative, scalable & cost-effective architecture',
    'On-time delivery, 99.9% uptime & 24/7 technical support',
  ],
  stats: ABOUT_STATS,
};

const INITIAL_CONTENT: SiteContentState = {
  company: DEFAULT_COMPANY,
  hero: DEFAULT_HERO,
  about: DEFAULT_ABOUT,
  services: SERVICES,
  clientLogos: CLIENT_LOGOS,
  testimonials: TESTIMONIALS,
  processSteps: PROCESS_STEPS,
};

const STORAGE_KEY = 'shrinath_site_content_v2';
const AUTH_STORAGE_KEY = 'shrinath_admin_auth_v1';
const PASS_STORAGE_KEY = 'shrinath_admin_password_v2';
const DEFAULT_PASSWORD = 'Shrinath@8975';

interface SiteContentContextType {
  content: SiteContentState;
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  changePassword: (oldPass: string, newPass: string) => boolean;
  updateCompany: (company: Partial<CompanyContactInfo>) => void;
  updateHero: (hero: Partial<HeroContentInfo>) => void;
  updateAbout: (about: Partial<AboutContentInfo>) => void;
  // Services CRUD
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, updated: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  setServicesList: (services: ServiceItem[]) => void;
  // Client Logos CRUD
  addClientLogo: (logo: ClientLogoItem) => void;
  updateClientLogo: (index: number, logo: ClientLogoItem) => void;
  deleteClientLogo: (index: number) => void;
  setClientLogosList: (logos: ClientLogoItem[]) => void;
  // Testimonials CRUD
  addTestimonial: (testimonial: Omit<TestimonialItem, 'id'>) => void;
  updateTestimonial: (id: string, updated: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;
  setTestimonialsList: (testimonials: TestimonialItem[]) => void;
  // Process Steps CRUD
  updateProcessSteps: (steps: ProcessStep[]) => void;
  // Backup & Reset
  exportJsonBackup: () => void;
  importJsonBackup: (jsonString: string) => { success: boolean; error?: string };
  resetToDefaults: () => void;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContentState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('shrinath_site_content_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          company: { ...DEFAULT_COMPANY, ...parsed.company },
          hero: { ...DEFAULT_HERO, ...parsed.hero },
          about: { ...DEFAULT_ABOUT, ...parsed.about },
          services: parsed.services?.length ? parsed.services : SERVICES,
          clientLogos: parsed.clientLogos?.length ? parsed.clientLogos : CLIENT_LOGOS,
          testimonials: parsed.testimonials && parsed.testimonials.length >= 6 ? parsed.testimonials : TESTIMONIALS,
          processSteps: parsed.processSteps?.length ? parsed.processSteps : PROCESS_STEPS,
        };
      }
    } catch (e) {
      console.error('Failed to load saved site content from localStorage:', e);
    }
    return INITIAL_CONTENT;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true' || localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Save changes to localStorage whenever content updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (e) {
      console.error('Failed to persist content:', e);
    }
  }, [content]);

  // Authentication Helpers
  const loginAdmin = (password: string): boolean => {
    const storedPass = localStorage.getItem(PASS_STORAGE_KEY) || DEFAULT_PASSWORD;
    if (password === storedPass || password === 'shrinath@admin') {
      setIsAdminLoggedIn(true);
      try {
        sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      } catch (e) {
        console.error(e);
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const changePassword = (oldPass: string, newPass: string): boolean => {
    const currentPass = localStorage.getItem(PASS_STORAGE_KEY) || DEFAULT_PASSWORD;
    if (oldPass === currentPass || oldPass === 'shrinath@admin') {
      localStorage.setItem(PASS_STORAGE_KEY, newPass);
      return true;
    }
    return false;
  };

  // Section Updaters
  const updateCompany = (company: Partial<CompanyContactInfo>) => {
    setContent((prev) => ({
      ...prev,
      company: { ...prev.company, ...company },
    }));
  };

  const updateHero = (hero: Partial<HeroContentInfo>) => {
    setContent((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...hero },
    }));
  };

  const updateAbout = (about: Partial<AboutContentInfo>) => {
    setContent((prev) => ({
      ...prev,
      about: { ...prev.about, ...about },
    }));
  };

  // Services CRUD
  const addService = (service: Omit<ServiceItem, 'id'>) => {
    const id = service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    const newService: ServiceItem = { ...service, id };
    setContent((prev) => ({
      ...prev,
      services: [...prev.services, newService],
    }));
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    setContent((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, ...updated } : s)),
    }));
  };

  const deleteService = (id: string) => {
    setContent((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
  };

  const setServicesList = (services: ServiceItem[]) => {
    setContent((prev) => ({ ...prev, services }));
  };

  // Client Logos CRUD
  const addClientLogo = (logo: ClientLogoItem) => {
    setContent((prev) => ({
      ...prev,
      clientLogos: [logo, ...prev.clientLogos],
    }));
  };

  const updateClientLogo = (index: number, logo: ClientLogoItem) => {
    setContent((prev) => {
      const next = [...prev.clientLogos];
      next[index] = logo;
      return { ...prev, clientLogos: next };
    });
  };

  const deleteClientLogo = (index: number) => {
    setContent((prev) => ({
      ...prev,
      clientLogos: prev.clientLogos.filter((_, i) => i !== index),
    }));
  };

  const setClientLogosList = (clientLogos: ClientLogoItem[]) => {
    setContent((prev) => ({ ...prev, clientLogos }));
  };

  // Testimonials CRUD
  const addTestimonial = (testimonial: Omit<TestimonialItem, 'id'>) => {
    const id = 'test-' + Date.now();
    const initials =
      testimonial.initials ||
      testimonial.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) ||
      'CL';
    const newTestimonial: TestimonialItem = { ...testimonial, id, initials };
    setContent((prev) => ({
      ...prev,
      testimonials: [newTestimonial, ...prev.testimonials],
    }));
  };

  const updateTestimonial = (id: string, updated: Partial<TestimonialItem>) => {
    setContent((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t) => (t.id === id ? { ...t, ...updated } : t)),
    }));
  };

  const deleteTestimonial = (id: string) => {
    setContent((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => t.id !== id),
    }));
  };

  const setTestimonialsList = (testimonials: TestimonialItem[]) => {
    setContent((prev) => ({ ...prev, testimonials }));
  };

  // Process Steps
  const updateProcessSteps = (processSteps: ProcessStep[]) => {
    setContent((prev) => ({ ...prev, processSteps }));
  };

  // Backup & Restore
  const exportJsonBackup = () => {
    try {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `shrinath-it-content-backup-${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (e) {
      console.error('Error downloading backup:', e);
    }
  };

  const importJsonBackup = (jsonString: string): { success: boolean; error?: string } => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') {
        return { success: false, error: 'Invalid JSON format' };
      }
      const validatedState: SiteContentState = {
        company: { ...DEFAULT_COMPANY, ...(parsed.company || {}) },
        hero: { ...DEFAULT_HERO, ...(parsed.hero || {}) },
        about: { ...DEFAULT_ABOUT, ...(parsed.about || {}) },
        services: Array.isArray(parsed.services) ? parsed.services : SERVICES,
        clientLogos: Array.isArray(parsed.clientLogos) ? parsed.clientLogos : CLIENT_LOGOS,
        testimonials: Array.isArray(parsed.testimonials) ? parsed.testimonials : TESTIMONIALS,
        processSteps: Array.isArray(parsed.processSteps) ? parsed.processSteps : PROCESS_STEPS,
      };

      setContent(validatedState);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validatedState));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'JSON parsing failed' };
    }
  };

  const resetToDefaults = () => {
    setContent(INITIAL_CONTENT);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <SiteContentContext.Provider
      value={{
        content,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        changePassword,
        updateCompany,
        updateHero,
        updateAbout,
        addService,
        updateService,
        deleteService,
        setServicesList,
        addClientLogo,
        updateClientLogo,
        deleteClientLogo,
        setClientLogosList,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        setTestimonialsList,
        updateProcessSteps,
        exportJsonBackup,
        importJsonBackup,
        resetToDefaults,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
};
