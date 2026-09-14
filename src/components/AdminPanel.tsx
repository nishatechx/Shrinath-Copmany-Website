import React, { useState } from 'react';
import {
  LayoutDashboard,
  Layers,
  Image as ImageIcon,
  MessageSquareQuote,
  Building2,
  Sparkles,
  Sliders,
  ShieldAlert,
  ArrowLeft,
  Download,
  Upload,
  RotateCcw,
  Save,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Globe,
  Star,
  CheckCircle2,
  Lock,
  KeyRound,
  Eye,
  AlertTriangle,
} from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { ServiceItem, ClientLogoItem, TestimonialItem, StatItem, ProcessStep } from '../types';
import { Logo } from './Logo';

interface AdminPanelProps {
  onCloseToSite: () => void;
}

type TabType =
  | 'overview'
  | 'services'
  | 'clients'
  | 'testimonials'
  | 'hero'
  | 'about'
  | 'company'
  | 'process'
  | 'settings';

export const AdminPanel: React.FC<AdminPanelProps> = ({ onCloseToSite }) => {
  const {
    content,
    logoutAdmin,
    changePassword,
    updateCompany,
    updateHero,
    updateAbout,
    addService,
    updateService,
    deleteService,
    addClientLogo,
    updateClientLogo,
    deleteClientLogo,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    updateProcessSteps,
    exportJsonBackup,
    importJsonBackup,
    resetToDefaults,
  } = useSiteContent();

  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Helper for notification toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // --- Local states for form editing ---
  // Company state
  const [companyForm, setCompanyForm] = useState(content.company);
  // Hero state
  const [heroForm, setHeroForm] = useState(content.hero);
  // About state
  const [aboutForm, setAboutForm] = useState(content.about);

  // Service Edit / Create modal state
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [serviceForm, setServiceForm] = useState<Omit<ServiceItem, 'id'>>({
    title: '',
    description: '',
    iconName: 'monitor',
    features: [''],
    deliverables: [''],
  });

  // Client Logo Edit / Create state
  const [editingLogoIndex, setEditingLogoIndex] = useState<number | null>(null);
  const [isAddingLogo, setIsAddingLogo] = useState(false);
  const [logoForm, setLogoForm] = useState<ClientLogoItem>({ name: '', url: '', website: '' });

  // Testimonial Edit / Create state
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState<Omit<TestimonialItem, 'id'>>({
    name: '',
    role: '',
    location: 'Washim',
    quote: '',
    rating: 5,
    initials: '',
    verified: true,
    date: 'Recent Client',
  });

  // Process steps state
  const [processForm, setProcessForm] = useState<ProcessStep[]>(content.processSteps);

  // Password change state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passError, setPassError] = useState('');

  // Import JSON file input ref
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Handle saving company
  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompany(companyForm);
    showToast('Company & Contact information updated successfully!');
  };

  // Handle saving Hero
  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateHero(heroForm);
    showToast('Hero section updated successfully!');
  };

  // Handle saving About
  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    updateAbout(aboutForm);
    showToast('About section & stats updated successfully!');
  };

  // Handle Service Submit
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.title.trim()) return;

    const cleanedFeatures = (serviceForm.features || []).filter((f) => f.trim() !== '');
    const cleanedDeliverables = (serviceForm.deliverables || []).filter((d) => d.trim() !== '');

    if (editingService) {
      updateService(editingService.id, {
        ...serviceForm,
        features: cleanedFeatures,
        deliverables: cleanedDeliverables,
      });
      showToast(`Service "${serviceForm.title}" updated!`);
    } else {
      addService({
        ...serviceForm,
        features: cleanedFeatures,
        deliverables: cleanedDeliverables,
      });
      showToast(`New service "${serviceForm.title}" added!`);
    }
    setEditingService(null);
    setIsAddingService(false);
  };

  // Handle Logo Submit
  const handleSaveLogo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logoForm.name.trim() || !logoForm.url.trim()) return;

    if (editingLogoIndex !== null) {
      updateClientLogo(editingLogoIndex, logoForm);
      showToast(`Client logo for "${logoForm.name}" updated!`);
    } else {
      addClientLogo(logoForm);
      showToast(`New client logo "${logoForm.name}" added!`);
    }
    setEditingLogoIndex(null);
    setIsAddingLogo(false);
  };

  // Handle Testimonial Submit
  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonialForm.name.trim() || !testimonialForm.quote.trim()) return;

    const derivedInitials =
      testimonialForm.initials ||
      testimonialForm.name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    if (editingTestimonial) {
      updateTestimonial(editingTestimonial.id, {
        ...testimonialForm,
        initials: derivedInitials,
      });
      showToast(`Testimonial for "${testimonialForm.name}" updated!`);
    } else {
      addTestimonial({
        ...testimonialForm,
        initials: derivedInitials,
      });
      showToast(`New testimonial for "${testimonialForm.name}" added!`);
    }
    setEditingTestimonial(null);
    setIsAddingTestimonial(false);
  };

  // Handle Process Steps Save
  const handleSaveProcess = (e: React.FormEvent) => {
    e.preventDefault();
    updateProcessSteps(processForm);
    showToast('Workflow Process steps saved successfully!');
  };

  // Handle Password Change
  const handlePasswordChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');
    if (newPassword !== confirmPassword) {
      setPassError('New passwords do not match');
      return;
    }
    if (newPassword.length < 4) {
      setPassError('Password must be at least 4 characters');
      return;
    }
    const ok = changePassword(oldPassword, newPassword);
    if (ok) {
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showToast('Admin password updated successfully!');
    } else {
      setPassError('Current password is incorrect');
    }
  };

  // Handle Import JSON
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const contentStr = event.target?.result as string;
      const res = importJsonBackup(contentStr);
      if (res.success) {
        showToast('JSON backup imported successfully! Content refreshed.');
        // Sync local forms
        setTimeout(() => window.location.reload(), 600);
      } else {
        alert('Failed to import backup: ' + res.error);
      }
    };
    reader.readAsText(file);
  };

  const navTabs: { id: TabType; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'services', label: 'Services', icon: <Layers className="w-4 h-4" />, count: content.services.length },
    { id: 'clients', label: 'Trusted Clients', icon: <ImageIcon className="w-4 h-4" />, count: content.clientLogos.length },
    { id: 'testimonials', label: 'Testimonials', icon: <MessageSquareQuote className="w-4 h-4" />, count: content.testimonials.length },
    { id: 'company', label: 'Company & Contact', icon: <Building2 className="w-4 h-4" /> },
    { id: 'hero', label: 'Hero & Banner', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'about', label: 'About & Stats', icon: <Sliders className="w-4 h-4" /> },
    { id: 'process', label: 'Process Steps', icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: 'settings', label: 'Backup & Security', icon: <ShieldAlert className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-medium text-sm shadow-2xl shadow-blue-600/40 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 border-b border-slate-800/90 backdrop-blur-xl px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo size="md" />
          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-700">
            <span className="text-xs font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-blue-900/60 border border-blue-700/60 text-blue-300">
              CMS DASHBOARD
            </span>
            <span className="text-xs text-slate-400">Content Management</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick live site button */}
          <button
            onClick={onCloseToSite}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4 text-sky-400" />
            <span className="hidden sm:inline">View Live Website</span>
            <span className="sm:hidden">Live Site</span>
          </button>

          {/* Export JSON Backup shortcut */}
          <button
            onClick={() => {
              exportJsonBackup();
              showToast('Backup JSON downloaded successfully!');
            }}
            title="Download JSON Backup"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Logout */}
          <button
            onClick={() => {
              logoutAdmin();
              onCloseToSite();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 text-red-300 text-xs sm:text-sm font-medium border border-red-800/60 transition-colors cursor-pointer"
          >
            <span>Exit / Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 gap-6">
        
        {/* Left Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 sticky top-20 shadow-xl space-y-1">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
              Site Management
            </div>
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-mono font-bold ${
                        isActive ? 'bg-blue-700 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-3 mt-3 border-t border-slate-800">
              <button
                onClick={onCloseToSite}
                className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Website</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 min-w-0">

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Content Overview</h1>
                <p className="text-slate-400 text-sm mt-1">
                  Manage and customize your live website content in real time. Changes are stored locally and sync instantly across any domain.
                </p>
              </div>

              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div 
                  onClick={() => setActiveTab('services')}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Active Services</span>
                    <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Layers className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-extrabold text-white mt-2">{content.services.length}</div>
                  <p className="text-xs text-slate-500 mt-1">Click to add or edit services</p>
                </div>

                <div 
                  onClick={() => setActiveTab('clients')}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Client Logos</span>
                    <div className="p-2 rounded-xl bg-sky-600/20 text-sky-400 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-extrabold text-white mt-2">{content.clientLogos.length}</div>
                  <p className="text-xs text-slate-500 mt-1">Trusted company & academy logos</p>
                </div>

                <div 
                  onClick={() => setActiveTab('testimonials')}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Testimonials</span>
                    <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <MessageSquareQuote className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-extrabold text-white mt-2">{content.testimonials.length}</div>
                  <p className="text-xs text-slate-500 mt-1">Authentic client reviews</p>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-blue-900/40 shadow-xl space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">Hosting & Custom Domain Ready</h3>
                    <p className="text-slate-300 text-xs sm:text-sm max-w-xl mt-0.5">
                      Whenever you connect or deploy your custom domain (e.g. <code>shrinathit.in</code>), typing <code>/admin</code> or clicking the Login button near "Get in touch" will directly open this control panel.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        exportJsonBackup();
                        showToast('Backup JSON exported!');
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download JSON Backup</span>
                    </button>
                    <button
                      onClick={onCloseToSite}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition-all cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Live Site</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Business Info Snapshot */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-400" />
                  <span>Current Business Contact Snapshot</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                    <span><strong>Address:</strong> {content.company.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Phone / WhatsApp:</strong> {content.company.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                    <span><strong>Email:</strong> {content.company.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span><strong>Website:</strong> {content.company.website}</span>
                  </div>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('company')}
                    className="text-xs text-blue-400 hover:text-blue-300 font-semibold cursor-pointer underline"
                  >
                    Edit Contact Details &rarr;
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white">Services Manager</h1>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    Add, edit or reorganize services displayed on the website.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingService(null);
                    setServiceForm({
                      title: '',
                      description: '',
                      iconName: 'monitor',
                      features: ['', '', ''],
                      deliverables: ['', ''],
                    });
                    setIsAddingService(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Service</span>
                </button>
              </div>

              {/* Add/Edit Modal/Card */}
              {isAddingService && (
                <div className="p-6 rounded-2xl bg-slate-900 border border-blue-500/50 shadow-2xl space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base">
                      {editingService ? `Edit Service: ${editingService.title}` : 'Add New Service'}
                    </h3>
                    <button
                      onClick={() => setIsAddingService(false)}
                      className="p-1 rounded-lg text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveService} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                          Service Title
                        </label>
                        <input
                          type="text"
                          value={serviceForm.title}
                          onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                          placeholder="e.g. AI & Cloud Solutions"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                          Icon Style
                        </label>
                        <select
                          value={serviceForm.iconName}
                          onChange={(e) =>
                            setServiceForm({
                              ...serviceForm,
                              iconName: e.target.value as ServiceItem['iconName'],
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                        >
                          <option value="monitor">Monitor / Web Design</option>
                          <option value="cpu">CPU / Software</option>
                          <option value="smartphone">Smartphone / App</option>
                          <option value="megaphone">Megaphone / Marketing</option>
                          <option value="diamond">Diamond / Branding</option>
                          <option value="edit-3">Edit / Content</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                        Short Description
                      </label>
                      <textarea
                        value={serviceForm.description}
                        onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                        placeholder="Brief summary of this service..."
                        rows={2}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>

                    {/* Features Array */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-semibold uppercase text-slate-300">
                          Key Features (One per line)
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            setServiceForm({
                              ...serviceForm,
                              features: [...(serviceForm.features || []), ''],
                            })
                          }
                          className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
                        >
                          + Add Feature
                        </button>
                      </div>
                      <div className="space-y-2">
                        {(serviceForm.features || []).map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={feat}
                              onChange={(e) => {
                                const copy = [...(serviceForm.features || [])];
                                copy[idx] = e.target.value;
                                setServiceForm({ ...serviceForm, features: copy });
                              }}
                              placeholder={`Feature #${idx + 1}`}
                              className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const copy = (serviceForm.features || []).filter((_, i) => i !== idx);
                                setServiceForm({ ...serviceForm, features: copy });
                              }}
                              className="p-1.5 rounded text-slate-400 hover:text-red-400"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setIsAddingService(false)}
                        className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg"
                      >
                        Save Service
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* List of current services */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.services.map((svc) => (
                  <div
                    key={svc.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-blue-400 border border-slate-700">
                          {svc.iconName}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setEditingService(svc);
                              setServiceForm({
                                title: svc.title,
                                description: svc.description,
                                iconName: svc.iconName,
                                features: svc.features || [],
                                deliverables: svc.deliverables || [],
                              });
                              setIsAddingService(true);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete service "${svc.title}"?`)) {
                                deleteService(svc.id);
                                showToast(`Deleted service "${svc.title}"`);
                              }
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <h4 className="font-bold text-white text-base">{svc.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{svc.description}</p>

                      {svc.features && svc.features.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {svc.features.slice(0, 3).map((f, i) => (
                            <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                              {f}
                            </span>
                          ))}
                          {svc.features.length > 3 && (
                            <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-500">
                              +{svc.features.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CLIENT LOGOS */}
          {activeTab === 'clients' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white">Trusted Client Logos</h1>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    Manage the client logos shown in the scrolling marquee banner.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingLogoIndex(null);
                    setLogoForm({ name: '', url: '', website: '' });
                    setIsAddingLogo(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Client Logo</span>
                </button>
              </div>

              {/* Add/Edit Logo Box */}
              {isAddingLogo && (
                <div className="p-6 rounded-2xl bg-slate-900 border border-blue-500/50 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base">
                      {editingLogoIndex !== null ? 'Edit Client Logo' : 'Add New Client Logo'}
                    </h3>
                    <button onClick={() => setIsAddingLogo(false)} className="p-1 rounded text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveLogo} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                          Client / Business Name
                        </label>
                        <input
                          type="text"
                          value={logoForm.name}
                          onChange={(e) => setLogoForm({ ...logoForm, name: e.target.value })}
                          placeholder="e.g. Joshi Sir's Samarth Academy"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                          Website (Optional)
                        </label>
                        <input
                          type="url"
                          value={logoForm.website || ''}
                          onChange={(e) => setLogoForm({ ...logoForm, website: e.target.value })}
                          placeholder="https://example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                        Logo Image Direct URL
                      </label>
                      <input
                        type="url"
                        value={logoForm.url}
                        onChange={(e) => setLogoForm({ ...logoForm, url: e.target.value })}
                        placeholder="https://... image link"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>

                    {/* Live Preview */}
                    {logoForm.url && (
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-white p-1 flex items-center justify-center shrink-0">
                          <img
                            src={logoForm.url}
                            alt="Preview"
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        </div>
                        <div className="text-xs">
                          <div className="font-bold text-white">{logoForm.name || 'Client Name'}</div>
                          <div className="text-slate-400 truncate max-w-xs">{logoForm.url}</div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setIsAddingLogo(false)}
                        className="px-4 py-2 text-slate-400 hover:text-white text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg"
                      >
                        Save Client Logo
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Grid of Logos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {content.clientLogos.map((client, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-white/95 p-1 flex items-center justify-center shrink-0 shadow">
                        <img
                          src={client.url}
                          alt={client.name}
                          className="max-w-full max-h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-white text-xs truncate">{client.name}</h4>
                        <span className="text-[10px] text-slate-400 block truncate">{client.url}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => {
                          setEditingLogoIndex(idx);
                          setLogoForm(client);
                          setIsAddingLogo(true);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove logo for "${client.name}"?`)) {
                            deleteClientLogo(idx);
                            showToast(`Removed "${client.name}" logo`);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white">Testimonials Manager</h1>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    Add or update realistic client testimonials, ratings and reviews.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingTestimonial(null);
                    setTestimonialForm({
                      name: '',
                      role: '',
                      location: 'Washim',
                      quote: '',
                      rating: 5,
                      initials: '',
                      verified: true,
                      date: 'Recent Client',
                    });
                    setIsAddingTestimonial(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Testimonial</span>
                </button>
              </div>

              {/* Add / Edit Form */}
              {isAddingTestimonial && (
                <div className="p-6 rounded-2xl bg-slate-900 border border-blue-500/50 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base">
                      {editingTestimonial ? 'Edit Testimonial' : 'Add New Client Testimonial'}
                    </h3>
                    <button onClick={() => setIsAddingTestimonial(false)} className="p-1 rounded text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveTestimonial} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                          Client Name
                        </label>
                        <input
                          type="text"
                          value={testimonialForm.name}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                          placeholder="e.g. Sagar Waghmare"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                          Role / Business Type
                        </label>
                        <input
                          type="text"
                          value={testimonialForm.role || ''}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                          placeholder="e.g. Wholesale Trader"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                          Location (City / District)
                        </label>
                        <input
                          type="text"
                          value={testimonialForm.location || ''}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, location: e.target.value })}
                          placeholder="e.g. Washim"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                          Star Rating (1 - 5)
                        </label>
                        <select
                          value={testimonialForm.rating}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: Number(e.target.value) })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                        >
                          <option value="5">5 Stars (Excellent)</option>
                          <option value="4">4 Stars (Great)</option>
                          <option value="3">3 Stars (Good)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                          Initials (Optional)
                        </label>
                        <input
                          type="text"
                          value={testimonialForm.initials}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, initials: e.target.value.toUpperCase() })}
                          placeholder="e.g. SW"
                          maxLength={3}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center pt-6">
                        <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={testimonialForm.verified}
                            onChange={(e) => setTestimonialForm({ ...testimonialForm, verified: e.target.checked })}
                            className="w-4 h-4 rounded text-blue-600 bg-slate-950 border-slate-700"
                          />
                          <span>Show Verified Client Badge</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                        Client Review Quote
                      </label>
                      <textarea
                        value={testimonialForm.quote}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })}
                        placeholder="Write the honest testimonial feedback here..."
                        rows={3}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setIsAddingTestimonial(false)}
                        className="px-4 py-2 text-slate-400 hover:text-white text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg"
                      >
                        Save Testimonial
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* List of Testimonials */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {content.testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingTestimonial(t);
                              setTestimonialForm(t);
                              setIsAddingTestimonial(true);
                            }}
                            className="p-1 rounded text-slate-400 hover:text-blue-400"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete testimonial for "${t.name}"?`)) {
                                deleteTestimonial(t.id);
                                showToast(`Deleted testimonial for "${t.name}"`);
                              }
                            }}
                            className="p-1 rounded text-slate-400 hover:text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 italic mb-4 leading-relaxed line-clamp-4">
                        "{t.quote}"
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5 pt-3 border-t border-slate-800/80">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 font-bold text-white text-xs flex items-center justify-center shrink-0">
                        {t.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate">{t.name}</div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {t.role} {t.location && `• ${t.location}`}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: COMPANY & CONTACT */}
          {activeTab === 'company' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white">Company & Contact Info</h1>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Update your contact phone, WhatsApp number, email, address, and social links.
                </p>
              </div>

              <form onSubmit={handleSaveCompany} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={companyForm.name}
                      onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      Tagline / Slogan
                    </label>
                    <input
                      type="text"
                      value={companyForm.tagline}
                      onChange={(e) => setCompanyForm({ ...companyForm, tagline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      Phone Number (Display)
                    </label>
                    <input
                      type="text"
                      value={companyForm.phone}
                      onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                      placeholder="+91 97636 58462"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      WhatsApp Number (10 Digits)
                    </label>
                    <input
                      type="text"
                      value={companyForm.whatsapp}
                      onChange={(e) => setCompanyForm({ ...companyForm, whatsapp: e.target.value })}
                      placeholder="9763658462"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={companyForm.email}
                      onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                      placeholder="shrinathit.in@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      Office Address
                    </label>
                    <input
                      type="text"
                      value={companyForm.address}
                      onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                      placeholder="Civil Line, Washim, Maharashtra 444505"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      Working Hours
                    </label>
                    <input
                      type="text"
                      value={companyForm.workingHours || ''}
                      onChange={(e) => setCompanyForm({ ...companyForm, workingHours: e.target.value })}
                      placeholder="Mon - Sat: 9:00 AM - 7:00 PM"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="pt-4 border-t border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Social Media Profiles
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Facebook URL</label>
                      <input
                        type="url"
                        value={companyForm.facebookUrl || ''}
                        onChange={(e) => setCompanyForm({ ...companyForm, facebookUrl: e.target.value })}
                        placeholder="https://facebook.com/..."
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Instagram URL</label>
                      <input
                        type="url"
                        value={companyForm.instagramUrl || ''}
                        onChange={(e) => setCompanyForm({ ...companyForm, instagramUrl: e.target.value })}
                        placeholder="https://instagram.com/..."
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">LinkedIn URL</label>
                      <input
                        type="url"
                        value={companyForm.linkedinUrl || ''}
                        onChange={(e) => setCompanyForm({ ...companyForm, linkedinUrl: e.target.value })}
                        placeholder="https://linkedin.com/..."
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Twitter / X URL</label>
                      <input
                        type="url"
                        value={companyForm.twitterUrl || ''}
                        onChange={(e) => setCompanyForm({ ...companyForm, twitterUrl: e.target.value })}
                        placeholder="https://twitter.com/..."
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-blue-600/30 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Company Information</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 6: HERO & BANNER */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white">Hero & Banner Content</h1>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Customize the main headline, subtext, status pill, and background image URL.
                </p>
              </div>

              <form onSubmit={handleSaveHero} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                    Status Pill Badge Text
                  </label>
                  <input
                    type="text"
                    value={heroForm.badgeText}
                    onChange={(e) => setHeroForm({ ...heroForm, badgeText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      Main Headline (Part 1)
                    </label>
                    <input
                      type="text"
                      value={heroForm.headlinePart1}
                      onChange={(e) => setHeroForm({ ...heroForm, headlinePart1: e.target.value })}
                      placeholder="Digital Solutions"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      Headline Highlight (Gradient Text)
                    </label>
                    <input
                      type="text"
                      value={heroForm.headlineGradient}
                      onChange={(e) => setHeroForm({ ...heroForm, headlineGradient: e.target.value })}
                      placeholder="That Drive Growth"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                    Hero Sub-headline / Paragraph
                  </label>
                  <textarea
                    value={heroForm.subtext}
                    onChange={(e) => setHeroForm({ ...heroForm, subtext: e.target.value })}
                    rows={3}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      Primary CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={heroForm.primaryCta}
                      onChange={(e) => setHeroForm({ ...heroForm, primaryCta: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      Secondary CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={heroForm.secondaryCta}
                      onChange={(e) => setHeroForm({ ...heroForm, secondaryCta: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                    Hero Background Image URL
                  </label>
                  <input
                    type="url"
                    value={heroForm.heroImage}
                    onChange={(e) => setHeroForm({ ...heroForm, heroImage: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-blue-600/30 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Hero Content</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 7: ABOUT & STATS */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white">About Section & Stats</h1>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Modify the story paragraph, bullet points, and 4 statistical counters.
                </p>
              </div>

              <form onSubmit={handleSaveAbout} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      value={aboutForm.badgeText}
                      onChange={(e) => setAboutForm({ ...aboutForm, badgeText: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      Headline Highlight
                    </label>
                    <input
                      type="text"
                      value={aboutForm.headlineGradient}
                      onChange={(e) => setAboutForm({ ...aboutForm, headlineGradient: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                    About Story Paragraph
                  </label>
                  <textarea
                    value={aboutForm.paragraph}
                    onChange={(e) => setAboutForm({ ...aboutForm, paragraph: e.target.value })}
                    rows={3}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                    required
                  />
                </div>

                {/* 4 Stats Counters */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">4 Key Achievement Counters</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {aboutForm.stats.map((st, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                        <input
                          type="text"
                          value={st.value}
                          onChange={(e) => {
                            const copy = [...aboutForm.stats];
                            copy[idx] = { ...copy[idx], value: e.target.value };
                            setAboutForm({ ...aboutForm, stats: copy });
                          }}
                          placeholder="100+"
                          className="w-20 px-2 py-1.5 rounded bg-slate-900 border border-slate-700 text-white font-bold text-sm text-center"
                        />
                        <input
                          type="text"
                          value={st.label}
                          onChange={(e) => {
                            const copy = [...aboutForm.stats];
                            copy[idx] = { ...copy[idx], label: e.target.value };
                            setAboutForm({ ...aboutForm, stats: copy });
                          }}
                          placeholder="Label (e.g. Projects Completed)"
                          className="flex-1 px-2 py-1.5 rounded bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-blue-600/30 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save About Section</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 8: PROCESS STEPS */}
          {activeTab === 'process' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white">4-Step Workflow Process</h1>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Customize the step titles and descriptions in the "How We Work" section.
                </p>
              </div>

              <form onSubmit={handleSaveProcess} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {processForm.map((step, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-400 font-mono font-bold text-sm flex items-center justify-center">
                          {step.number}
                        </span>
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => {
                            const copy = [...processForm];
                            copy[idx] = { ...copy[idx], title: e.target.value };
                            setProcessForm(copy);
                          }}
                          placeholder="Step Title (e.g. Discover)"
                          className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-sm font-bold"
                          required
                        />
                      </div>
                      <textarea
                        value={step.description}
                        onChange={(e) => {
                          const copy = [...processForm];
                          copy[idx] = { ...copy[idx], description: e.target.value };
                          setProcessForm(copy);
                        }}
                        rows={2}
                        placeholder="Step description..."
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-blue-600/30 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Process Steps</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 9: SETTINGS & BACKUP */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white">Backup & Security Settings</h1>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Change your admin password, export or import site content backup files, or reset to defaults.
                </p>
              </div>

              {/* Password Change Box */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-blue-400" />
                  <span>Change Admin Password</span>
                </h3>

                <form onSubmit={handlePasswordChangeSubmit} className="space-y-3 max-w-md">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm"
                      required
                    />
                  </div>

                  {passError && (
                    <div className="text-red-400 text-xs font-medium flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>{passError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow"
                  >
                    Update Password
                  </button>
                </form>
              </div>

              {/* Export & Import Backup */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Export & Import JSON Backup</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Save a complete offline copy of your services, logos, testimonials, and contact settings. You can import this JSON file into any newly connected domain.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      exportJsonBackup();
                      showToast('JSON backup exported!');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Backup</span>
                  </button>

                  <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 transition-all cursor-pointer">
                    <Upload className="w-4 h-4 text-sky-400" />
                    <span>Restore / Import JSON</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".json"
                      onChange={handleImportFile}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Reset to Default */}
              <div className="p-6 rounded-2xl bg-red-950/20 border border-red-900/40 space-y-3">
                <h3 className="text-base font-bold text-red-300 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-red-400" />
                  <span>Factory Reset Content</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Restore all default services, Marathi testimonials, client logos, and content back to their initial state.
                </p>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to reset all site content to original defaults?')) {
                      resetToDefaults();
                      showToast('Site content reset to factory defaults.');
                      setTimeout(() => window.location.reload(), 500);
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-red-900/60 hover:bg-red-800 text-red-200 text-xs font-semibold border border-red-700/60 cursor-pointer"
                >
                  Reset To Factory Defaults
                </button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
