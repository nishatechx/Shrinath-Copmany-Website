import { NavItem, ServiceItem, StatItem, ProjectItem, ProcessStep, TestimonialItem } from '../types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export const TRUSTED_CLIENTS = [
  { name: 'Razorpay', label: 'Razorpay' },
  { name: 'Groww', label: 'Groww' },
  { name: 'unacademy', label: 'unacademy' },
  { name: 'MediPulse', label: 'MediPulse' },
  { name: 'Chargebee', label: 'Chargebee' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'web-development',
    iconName: 'monitor',
    title: 'Web Development',
    description: 'Responsive, fast & modern websites that represent your brand perfectly.',
    features: [
      'Custom React & Next.js Websites',
      'High-conversion E-commerce Platforms',
      'SEO & Core Web Vitals Optimization',
      'CMS Integration (WordPress, Sanity, Strapi)',
      'Enterprise Web Portals & SaaS Frontend',
    ],
    deliverables: ['Mobile-first Design', 'Fast Loading Times', 'Clean Scalable Code', 'Complete Source Code'],
  },
  {
    id: 'software-solutions',
    iconName: 'cpu',
    title: 'Software Solutions',
    description: 'Custom software solutions to simplify processes and scale your business.',
    features: [
      'Enterprise Resource Planning (ERP)',
      'Custom CRM & Automation Tools',
      'API & Microservices Architecture',
      'Cloud Integration & DevOps CI/CD',
      'Database Architecture & Security',
    ],
    deliverables: ['Automated Workflows', 'Role-Based Access Control', 'Detailed API Docs', 'Post-launch Support'],
  },
  {
    id: 'mobile-app-development',
    iconName: 'smartphone',
    title: 'Mobile App Development',
    description: 'Android & iOS apps that deliver seamless user experiences.',
    features: [
      'Native iOS (Swift) & Android (Kotlin)',
      'Cross-platform Flutter & React Native',
      'Offline-First Data Synchronization',
      'Push Notifications & In-App Purchases',
      'App Store & Play Store Submissions',
    ],
    deliverables: ['Intuitive UX/UI', 'High Frame Rate Performance', 'Store Publishing', 'Analytics Integration'],
  },
  {
    id: 'digital-marketing',
    iconName: 'megaphone',
    title: 'Digital Marketing',
    description: 'Data-driven marketing strategies to grow your audience and boost results.',
    features: [
      'Search Engine Optimization (SEO)',
      'Google Ads & Paid Search Campaigns',
      'Social Media Marketing (Meta, LinkedIn)',
      'Conversion Rate Optimization (CRO)',
      'Funnel Building & Email Marketing',
    ],
    deliverables: ['Monthly ROI Reports', 'Targeted Traffic Growth', 'Lead Generation Systems', 'Audience Insights'],
  },
  {
    id: 'logo-branding',
    iconName: 'diamond',
    title: 'Logo & Branding',
    description: 'Unique identities that make your brand memorable and trustworthy.',
    features: [
      'Brand Identity & Logo Design Systems',
      'Typography & Color Palette Guidelines',
      'Corporate Stationery & Business Cards',
      'Packaging & Merchandise Assets',
      'Comprehensive Brand Style Guides',
    ],
    deliverables: ['Vector Assets (SVG/AI)', 'Brand Guidelines PDF', 'Social Media Kit', 'Stationery Mockups'],
  },
  {
    id: 'content-creation',
    iconName: 'edit-3',
    title: 'Content Creation',
    description: 'Engaging content that connects, inspires and converts your audience.',
    features: [
      'SEO Copywriting & Blog Strategy',
      'Visual Graphics & Motion Video',
      'Case Studies & Technical Whitepapers',
      'Social Media Creative Captions',
      'Product Messaging & Pitch Decks',
    ],
    deliverables: ['Content Calendars', 'Keyword-Optimized Articles', 'High-res Graphics', 'Compelling Copy'],
  },
];

