import { NavItem, ServiceItem, StatItem, ProjectItem, ProcessStep, TestimonialItem, ClientLogoItem, CompanyContactInfo } from '../types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export const CLIENT_LOGOS: ClientLogoItem[] = [
  {
    name: "Joshi Sir's Samarth Academy",
    url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhJ0_Ouy2-by-wGaW_3o7gzaFz_NdLI9aLbR0LKqSbbHH3tIvi8oRY06iplLrO25ffA26qtYN0P4IjD6BAs8_Yx4S1PFdiIWOebYcInx2o1bhv2TURK-SMfG32LQdJ9xH5urwkWECjqvF94porSYcLC6z696d1Q0kZ6UC8uulBUbxJTtF3BYm9EC7SL23w/s1600/448250372_494997203030591_5472623113248746932_n.jpg',
  },
  {
    name: 'Shivansh Digital Services',
    url: 'https://blogger.googleusercontent.com/img/a/AVvXsEigh_qHRKb60fHjJQY-IDKn66ZSv3LbpBOxXZ43TapCdCHe68dmYE_CwZUHPGIZVX_Wi3O94RWE_OcoJwxfScjO_k_LTNDEmsgw64b2gjDOKvPiXHgUCvYav8rUxMG_3LF9VG78FCGIQ3_KQujsdFiA1WhceawfslBPhPJyZ07DcZiTVxuM6RowlkTkl44',
  },
  {
    name: 'Samay Computers',
    url: 'https://whitelabel-content.s3.ap-south-1.amazonaws.com/14603/logo/web-logo/1591272623.jpg',
  },
  {
    name: 'ZP School Ichori',
    url: 'https://www.zpschoolichori.in/wp-content/uploads/2026/01/ZP-School-Ichori-Logo.png',
  },
  {
    name: 'Vatsgulma Live News',
    url: 'https://yt3.googleusercontent.com/Vcft0eTPGLG6uSOjhDsOgh-NSWSoWt7EFoUl8oasWyAyIXrob7zqzN1rXLaKh8OomUJYiLPQAmM=s160-c-k-c0x00ffffff-no-rj',
  },
  {
    name: 'Bhavana Computer Centre',
    url: 'https://scontent-bom2-3.cdninstagram.com/v/t51.2885-19/426837119_1770351460122974_8732929193920293236_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=103&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=2xj0-XgN81kQ7kNvwHp7wF3&_nc_oc=AdpGAu3902UXeSShcRSb0abXZrQhdyKmMq-3sGGERggR02MqknL7DDH5O_m6d24mNjg&_nc_zt=24&_nc_ht=scontent-bom2-3.cdninstagram.com&_nc_ss=7ba8c&oh=00_AQG-Prtan7PxmPxXGMQxt3FXm3gwziAPLlWbA1q8mW0NZw&oe=6A95C253',
  },
  {
    name: 'Gajanan Dhamane',
    url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj-rD1Sgi9MAQ_CDc-zAuhLJ6WO1hrTLWaGuXW4119d9-OmN5ZX04Elu7s2zBATYkYsiiSG9XiDzJIs0pAkeslvK9ALDBOVnhh5cT7EAKL0PEfmkllMd8a2b-BBlMdyBkulCjd_lYVVUbZ9NiQBZ0uhmtqJx9p-9r6aA_3kF00c04cwyOzmDtFpLmklwEg/s1600/gajanan%20dhamane.png',
  },
  {
    name: "PNK's Salon Washim",
    url: 'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlFgaV2_55iltWEWJ80EEpql2LFWsS4OvQCJtRm_Zc8hQ4ZiHRJHL1JfkdmMJ9qCbps2iyNJe5ySbV9BEqq1k6WuaUDgs_xu2dLwF6ku6-3M_tB3RJzRm75byueKPP_aWatAPsI9vSP7bK4=w243-h304-n-k-no-nu',
  },
  {
    name: 'Amol Infotech',
    url: 'https://scontent-bom5-2.xx.fbcdn.net/v/t39.30808-1/656788304_792337013943447_8103862968967239522_n.jpg?stp=c332.479.1304.1304a_dst-jpg_tt6&cstp=mx1304x1304&ctp=s200x200&_nc_cat=104&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=peYpd7gBDfAQ7kNvwFfxF-e&_nc_oc=AdoiELuIjnjXY7-5s7oLX6bS_MU0ezG8YgddE74Gb0iakQmS_ywN-zf59ZHh5uV0y2Y&_nc_zt=24&_nc_ht=scontent-bom5-2.xx&_nc_gid=pHpyN_2t_lYoV719u-YF6A&_nc_ss=7b289&oh=00_AQEBtImq4ESy3c5Gz80gPn1JspqNQ4mfrDjJzZkEymobhg&oe=6A95C4C2',
  },
  {
    name: 'Shantidut Movies',
    url: 'https://yt3.googleusercontent.com/31A3adVbIte3V9MhQJLROisWnj4uZIc9hxVwmjDW686ODqynoL5LlZ3lDG_z7BWAq5iR05YCPw=s160-c-k-c0x00ffffff-no-rj',
  },
  {
    name: 'Vithai Abhyasika',
    url: 'https://blogger.googleusercontent.com/img/a/AVvXsEgfadOsYPSTSDQMWz_DvvXqVDwamcXaD1W_zxyXlsZHeQLp-0uQBxtbklMYBpzquKjEe_Dm75CjHMSa-vCttpjCcl3g9ch3nQB5hW264waIh1gBFoIxUerunyGxrjPgU9noSwYNQqsKN3IWxC8R7qqfz4BwYj9S3QeppXoUb-Md1uvkY0oS5clHWfV1bHk=s1600',
  },
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
    role: 'Client Review',
    location: '',
    quote: 'We got custom billing and inventory software built for our store. Earlier everything was done manually on paper which took hours. Now billing and invoices are done in seconds, and their team is always available on call whenever we need help.',
    rating: 5,
    initials: 'SW',
    verified: true,
    date: 'Recent Client',
  },
  {
    id: 'test-2',
    name: 'Nilesh Gawande',
    role: 'Client Review',
    location: '',
    quote: 'They designed our institute website with an online admission and fee receipt system. The best thing is how fast the site loads even on mobile networks. Inquiries for new batches have noticeably increased.',
    rating: 5,
    initials: 'NG',
    verified: true,
    date: 'Recent Client',
  },
  {
    id: 'test-3',
    name: 'Pravin Kulkarni',
    role: 'Client Review',
    location: '',
    quote: 'Handled our digital profile optimization and modern website. Within two months, we started receiving direct calls and WhatsApp inquiries from customers and dealers. Honest and reliable team.',
    rating: 5,
    initials: 'PK',
    verified: true,
    date: 'Recent Client',
  },
  {
    id: 'test-4',
    name: 'Dr. Rahul Deshmukh',
    role: 'Client Review',
    location: '',
    quote: 'We needed an appointment booking and prescription reminder system with WhatsApp alerts. Shrinath IT Solutions delivered beyond our expectations. Very professional, secure, and prompt technical support.',
    rating: 5,
    initials: 'RD',
    verified: true,
    date: 'Recent Client',
  },
  {
    id: 'test-5',
    name: 'Ganesh Patil',
    role: 'Client Review',
    location: '',
    quote: 'Their custom inventory management and GST billing software simplified our seasonal rush completely. Even our staff with minimal computer experience operates it comfortably every day.',
    rating: 5,
    initials: 'GP',
    verified: true,
    date: 'Recent Client',
  },
  {
    id: 'test-6',
    name: 'Swapnil Joshi',
    role: 'Client Review',
    location: '',
    quote: 'Built our customer order tracking portal and modern responsive business website. Fast loading speed, reliable hosting, and prompt answers to any questions we have.',
    rating: 5,
    initials: 'SJ',
    verified: true,
    date: 'Recent Client',
  },
  {
    id: 'test-7',
    name: 'Pooja Rathod',
    role: 'Client Review',
    location: '',
    quote: 'Designed our online student portal and responsive landing pages. The user experience is clean, mobile-friendly, and has boosted our inquiries significantly.',
    rating: 5,
    initials: 'PR',
    verified: true,
    date: 'Recent Client',
  },
  {
    id: 'test-8',
    name: 'Anand Kulkarni',
    role: 'Client Review',
    location: '',
    quote: 'Transformed our branding and built an interactive project showcase website. We have successfully closed high-value commercial contracts through client leads received from the site.',
    rating: 5,
    initials: 'AK',
    verified: true,
    date: 'Recent Client',
  },
];

export const COMPANY_CONTACT: CompanyContactInfo = {
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
};
