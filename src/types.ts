export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  iconName: 'monitor' | 'cpu' | 'smartphone' | 'megaphone' | 'diamond' | 'edit-3';
  title: string;
  description: string;
  features?: string[];
  deliverables?: string[];
}

export interface StatItem {
  value: string;
  label: string;
  iconName: 'folder-git' | 'smile' | 'clock' | 'award';
}

export interface ClientLogoItem {
  name: string;
  url: string;
  website?: string;
}

export type ProjectCategory = 'all' | 'websites' | 'mobile-apps' | 'branding' | 'marketing';

export interface ProjectItem {
  id: string;
  title: string;
  categoryName: string;
  category: 'websites' | 'mobile-apps' | 'branding' | 'marketing';
  image: string;
  description: string;
  tags: string[];
  client: string;
  liveUrl?: string;
  accentColor: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  iconName: 'search' | 'clipboard-list' | 'code-2' | 'rocket';
}

export interface TestimonialItem {
  id: string;
  name: string;
  role?: string;
  company?: string;
  location?: string;
  quote: string;
  rating: number;
  initials: string;
  avatar?: string;
  verified?: boolean;
  date?: string;
}

export interface CompanyContactInfo {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  workingHours?: string;
}

export interface HeroContentInfo {
  badgeText: string;
  headlinePart1: string;
  headlineGradient: string;
  subtext: string;
  heroImage: string;
  primaryCta: string;
  secondaryCta: string;
}

export interface AboutContentInfo {
  badgeText: string;
  headline: string;
  headlineGradient: string;
  paragraph: string;
  bullets: string[];
  stats: StatItem[];
}

export interface SiteContentState {
  company: CompanyContactInfo;
  hero: HeroContentInfo;
  about: AboutContentInfo;
  services: ServiceItem[];
  clientLogos: ClientLogoItem[];
  testimonials: TestimonialItem[];
  processSteps: ProcessStep[];
}