export const ABOUT_STATS: StatItem[] = [
  {
    value: '100+',
    label: 'Projects Completed',
    iconName: 'folder-git',
  },
  {
    value: '50+',
    label: 'Happy Clients',
    iconName: 'smile',
  },
  {
    value: '15+',
    label: 'Years Experience',
    iconName: 'clock',
  },
  {
    value: '100%',
    label: 'Client Satisfaction',
    iconName: 'award',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'travel-explorer',
    title: 'Travel Explorer',
    categoryName: 'Website Design',
    category: 'websites',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    description: 'An immersive travel portal with real-time booking, destination highlights, interactive maps, and dark mode aesthetic.',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'Mapbox API'],
    client: 'Travel Explorer Co.',
    liveUrl: 'https://travelexplorer.example.com',
    accentColor: '#38bdf8',
  },
  {
    id: 'task-management-app',
    title: 'Task Management App',
    categoryName: 'Mobile Application',
    category: 'mobile-apps',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    description: 'A productivity suite with collaborative task boards, time tracking, automated sprint planning, and cross-platform sync.',
    tags: ['Flutter', 'Node.js', 'PostgreSQL', 'WebSockets'],
    client: 'FlowTask Global',
    liveUrl: 'https://flowtask.example.com',
    accentColor: '#2563eb',
  },
  {
    id: 'medicare-hospital',
    title: 'Medicare Hospital',
    categoryName: 'Website Design',
    category: 'websites',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    description: 'Comprehensive healthcare portal enabling tele-consultation appointments, electronic health records, and emergency bed tracking.',
    tags: ['Next.js', 'TypeScript', 'HIPAA Ready', 'Tailwind'],
    client: 'Medicare Health Systems',
    liveUrl: 'https://medicare.example.com',
    accentColor: '#0ea5e9',
  },
  {
    id: 'floward-brand',
    title: 'Floward Brand',
    categoryName: 'Logo & Branding',
    category: 'branding',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
    description: 'A minimalist, luxury brand identity system with bespoke typography, foil-stamped stationery, and packaging design.',
    tags: ['Brand Identity', 'Typography', 'Style Guide', 'Packaging'],
    client: 'Floward Lifestyle',
    liveUrl: 'https://floward.example.com',
    accentColor: '#6366f1',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'We understand your requirements, goals and business challenges.',
    iconName: 'search',
  },
  {
    number: '02',
    title: 'Plan',
    description: 'We research, plan and create a strategy tailored to your needs.',
    iconName: 'clipboard-list',
  },
  {
    number: '03',
    title: 'Build',
    description: 'We design, develop and test with precision and attention to detail.',
    iconName: 'code-2',
  },
  {
    number: '04',
    title: 'Deliver',
    description: 'We deliver the solution on time and provide ongoing support.',
    iconName: 'rocket',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Sagar Waghmare',
    role: 'Retail & Wholesale Trader',
    location: 'Washim',
    quote: 'We got custom billing and inventory software built for our store in Washim. Earlier everything was done manually on paper which took hours. Now billing and GST invoices are done in seconds, and their team is always available on call if we need help.',
    rating: 5,
    initials: 'SW',
    verified: true,
    date: 'Recent Client',
  },
  {
    id: 'test-2',
    name: 'Nilesh Gawande',
    role: 'Coaching Academy Director',
    location: 'Washim',
    quote: 'They designed our institute website with an online admission and fee receipt system. The best thing is how fast the site loads even on mobile networks in rural areas. Inquiries for new batches have noticeably increased.',
    rating: 5,
    initials: 'NG',
    verified: true,
    date: 'Recent Client',
  },
  {
    id: 'test-3',
    name: 'Pravin Kulkarni',
    role: 'Agro Services & Equipment',
    location: 'Washim',
    quote: 'Handled our Google business profile optimization and local website. Within two months, we started receiving direct calls and WhatsApp inquiries from farmers and dealers across the district. Honest and reliable team.',
    rating: 5,
    initials: 'PK',
    verified: true,
    date: 'Recent Client',
  },
];

export const COMPANY_CONTACT = {
  address: 'Civil Line, Washim, Maharashtra',
  phone: '+91 97636 58462',
  whatsapp: '9763658462',
  email: 'info@shrinathit.in',
  website: 'shrinathit.in',
};
