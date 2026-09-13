import { LucideIcon } from 'lucide-react';

export interface WashimPageSEOData {
  slug: string;
  serviceKey: 'web' | 'marketing' | 'software' | 'app';
  pageTitle: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subheadline: string;
  badge: string;
  summary: string;
  heroHighlights: string[];
  features: {
    title: string;
    description: string;
    iconName: string;
  }[];
  localWhyChooseUs: {
    title: string;
    description: string;
  }[];
  techStack: string[];
  localIndustries: {
    title: string;
    description: string;
    iconName: string;
  }[];
  packages: {
    name: string;
    price: string;
    billingPeriod?: string;
    popular?: boolean;
    description: string;
    features: string[];
  }[];
  localAreas: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  schemaData: {
    serviceType: string;
    serviceDescription: string;
    serviceUrl: string;
  };
}

export const WASHIM_LANDING_PAGES: Record<string, WashimPageSEOData> = {
  'website-development-washim': {
    slug: 'website-development-washim',
    serviceKey: 'web',
    pageTitle: 'Best Website Development Company in Washim | Shrinath IT Solutions',
    metaTitle: 'Best Website Development Company in Washim | Web Design & E-Commerce',
    metaDescription: 'Top-rated website development company in Washim, Maharashtra. Fast, responsive, SEO-ready business websites, e-commerce stores, and coaching portals. Call +91-7972865688 for a free consultation!',
    h1: 'Best Website Development Company in Washim',
    subheadline: 'High-Performance, Google-Ranked & Conversion-Focused Websites for Businesses in Washim & Across Vidarbha',
    badge: '#1 Web Design & Development in Washim',
    summary: 'At Shrinath IT Solutions, we build ultra-fast, mobile-friendly, and Google-optimized websites that turn local visitors into paying customers. From coaching institutes and doctor clinics to agricultural traders and retail brands in Washim, we create custom digital experiences tailored to your business goals.',
    heroHighlights: [
      '⚡ 100/100 Google PageSpeed & Mobile First',
      '🔍 Built-in Local SEO for Washim & Vidarbha',
      '💼 Custom React, Next.js & WordPress Development',
      '🤝 On-Site Local Support in Washim City',
    ],
    features: [
      {
        title: 'Custom Corporate Websites',
        description: 'Tailor-made web presence with modern UI/UX, ultra-clean code, and rapid loading speeds that position your brand as a market leader in Washim.',
        iconName: 'Globe',
      },
      {
        title: 'E-Commerce Online Stores',
        description: 'Secure, high-converting e-commerce portals equipped with Razorpay/UPI payments, automatic invoice generation, and inventory tracking.',
        iconName: 'ShoppingCart',
      },
      {
        title: 'Education & Coaching Portals',
        description: 'Dedicated portals for academies and colleges featuring online admissions, student query forms, syllabus downloads, and notice boards.',
        iconName: 'GraduationCap',
      },
      {
        title: 'Healthcare & Clinic Websites',
        description: 'Professional medical websites with instant WhatsApp appointment booking, doctor schedules, and patient inquiry management.',
        iconName: 'Activity',
      },
      {
        title: 'Landing Pages & Lead Funnels',
        description: 'High-converting single-page landing pages optimized for Google Ads & social campaigns to generate instant customer inquiries.',
        iconName: 'Zap',
      },
      {
        title: 'Website Redesign & Maintenance',
        description: 'Upgrade outdated, slow websites into fast, sleek modern portals with guaranteed 99.9% uptime and monthly maintenance.',
        iconName: 'RefreshCw',
      },
    ],
    localWhyChooseUs: [
      {
        title: 'Local Presence & Face-to-Face Consultations',
        description: 'Based right here in Civil Line, Washim. Meet our development team in person to discuss your exact website vision without dealing with remote third-party agencies.',
      },
      {
        title: 'Pre-Optimized for Google Local Search',
        description: 'Every website comes with schema markup, fast Core Web Vitals, and localized keywords so customers searching for your services in Washim find you first on Google.',
      },
      {
        title: 'Transparent Pricing with No Hidden Costs',
        description: 'All packages include domain registration, high-speed cloud hosting, SSL certificates, business emails, and 1 full year of technical support.',
      },
      {
        title: 'Lightning Fast 7 to 14 Days Delivery',
        description: 'We follow an agile milestone process that gets your business website live quickly without compromising on design or performance.',
      },
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'WordPress', 'Node.js', 'Cloudflare', 'Google Cloud'],
    localIndustries: [
      {
        title: 'Competitive Exam & Coaching Academies',
        description: 'Samarth Academy, CET/NEET coaching institutes, and computer centers across Washim.',
        iconName: 'BookOpen',
      },
      {
        title: 'Hospitals, Clinics & Diagnostic Labs',
        description: 'Specialist doctors, polyclinics, pathology labs, and medical centers in Washim.',
        iconName: 'HeartPulse',
      },
      {
        title: 'Krishi Seva & Seeds Distributors',
        description: 'Agricultural equipment suppliers, seed stores, and fertilizer dealers in Karanja & Washim.',
        iconName: 'Leaf',
      },
      {
        title: 'Retailers, Showrooms & Wholesalers',
        description: 'Electronics, furniture, textiles, jewelry, and hardware showrooms in Washim market.',
        iconName: 'Store',
      },
    ],
    packages: [
      {
        name: 'Starter Business Web',
        price: '₹7,999',
        billingPeriod: 'one-time',
        description: 'Ideal for small local businesses, consultants, and individual professionals in Washim.',
        features: [
          '5 Custom Mobile-Responsive Pages',
          'Free .com / .in Domain for 1 Year',
          'High-Speed SSL Cloud Hosting',
          'WhatsApp Click-to-Chat Integration',
          'Google Maps & Local Contact Form',
          'Basic Google Search Indexing',
          '1 Year Technical Support',
        ],
      },
      {
        name: 'Professional Business Web',
        price: '₹14,999',
        billingPeriod: 'one-time',
        popular: true,
        description: 'Best for established businesses, schools, and coaching academies looking to dominate Google in Washim.',
        features: [
          'Up to 12 Dynamic Custom Pages',
          'Custom Modern UI/UX with 3D Accents',
          'Google My Business & Schema Integration',
          'Lead Capture & Automatic Email Alerts',
          'Ultra-Fast Google PageSpeed (90+)',
          'Social Media & WhatsApp Auto-Connect',
          'On-Page SEO Optimization for Washim',
          '1 Year Dedicated Priority Support',
        ],
      },
      {
        name: 'E-Commerce / Custom Portal',
        price: '₹24,999+',
        billingPeriod: 'one-time',
        description: 'For retail brands and enterprises requiring online payments, products, or user dashboards.',
        features: [
          'Unlimited Products & Categories',
          'Razorpay / PhonePe UPI Gateway Setup',
          'Customer Account & Order Tracking',
          'Admin CMS Dashboard for Products',
          'Automated GST Invoicing System',
          'High-Security Payment Encryption',
          'Speed CDN & Daily Cloud Backups',
          'Dedicated Training & Local Support',
        ],
      },
    ],
    localAreas: [
      'Civil Line, Washim',
      'Patni Commercial Complex',
      'Hingoli Naka & Akola Road',
      'Risod Road & Lakhala',
      'Karanja Lad',
      'Risod City & Rural',
      'Malegaon (Washim)',
      'Mangrulpir',
      'Manora',
    ],
    faqs: [
      {
        question: 'How much does website development cost in Washim?',
        answer: 'Our professional business website packages in Washim start from ₹7,999 for a starter 5-page mobile-friendly website, ₹14,999 for a comprehensive professional dynamic business portal with SEO, and ₹24,999+ for full-fledged e-commerce stores with UPI & Razorpay payment integration. Every plan includes free domain registration (.com/.in), high-speed cloud hosting, SSL security certificate, and 1 full year of dedicated technical maintenance with no hidden surprises.',
      },
      {
        question: 'How long will it take to build and launch my website in Washim?',
        answer: 'Most standard business websites are developed, tested, and launched live in 7 to 10 working days. Custom web applications, school portals, or e-commerce stores typically take 14 to 21 working days. We provide a live staging demo link within the first 3 to 4 days so you can review progress and give immediate feedback.',
      },
      {
        question: 'Will my website appear on Google when people search in Washim and Vidarbha?',
        answer: 'Yes, 100%! Every website we build includes on-page SEO optimization, localized schema markup (LocalBusiness & Service schema), meta tags targeting Washim, Risod, and Karanja Lad, fast Core Web Vitals (90+ PageSpeed score), and direct submission to Google Search Console and Bing Webmaster Tools for rapid indexing.',
      },
      {
        question: 'Can I update the website content, phone number, and photos myself?',
        answer: 'Yes! We provide an intuitive Admin CMS (Content Management System) where you can easily change contact numbers, update service descriptions, post festival notices, upload product photos, and publish testimonials in seconds without writing a single line of code. We also provide complete video guides and in-person training in Washim.',
      },
      {
        question: 'Do you provide on-site meetings and technical support in Washim and nearby tehsils?',
        answer: 'Yes! Our office is located at SIS, Near Circuit House, Civil Lines, Washim 444505 Maharshtra. Our engineering team provides direct face-to-face consultations in Washim city, and we also provide on-site field visits across Risod, Karanja Lad, Malegaon, Mangrulpir, Manora, and Shirpur Jain whenever needed.',
      },
      {
        question: 'Is domain registration, SSL certificate, and hosting included in the package?',
        answer: 'Yes. All our website packages include 1 year of free domain registration (.com, .in, or .co.in), high-speed cloud hosting with 99.9% uptime guarantee, free Let’s Encrypt / Cloudflare SSL certificate (green padlock icon for security), and official business email accounts (e.g., info@yourcompany.com).',
      },
      {
        question: 'What are the annual renewal charges after the first year?',
        answer: 'We maintain 100% price transparency. After the first year, annual renewal charges cover your domain renewal, cloud hosting server fees, SSL certificate, and server security patches, which typically range between ₹2,500 to ₹4,500 per year depending on your hosting tier.',
      },
      {
        question: 'Can we build the website in Marathi, Hindi, and English multi-language formats?',
        answer: 'Yes! We frequently build multi-lingual websites for local institutions, coaching centers, and agro-businesses in Washim allowing visitors to easily switch between Marathi (मराठी), Hindi (हिंदी), and English with a single tap.',
      },
    ],
    schemaData: {
      serviceType: 'Website Development & Web Design Services',
      serviceDescription: 'Custom website development, e-commerce stores, responsive UI/UX, and WordPress portals for businesses in Washim, Maharashtra.',
      serviceUrl: 'https://shrinathit.in/website-development-washim',
    },
  },

  'digital-marketing-washim': {
    slug: 'digital-marketing-washim',
    serviceKey: 'marketing',
    pageTitle: '#1 Digital Marketing Agency in Washim | SEO & Social Media Marketing',
    metaTitle: '#1 Digital Marketing Agency in Washim | Google SEO & Social Ads',
    metaDescription: 'Grow your business with the top digital marketing agency in Washim. Google SEO ranking, Instagram & Facebook Ads, Google My Business (GMB) optimization & verified leads. Contact Shrinath IT Solutions!',
    h1: 'Best Digital Marketing Agency in Washim',
    subheadline: 'Rank #1 on Google, Generate Verified High-Intent Customer Inquiries, and Dominate Social Media in Washim',
    badge: 'Results-Driven Digital Growth Partner',
    summary: 'Shrinath IT Solutions is Washim’s premier digital marketing and local SEO agency. We help local businesses, coaching academies, clinics, and retailers get found by customers on Google Search, Google Maps, Instagram, and Facebook with measurable ROI.',
    heroHighlights: [
      '📍 #1 Google My Business & Maps Ranking in Washim',
      '🎯 High-ROI Facebook & Instagram Lead Ads',
      '📈 Top 3 Google Search Keyword Rankings',
      '💬 Automated WhatsApp Marketing & Bulk Campaigns',
    ],
    features: [
      {
        title: 'Local Google SEO in Washim',
        description: 'Optimize your website and keywords so local customers searching for your products or services in Washim find your business before your competitors.',
        iconName: 'Search',
      },
      {
        title: 'Google My Business (GMB) Growth',
        description: 'Rank in the coveted Google Maps 3-Pack with optimized profiles, customer review strategies, photo geo-tagging, and weekly local updates.',
        iconName: 'MapPin',
      },
      {
        title: 'Targeted Meta & Instagram Ads',
        description: 'Run hyper-targeted sponsored campaigns reaching potential clients in Washim, Risod, Karanja, and neighboring Vidarbha districts.',
        iconName: 'Target',
      },
      {
        title: 'High-Intent Google Ads (PPC)',
        description: 'Capture immediate buyer demand with targeted Google Search & Call-only ads that deliver instant phone calls to your sales team.',
        iconName: 'TrendingUp',
      },
      {
        title: 'WhatsApp & SMS Marketing Automation',
        description: 'Engage existing customers and broadcast festival promotions, new offers, and admission announcements with verified WhatsApp automation.',
        iconName: 'MessageSquare',
      },
      {
        title: 'Social Media Management & Creative Design',
        description: 'Engaging festival banners, promotional reels, client testimonial videos, and brand identity posts created specifically for your brand.',
        iconName: 'Palette',
      },
    ],
    localWhyChooseUs: [
      {
        title: 'Deep Understanding of Washim Market Demographics',
        description: 'We know the exact language, consumer behavior, and search patterns of people in Washim and surrounding towns, ensuring maximum ad conversion.',
      },
      {
        title: 'Focus on Actual Customer Calls & Sales, Not Just "Likes"',
        description: 'We focus on tangible business growth: phone calls, store walk-ins, admission leads, and WhatsApp inquiries that generate revenue.',
      },
      {
        title: '100% Transparent Weekly & Monthly Analytics',
        description: 'Receive crystal-clear monthly performance reports detailing keyword rankings, ad spend, cost per lead, and campaign returns.',
      },
      {
        title: 'Dedicated Local Account Manager in Washim',
        description: 'Direct phone & WhatsApp support with a dedicated marketing strategist who lives and works right in your city.',
      },
    ],
    techStack: ['Google Ads', 'Meta Business Suite', 'Google Analytics 4', 'Search Console', 'Ahrefs / SEMrush', 'WhatsApp Business Cloud API', 'Canva Pro'],
    localIndustries: [
      {
        title: 'Coaching Classes & Education Centers',
        description: 'Generate high-volume student enrollments for MPSC, UPSC, NEET, JEE, and computer training classes in Washim.',
        iconName: 'GraduationCap',
      },
      {
        title: 'Hospitals, Dental & Specialist Doctors',
        description: 'Attract patients from Washim, Risod, Hingoli, and Akola with reputation management and appointment ads.',
        iconName: 'Activity',
      },
      {
        title: 'Real Estate & Land Developers',
        description: 'Showcase residential plots, commercial shops, and housing schemes to potential investors in Vidarbha.',
        iconName: 'Building',
      },
      {
        title: 'Jewelry, Clothing & Electronics Retailers',
        description: 'Drive high-volume footfall during festive seasons like Diwali, Gudi Padwa, and wedding periods.',
        iconName: 'ShoppingBag',
      },
    ],
    packages: [
      {
        name: 'Local SEO & GMB Booster',
        price: '₹4,999',
        billingPeriod: 'per month',
        description: 'Perfect for local clinics, retail shops, and professional service providers wanting to rank on Google Maps.',
        features: [
          'Google My Business Complete Audit & Setup',
          'Google Maps 3-Pack Optimization',
          'Local Citations & Directory Listings in Washim',
          'Customer Review Strategy & QR Code Setup',
          'Monthly Google Ranking & Call Reports',
          'Weekly Geo-Tagged Profile Posts',
        ],
      },
      {
        name: 'Growth Digital Marketing',
        price: '₹9,999',
        billingPeriod: 'per month',
        popular: true,
        description: 'The most popular package for schools, academies, and growing businesses seeking consistent leads.',
        features: [
          'Includes Complete Local SEO & GMB Booster',
          'Meta (Facebook & Instagram) Targeted Lead Ads',
          '8 Custom Designed Social Media Creatives / Month',
          'Festival Greeting Banners & Promotional Posts',
          'WhatsApp Inbound Lead Capture Flow',
          'Dedicated Campaign Optimization & Split Testing',
          'Monthly ROI & Lead Audit Call',
        ],
      },
      {
        name: '360° Lead Generation & Ads',
        price: '₹18,999',
        billingPeriod: 'per month',
        description: 'Complete digital dominance combining Google Search Ads, Social Ads, Video Creatives & WhatsApp marketing.',
        features: [
          'Full-Funnel Google Search Ads (PPC) Management',
          'High-Volume Facebook/Instagram Lead Generation',
          '16 Custom Creatives & 4 Short Promo Videos/Reels',
          'Bulk WhatsApp Broadcast Setup (Up to 10k messages)',
          'Landing Page Conversion Rate Optimization',
          'Competitor Keyword Dominance Strategy',
          '24/7 Priority Support & Weekly Strategy Meetings',
        ],
      },
    ],
    localAreas: [
      'Washim City Core & Civil Line',
      'Risod & Shirpur Jain',
      'Karanja Lad & Manora',
      'Malegaon & Sirpur',
      'Mangrulpir & Aundha Road',
      'Hingoli Border & Akola Road Belt',
    ],
    faqs: [
      {
        question: 'How fast can I start getting customer leads from digital marketing in Washim?',
        answer: 'Targeted Google Ads and Meta (Facebook & Instagram) campaigns start generating customer calls and WhatsApp inquiries within 24 to 48 hours of campaign launch. For organic Google SEO rankings (appearing on Google first page without paying per click), local businesses in Washim typically see dramatic keyword rank improvements within 30 to 60 days.',
      },
      {
        question: 'Why should I invest in Google My Business (GMB) and Maps ranking in Washim?',
        answer: 'Over 82% of customers in Washim search on Google Maps for local services ("best doctor in Washim", "coaching class in Washim", "fertilizer dealer near me"). Ranking in the Google Maps top 3-pack puts your direct phone number, Google reviews, photos, and GPS driving directions directly on customers\' phone screens.',
      },
      {
        question: 'Do you create the ad banners, posters, and video reels in Marathi and Hindi?',
        answer: 'Yes! Our creative studio designs all festival posters, admission flyers, promotional reels, and ad banners in Marathi (मराठी), Hindi (हिंदी), or English. We craft slogans and ad copy that resonate with the local culture and dialect of Washim and Vidarbha audiences.',
      },
      {
        question: 'Is the advertising ad budget included in the monthly agency fee?',
        answer: 'Our agency fee covers full campaign management: competitive research, audience targeting, ad copy, graphic design, daily bid optimization, and lead tracking. The ad spend itself (paid directly to Google or Meta) is determined by your budget (e.g. ₹100 to ₹500/day), giving you complete control over your expenses.',
      },
      {
        question: 'How do we track and receive the customer inquiries and phone calls?',
        answer: 'Every lead generated from Facebook, Instagram, or Google is instantly delivered to your WhatsApp and email within seconds. You also receive an encrypted Google Sheet tracking all leads and a comprehensive monthly analytical performance report.',
      },
      {
        question: 'Which industries in Washim benefit most from digital marketing?',
        answer: 'In Washim, digital marketing delivers exceptionally high ROI for: 1) MPSC/UPSC/NEET coaching academies, 2) Private clinics and specialist hospitals, 3) Real estate layout developers, 4) Retailers during festival seasons (Diwali, Gudi Padwa), and 5) Agro-service & machinery dealers.',
      },
      {
        question: 'Can you help remove or manage negative Google reviews for my business in Washim?',
        answer: 'We provide active Online Reputation Management (ORM). We help you set up QR codes in your shop/clinic to gather verified positive 5-star reviews from happy clients, respond professionally to customer feedback, and dispute fake spam reviews according to Google Business Profile guidelines.',
      },
      {
        question: 'Can we stop or pause the marketing campaigns at any time?',
        answer: 'Yes! We do not lock you into rigid long-term contracts. You can scale your ad budget up during high-demand months (such as admissions season or festival weeks) and pause or adjust campaigns whenever necessary.',
      },
    ],
    schemaData: {
      serviceType: 'Digital Marketing & SEO Services',
      serviceDescription: 'Local Google SEO, Google My Business ranking, Meta Facebook & Instagram ads, Google PPC ads, and lead generation for businesses in Washim.',
      serviceUrl: 'https://shrinathit.in/digital-marketing-washim',
    },
  },

  'software-development-washim': {
    slug: 'software-development-washim',
    serviceKey: 'software',
    pageTitle: 'Custom Software Development & ERP Solutions in Washim | Shrinath IT',
    metaTitle: 'Custom Software Development & ERP Software Company in Washim',
    metaDescription: 'Looking for custom software development in Washim? We build cloud ERP systems, GST billing software, inventory control, school management & clinic software. Get a free demo today!',
    h1: 'Custom Software Development Company in Washim',
    subheadline: 'Automate Business Operations, Inventory, Billing & Customer Relations with Robust Custom Software Solutions',
    badge: 'Enterprise Software & ERP Experts in Washim',
    summary: 'Shrinath IT Solutions develops scalable, reliable, and secure custom software applications designed specifically to solve operational bottlenecks for businesses, wholesalers, agricultural distributors, schools, and medical facilities in Washim district.',
    heroHighlights: [
      '💻 Custom Cloud & Offline Desktop Software',
      '🧾 GST-Compliant Invoicing & Automated Billing',
      '📦 Multi-Location Inventory & Stock Management',
      '🔒 Bank-Grade Security & Daily Automated Backups',
    ],
    features: [
      {
        title: 'Custom Business ERP Systems',
        description: 'Comprehensive ERP platforms unifying sales, purchasing, inventory, staff attendance, payroll, and accounting in one easy dashboard.',
        iconName: 'Server',
      },
      {
        title: 'GST Billing & POS Systems',
        description: 'Fast, barcode-enabled billing software for retail shops and wholesalers with automated tax calculations, e-way bills, and WhatsApp invoice sharing.',
        iconName: 'Receipt',
      },
      {
        title: 'School & College Management (SMS)',
        description: 'End-to-end institutional software covering student admissions, fee collection, report card generation, staff payroll, and parent SMS alerts.',
        iconName: 'GraduationCap',
      },
      {
        title: 'Hospital & Clinic Management (HMS)',
        description: 'Integrated healthcare software for patient registration, OPD/IPD billing, digital prescriptions, lab test reports, and appointment queues.',
        iconName: 'Activity',
      },
      {
        title: 'Agro Krishi Seva Software',
        description: 'Specialized software tailored for seed, fertilizer, and pesticide distributors in Washim with batch tracking, expiry alerts, and government report formats.',
        iconName: 'Wheat',
      },
      {
        title: 'Custom Cloud APIs & Database Solutions',
        description: 'Secure, high-availability PostgreSQL and Firebase databases connecting web portals, mobile apps, and internal desktop tools seamlessly.',
        iconName: 'Database',
      },
    ],
    localWhyChooseUs: [
      {
        title: 'Tailored to Your Exact Business Workflow',
        description: 'Unlike rigid off-the-shelf software, our systems are coded specifically to match how your team operates in Washim without unnecessary complexity.',
      },
      {
        title: 'On-Site Staff Training in Washim',
        description: 'We come directly to your store, office, or school in Washim to train your team members hands-on until they are completely confident.',
      },
      {
        title: 'Zero Recurring Monthly Lock-In Available',
        description: 'Own your software with a one-time development license or choose affordable cloud SaaS hosting with full database export rights.',
      },
      {
        title: 'Rapid On-Call Technical Assistance',
        description: 'Experiencing a billing glitch during peak business hours? Our local Washim support team responds in minutes, not days.',
      },
    ],
    techStack: ['Node.js', 'Express', 'React', 'Electron', 'PostgreSQL', 'Firebase', 'Python', 'Tailwind CSS', 'TypeScript'],
    localIndustries: [
      {
        title: 'Agro-Chemicals & Krishi Seva Kendras',
        description: 'Batch-wise pesticide tracking, fertilizer subsidies, and farmer customer registers in Washim & Karanja.',
        iconName: 'Leaf',
      },
      {
        title: 'Wholesale Grain & Pulse Traders (Dal Mills)',
        description: 'Mandi purchase registers, weighbridge integrations, stock lot management, and transport bills.',
        iconName: 'Truck',
      },
      {
        title: 'Private Schools, High Schools & Junior Colleges',
        description: 'Digital fee receipts, LC generation, timetable scheduling, and examination marksheets in Washim district.',
        iconName: 'BookOpen',
      },
      {
        title: 'Polyclinics, Diagnostic Centers & Pharmacies',
        description: 'Medical billing, doctor commission splits, pharmacy stock expiry management, and patient history records.',
        iconName: 'HeartPulse',
      },
    ],
    packages: [
      {
        name: 'GST Billing & Inventory Lite',
        price: '₹11,999',
        billingPeriod: 'one-time',
        description: 'Ideal for retail shops, electronics stores, and local distributors wanting fast barcode billing and stock tracking.',
        features: [
          'Barcode Scanner & Thermal Printer Support',
          'Fast 3-Click GST Invoicing',
          'Real-Time Stock & Low-Balance Alerts',
          'Customer Ledger & Pending Udhar Reminders',
          'WhatsApp Invoice Direct Sharing',
          'Automated Daily Local Data Backup',
          'Free Setup & On-Site Staff Training in Washim',
        ],
      },
      {
        name: 'Custom Business ERP Suite',
        price: '₹27,999+',
        billingPeriod: 'one-time',
        popular: true,
        description: 'Tailored for manufacturers, distributors, schools, or clinics requiring bespoke multi-user workflow automation.',
        features: [
          'Full Custom Workflow Module Development',
          'Multi-User Role Permissions (Admin/Staff/Cashier)',
          'Cloud Sync + Offline Mode Capability',
          'Comprehensive Profit/Loss & Tax Reports',
          'SMS / WhatsApp Notification Engine',
          'Custom Report Card / Bill Format Designer',
          '1 Year Free Version Updates & On-Site Support',
        ],
      },
      {
        name: 'Enterprise Cloud System',
        price: 'Custom Quote',
        billingPeriod: 'project-based',
        description: 'For large educational societies, multi-branch trading businesses, and enterprise organizations.',
        features: [
          'Multi-Branch Centralized Database Sync',
          'Dedicated Cloud Server Setup (AWS/GCP)',
          'Custom Web & Mobile Staff Dashboards',
          'Biometric Machine Attendance Integration',
          'End-to-End Encrypted Data Security',
          'Service Level Agreement (SLA) Guarantee',
          'Dedicated Technical Engineer Assigned',
        ],
      },
    ],
    localAreas: [
      'Washim Industrial Area (MIDC)',
      'Civil Line & District Court Area',
      'Karanja Lad Grain Market',
      'Risod Town & APMC Mandi',
      'Mangrulpir Commercial Zone',
      'Malegaon & Manora Tehsil',
    ],
    faqs: [
      {
        question: 'Can the custom software work offline during electricity or internet cuts in Washim?',
        answer: 'Yes, 100%! We engineer hybrid desktop and cloud systems that operate smoothly offline during network outages or power cuts in Washim. Cashiers can continue fast billing and barcode scanning without pause; all invoices and ledger entries sync automatically to the cloud server as soon as connection is restored.',
      },
      {
        question: 'Will our accountants and staff receive in-person hands-on training in Washim?',
        answer: 'Absolutely. We send our senior software trainer directly to your shop, mill, clinic, or school premises in Washim, Karanja, or Risod. We train your staff step-by-step in Marathi, Hindi, or English, provide printed reference cheat-sheets, and remain available for instant remote screen assistance.',
      },
      {
        question: 'How secure is our financial, customer, and inventory data?',
        answer: 'Your database is safeguarded with enterprise-grade AES-256 bit encryption, granular role-based permissions (so staff cannot view confidential owner margins or profit reports), and automated daily double-cloud backups to Google Cloud/AWS servers in India.',
      },
      {
        question: 'Can you customize the software with specific features for our trade?',
        answer: 'Yes! Unlike rigid off-the-shelf software packages, we build custom solutions from source code. Whether you need specialized APMC Mandi weighbridge integrations, Krishi Seva batch/expiry government registers, or school marksheet templates, we tailor every screen to your exact workflow.',
      },
      {
        question: 'Does the software support barcode scanners and thermal receipt printers?',
        answer: 'Yes. Our POS and billing modules are plug-and-play compatible with all major barcode scanners, thermal receipt printers (2-inch, 3-inch, and 4-inch), digital weighing scales, and laser printers across USB, Bluetooth, and LAN connections.',
      },
      {
        question: 'Can we send automated WhatsApp invoices and payment reminders to clients?',
        answer: 'Yes! The software includes direct 1-click WhatsApp integration to send clean PDF GST invoices, payment receipts, and automated outstanding payment ("Udhar / Ledger") reminder messages with instant UPI payment links.',
      },
      {
        question: 'How do I request a live interactive demo of your software in Washim?',
        answer: 'Simply call us at +91-7972865688 or click "Request Free Demo" on this page. We can either visit your office in Washim or organize a live screen-sharing session to demonstrate features tailored to your specific industry.',
      },
      {
        question: 'What happens if we open new branches in Karanja, Risod, or Akola in the future?',
        answer: 'Our software architecture supports multi-branch central database synchronization. You can effortlessly monitor real-time sales, live inventory, and cash collections across all your branches from a single master dashboard on your phone or laptop.',
      },
    ],
    schemaData: {
      serviceType: 'Custom Software Development & ERP Solutions',
      serviceDescription: 'Custom business software, ERP systems, GST billing tools, school management and clinic software development in Washim, Maharashtra.',
      serviceUrl: 'https://shrinathit.in/software-development-washim',
    },
  },

  'mobile-app-development-washim': {
    slug: 'mobile-app-development-washim',
    serviceKey: 'app',
    pageTitle: 'Top Mobile App Development Company in Washim | Android & iOS Apps',
    metaTitle: 'Mobile App Development Company in Washim | Android, iOS & Flutter',
    metaDescription: 'Leading mobile app development company in Washim. We build fast, scalable Android, iOS, and Flutter apps with payment gateways, live notifications & admin panels. Contact Shrinath IT!',
    h1: 'Top Mobile App Development Company in Washim',
    subheadline: 'High-Performance Android & iOS Mobile Applications Engineered for Startups, Academies & Businesses in Washim',
    badge: 'Mobile App Engineering Specialists',
    summary: 'Shrinath IT Solutions crafts custom mobile apps that deliver lightning-fast performance, intuitive user interfaces, and robust cloud backends. Whether you need a student test series app, e-commerce shopping app, or B2B field service app in Washim, we bring your mobile vision to life.',
    heroHighlights: [
      '📱 Native Android & Cross-Platform Flutter Apps',
      '💳 Razorpay, PhonePe & Google Pay Integration',
      '🔔 Push Notifications & Live SMS Integration',
      '🚀 Full Play Store & App Store Publishing Support',
    ],
    features: [
      {
        title: 'Android & iOS App Development',
        description: 'High-speed apps built with modern Flutter and React Native architectures that look and perform flawlessly on all smartphones and tablets.',
        iconName: 'Smartphone',
      },
      {
        title: 'E-Commerce & Delivery Apps',
        description: 'Complete online ordering platforms featuring product catalogs, cart, coupon codes, live order status, and instant digital payments.',
        iconName: 'ShoppingBag',
      },
      {
        title: 'Education & Online Exam Apps',
        description: 'Interactive learning apps for coaching academies in Washim featuring video lectures, online mock tests, PDF notes, and student performance charts.',
        iconName: 'BookOpen',
      },
      {
        title: 'Doctor Appointment & Telehealth Apps',
        description: 'Convenient mobile apps allowing patients across Washim district to book clinic slots, view prescriptions, and receive consultation reminders.',
        iconName: 'HeartPulse',
      },
      {
        title: 'B2B Wholesale & Sales Executive Apps',
        description: 'Field executive apps enabling salesmen to take shop orders, collect payments, and sync stock in real time while visiting rural markets.',
        iconName: 'Users',
      },
      {
        title: 'App Store Submission & Maintenance',
        description: 'Complete end-to-end guidance for Google Play Store and Apple App Store guidelines, compliance, asset design, and ongoing updates.',
        iconName: 'CheckCircle2',
      },
    ],
    localWhyChooseUs: [
      {
        title: 'Single Codebase for Both Android & iOS',
        description: 'We utilize state-of-the-art Flutter technology to build high-performance Android and iOS apps simultaneously, saving you 40% in development costs.',
      },
      {
        title: 'Complete Admin Web Dashboard Included',
        description: 'Every mobile app includes a powerful desktop web panel where you can manage users, send push notifications, update banners, and view revenue analytics.',
      },
      {
        title: 'Smooth Offline Capabilities',
        description: 'Engineered for real-world connectivity conditions with intelligent local caching so users can access key information even with low mobile signal.',
      },
      {
        title: 'Local Face-to-Face Project Milestones in Washim',
        description: 'Test interactive prototypes on your own smartphone at each development phase with direct support from our Washim engineering team.',
      },
    ],
    techStack: ['Flutter', 'React Native', 'Kotlin', 'Firebase', 'Node.js', 'Google Play Console', 'Apple App Store', 'Razorpay SDK'],
    localIndustries: [
      {
        title: 'Coaching Classes & Test Academies',
        description: 'Launch your academy’s branded Android app with student test series, recorded classes, and fee payments in Washim.',
        iconName: 'GraduationCap',
      },
      {
        title: 'Local Grocery & Food Delivery Services',
        description: 'On-demand delivery apps connecting local restaurants and supermarkets in Washim with door-to-door delivery.',
        iconName: 'Store',
      },
      {
        title: 'Healthcare Clinics & Diagnostic Centers',
        description: 'Digital token management, lab test reports download, and doctor video consultation platforms.',
        iconName: 'Activity',
      },
      {
        title: 'Service Booking & Home Services',
        description: 'Connecting electricians, plumbers, salon professionals, and technicians with home customers across Washim.',
        iconName: 'Wrench',
      },
    ],
    packages: [
      {
        name: 'Starter Business Android App',
        price: '₹18,999',
        billingPeriod: 'one-time',
        description: 'Great for local businesses wanting an official mobile presence, digital catalog, and customer inquiry app on Google Play Store.',
        features: [
          'Native Android App (.apk & .aab format)',
          'Modern Fluid User Interface & Animation',
          'Direct WhatsApp & One-Tap Call Integration',
          'Push Notification Broadcast System',
          'Google Play Store Publishing Assistance',
          'Web Admin Panel to Update App Content',
          '6 Months Free Technical Support',
        ],
      },
      {
        name: 'Cross-Platform App (Android + iOS)',
        price: '₹34,999',
        billingPeriod: 'one-time',
        popular: true,
        description: 'Ideal for coaching academies, service businesses, and e-commerce brands needing both Android and iPhone apps.',
        features: [
          'Flutter Cross-Platform Build (Android + iOS)',
          'User Login & OTP Authentication (Firebase/SMS)',
          'UPI & Credit Card Payment Gateway (Razorpay)',
          'Interactive Admin Panel with Analytics',
          'Real-Time Cloud Database Sync',
          'Play Store & App Store Listing Graphics',
          '1 Year Comprehensive Maintenance & Bug Fixes',
        ],
      },
      {
        name: 'Custom Enterprise / Multi-Vendor App',
        price: '₹59,999+',
        billingPeriod: 'one-time',
        description: 'For on-demand delivery, online test engines, multi-vendor marketplaces, or high-scale mobile startups.',
        features: [
          'Customer App + Driver/Vendor App + Admin Suite',
          'Live GPS Tracking & Google Maps Geocoding',
          'Automated Commission & Payout Splits',
          'High-Concurrency Backend with Serverless Scaling',
          'Audio/Video Streaming & Encrypted File Storage',
          'Advanced Security Audits & Penetration Testing',
          'Dedicated Tech Lead & Priority SLA Support',
        ],
      },
    ],
    localAreas: [
      'Washim City (Civil Line & Main Market)',
      'Risod & Shirpur Jain',
      'Karanja Lad & Pohradevi',
      'Malegaon & Shelubazar',
      'Mangrulpir & Manora',
      'Washim District Rural Hubs',
    ],
    faqs: [
      {
        question: 'Will our mobile app be available on Google Play Store and Apple App Store?',
        answer: 'Yes! We handle the complete end-to-end publishing process, including generating signed AAB (Android App Bundle) and IPA builds, configuring Google Play Console and Apple App Store Connect, designing compliant screenshots and feature banners, writing privacy policies, and guaranteeing store approval.',
      },
      {
        question: 'Can users pay online through UPI, Google Pay, PhonePe, and cards in the app?',
        answer: 'Yes! We integrate RBI-compliant Indian payment gateways including Razorpay, Cashfree, and PhonePe PG. Your users can complete payments in 1 tap via Google Pay, PhonePe, Paytm, BHIM UPI, Net Banking, and Debit/Credit cards with zero friction.',
      },
      {
        question: 'Do I get a web admin panel to send notifications, manage products, and view students/users?',
        answer: 'Yes! Every mobile application includes a modern, responsive web admin dashboard accessible from any PC or mobile browser. You can send instant push notifications, add test series PDFs, upload videos, track sales revenue, and manage customer accounts anytime.',
      },
      {
        question: 'How long does it take to develop and launch a mobile app in Washim?',
        answer: 'A standard business catalog or booking Android app takes around 2 to 3 weeks. Comprehensive e-commerce applications, student coaching test series apps, or multi-vendor platforms with backend APIs typically take 4 to 6 weeks from initial design to Play Store launch.',
      },
      {
        question: 'Can the mobile app work on low 4G/3G mobile internet connectivity?',
        answer: 'Yes! We build mobile apps with intelligent local database caching (SQLite / Hive). Students or customers in rural areas of Washim district can browse cached lessons, notes, and catalogs smoothly even when mobile network signal is intermittent.',
      },
      {
        question: 'Do you build native Android apps, iOS iPhone apps, or Flutter hybrid apps?',
        answer: 'We specialize in Google Flutter and React Native cross-platform frameworks, allowing you to launch both an Android and an Apple iOS app from a single codebase—saving you up to 40% in development and ongoing maintenance costs while maintaining 60FPS fluid native speed.',
      },
      {
        question: 'What happens when Google or Apple releases new Android/iOS updates?',
        answer: 'All our mobile app development contracts include free warranty and maintenance covering annual Google Play target SDK updates (Android 14/15/16) and Apple iOS version upgrades, ensuring your app never gets delisted from the app stores.',
      },
      {
        question: 'Can we meet locally in Washim to test the prototype on our phones?',
        answer: 'Yes! We provide interactive test APK builds at every project milestone. You can meet our engineers in Washim at our office (SIS, Near Circuit House, Civil Lines, Washim 444505 Maharshtra.) or we can visit your premises so you can test and feel the real app live on your own smartphone.',
      },
    ],
    schemaData: {
      serviceType: 'Mobile Application Development Services',
      serviceDescription: 'Custom Android, iOS, and Flutter mobile application development with payment gateway, push notifications, and cloud admin panels in Washim, Maharashtra.',
      serviceUrl: 'https://shrinathit.in/mobile-app-development-washim',
    },
  },
};
