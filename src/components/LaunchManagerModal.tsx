import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock,
  Unlock,
  Image as ImageIcon,
  Clock,
  Layout,
  CheckCircle2,
  X,
  Upload,
  Eye,
  Power,
  Sparkles,
  AlertCircle,
  LogOut,
  Sliders,
  Move,
  Palette,
  Type,
  Maximize2,
  RotateCcw,
} from 'lucide-react';
import {
  DEFAULT_LAUNCH_IMAGE,
  normalizeImageUrl,
  getGoogleDriveId,
} from '../utils/imageUrl';

export { DEFAULT_LAUNCH_IMAGE };

export type CountdownPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'center'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type CountdownBackgroundStyle =
  | 'solid-black'
  | 'solid-slate'
  | 'solid-zinc'
  | 'solid-carbon'
  | 'transparent'
  | 'glass'
  | 'minimal'
  | 'translucent'
  | 'neon-border';

export type CountdownColorTheme =
  | 'gold'
  | 'white'
  | 'cyan'
  | 'emerald'
  | 'coral'
  | 'purple';

export type CountdownFontSize = 'sm' | 'md' | 'lg' | 'xl';
export type CountdownFontFamily = 'mono' | 'sans' | 'serif';
export type CountdownTimeFormat = 'standard' | 'colon' | 'compact';

export interface LaunchSettings {
  enabled: boolean;
  imageUrl: string;
  title: string;
  targetTimestamp: number;
  position: CountdownPosition;
  allowSecretClickUnlock: boolean;

  // Formatting & Transparency options
  backgroundStyle: CountdownBackgroundStyle;
  noOutlines?: boolean;
  colorTheme: CountdownColorTheme;
  fontSize: CountdownFontSize;
  fontFamily: CountdownFontFamily;
  timeFormat: CountdownTimeFormat;
  showTitleBadge: boolean;
  showClickHint: boolean;

  // Custom drag coordinates
  dragPosition?: { x: number; y: number };
}

export const LAUNCH_STORAGE_KEY = 'shrinath_launch_settings';
export const ADMIN_AUTH_STORAGE_KEY = 'shrinath_launch_admin_logged_in';

export const getSavedLaunchSettings = (): LaunchSettings => {
  const fallback: LaunchSettings = {
    enabled: false,
    imageUrl: DEFAULT_LAUNCH_IMAGE,
    title: 'Official Website Launch',
    targetTimestamp: Date.now() + 2 * 3600 * 1000,
    position: 'bottom-center',
    allowSecretClickUnlock: true,
    backgroundStyle: 'solid-black', // Default solid dark color option with 0 outlines
    noOutlines: true,
    colorTheme: 'gold',
    fontSize: 'lg',
    fontFamily: 'mono',
    timeFormat: 'standard',
    showTitleBadge: false,
    showClickHint: false,
    dragPosition: undefined,
  };

  if (typeof window === 'undefined') return fallback;

  try {
    const raw = localStorage.getItem(LAUNCH_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const bgStyle = (parsed.backgroundStyle as CountdownBackgroundStyle) || 'solid-black';
      const isSolid = bgStyle.startsWith('solid-');
      return {
        ...fallback,
        ...parsed,
        enabled: Boolean(parsed.enabled),
        imageUrl: parsed.imageUrl ? normalizeImageUrl(parsed.imageUrl) : DEFAULT_LAUNCH_IMAGE,
        title: parsed.title || 'Official Website Launch',
        targetTimestamp: parsed.targetTimestamp || Date.now() + 2 * 3600 * 1000,
        position: parsed.position || 'bottom-center',
        allowSecretClickUnlock: parsed.allowSecretClickUnlock !== false,
        backgroundStyle: bgStyle,
        noOutlines: parsed.noOutlines !== undefined ? Boolean(parsed.noOutlines) : isSolid,
        colorTheme: parsed.colorTheme || 'gold',
        fontSize: parsed.fontSize || 'lg',
        fontFamily: parsed.fontFamily || 'mono',
        timeFormat: parsed.timeFormat || 'standard',
        showTitleBadge: false,
        showClickHint: false,
        dragPosition: parsed.dragPosition || undefined,
      };
    }
  } catch {
    // ignore parse error
  }
  return fallback;
};

interface LaunchManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsUpdated: (settings: LaunchSettings) => void;
  onTriggerPreview: () => void;
}

export const LaunchManagerModal: React.FC<LaunchManagerModalProps> = ({
  isOpen,
  onClose,
  onSettingsUpdated,
  onTriggerPreview,
}) => {
  // Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(ADMIN_AUTH_STORAGE_KEY) === 'true';
    }
    return false;
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Main Launch Settings State
  const [settings, setSettings] = useState<LaunchSettings>(() => getSavedLaunchSettings());

  // Duration Helper state
  const [durationHours, setDurationHours] = useState<number>(2);
  const [durationMinutes, setDurationMinutes] = useState<number>(0);

  // Active tab in admin manager
  const [activeTab, setActiveTab] = useState<'poster-timer' | 'formatting' | 'location'>('poster-timer');

  // Notification state
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>('');
  const [imageError, setImageError] = useState<boolean>(false);

  // Sync settings whenever modal opens
  useEffect(() => {
    if (isOpen) {
      const current = getSavedLaunchSettings();
      setSettings(current);

      // Compute remaining hours & minutes from target
      const diff = Math.max(0, current.targetTimestamp - Date.now());
      const totalMin = Math.floor(diff / 60000);
      setDurationHours(Math.floor(totalMin / 60));
      setDurationMinutes(totalMin % 60);

      // Refresh auth status
      setIsAdminLoggedIn(localStorage.getItem(ADMIN_AUTH_STORAGE_KEY) === 'true');
      setLoginError('');
      setSaveSuccessMsg('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Login Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'admin' && password.trim() === 'admin123') {
      setIsAdminLoggedIn(true);
      localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Use admin / admin123');
    }
  };

  const handleQuickDemoLogin = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, 'true');
    setLoginError('');
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
  };

  // Handle Image File Upload (Convert to Base64)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert('Image size exceeds 8MB limit. Please choose a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          setSettings((prev) => ({ ...prev, imageUrl: base64 }));
          setImageError(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyDuration = (h: number, m: number) => {
    const safeH = Math.max(0, h);
    const safeM = Math.max(0, Math.min(59, m));
    const newTarget = Date.now() + (safeH * 3600 + safeM * 60) * 1000;
    setDurationHours(safeH);
    setDurationMinutes(safeM);
    setSettings((prev) => ({ ...prev, targetTimestamp: newTarget }));
  };

  // Save Settings & Immediately Apply ("Make it happen")
  const handleSaveSettings = () => {
    const effectiveImageUrl = normalizeImageUrl(settings.imageUrl) || DEFAULT_LAUNCH_IMAGE;
    const settingsToSave: LaunchSettings = {
      ...settings,
      imageUrl: effectiveImageUrl,
      showTitleBadge: false,
      showClickHint: false,
    };

    try {
      localStorage.setItem(LAUNCH_STORAGE_KEY, JSON.stringify(settingsToSave));

      // If enabling launch mode, clear any previous session unlocks so the launch screen appears immediately!
      if (settingsToSave.enabled) {
        sessionStorage.removeItem('shrinath_launch_unlocked');
      }

      onSettingsUpdated(settingsToSave);
      setSaveSuccessMsg('Launch settings updated and applied successfully!');

      // Close modal to immediately display the launch overlay!
      setTimeout(() => {
        onClose();
      }, 400);
    } catch {
      alert('Failed to save to local storage.');
    }
  };

  const positions: { id: CountdownPosition; label: string; gridCol: string }[] = [
    { id: 'top-left', label: 'Top Left', gridCol: 'col-start-1 row-start-1' },
    { id: 'top-center', label: 'Top Center', gridCol: 'col-start-2 row-start-1' },
    { id: 'top-right', label: 'Top Right', gridCol: 'col-start-3 row-start-1' },
    { id: 'center', label: 'Dead Center', gridCol: 'col-start-2 row-start-2' },
    { id: 'bottom-left', label: 'Bottom Left', gridCol: 'col-start-1 row-start-3' },
    { id: 'bottom-center', label: 'Bottom Center', gridCol: 'col-start-2 row-start-3' },
    { id: 'bottom-right', label: 'Bottom Right', gridCol: 'col-start-3 row-start-3' },
  ];

  const backgroundStyles: {
    id: CountdownBackgroundStyle;
    label: string;
    desc: string;
    badge?: string;
    previewBg?: string;
  }[] = [
    {
      id: 'solid-black',
      label: 'Solid Pitch Black',
      desc: 'Pure #000000 flat dark block. Zero borders, zero outlines.',
      badge: 'SOLID DARK',
      previewBg: 'bg-black',
    },
    {
      id: 'solid-slate',
      label: 'Solid Charcoal Slate',
      desc: 'Deep slate navy dark (#0f172a). Zero borders, zero outlines.',
      badge: 'SOLID DARK',
      previewBg: 'bg-slate-950',
    },
    {
      id: 'solid-zinc',
      label: 'Solid Midnight Zinc',
      desc: 'Matte neutral midnight (#09090b). Zero borders, zero outlines.',
      badge: 'SOLID DARK',
      previewBg: 'bg-zinc-950',
    },
    {
      id: 'solid-carbon',
      label: 'Solid Carbon Dark',
      desc: 'Sleek carbon dark tone (#18181b). Zero borders, zero outlines.',
      badge: 'SOLID DARK',
      previewBg: 'bg-neutral-900',
    },
    {
      id: 'transparent',
      label: '100% Transparent',
      desc: 'Floating digits directly over poster, no background box.',
      badge: 'TRANSPARENT',
      previewBg: 'bg-transparent',
    },
    {
      id: 'glass',
      label: 'Frosted Glass',
      desc: 'Translucent glass with soft backdrop blur.',
      badge: 'GLASS',
      previewBg: 'bg-white/10',
    },
    {
      id: 'translucent',
      label: 'Soft Translucent',
      desc: 'Slight dark tint (25%) for busy images.',
      badge: 'TINTED',
      previewBg: 'bg-slate-900/60',
    },
    {
      id: 'minimal',
      label: 'Ultra Minimal',
      desc: 'Pure typography without frame.',
      badge: 'MINIMAL',
      previewBg: 'bg-transparent',
    },
  ];

  const colorThemes: { id: CountdownColorTheme; label: string; color: string; hex: string }[] = [
    { id: 'gold', label: 'Gold / Yellow', color: 'bg-amber-400', hex: '#FFD21F' },
    { id: 'white', label: 'Crisp White', color: 'bg-white', hex: '#FFFFFF' },
    { id: 'cyan', label: 'Cyber Cyan', color: 'bg-sky-400', hex: '#38BDF8' },
    { id: 'emerald', label: 'Emerald Lime', color: 'bg-emerald-400', hex: '#10B981' },
    { id: 'coral', label: 'Vibrant Coral', color: 'bg-rose-400', hex: '#F43F5E' },
    { id: 'purple', label: 'Cyber Purple', color: 'bg-purple-400', hex: '#C084FC' },
  ];

  const fontSizes: { id: CountdownFontSize; label: string }[] = [
    { id: 'sm', label: 'Compact' },
    { id: 'md', label: 'Medium' },
    { id: 'lg', label: 'Large (Hero)' },
    { id: 'xl', label: 'Extra Large' },
  ];

  const fontFamilies: { id: CountdownFontFamily; label: string; fontClass: string }[] = [
    { id: 'mono', label: 'Digital Monospace', fontClass: 'font-mono' },
    { id: 'sans', label: 'Modern Sans', fontClass: 'font-sans font-black' },
    { id: 'serif', label: 'Classic Serif', fontClass: 'font-serif' },
  ];

  const timeFormats: { id: CountdownTimeFormat; label: string; sample: string }[] = [
    { id: 'standard', label: 'Boxed Units', sample: '02h : 45m : 12s with labels' },
    { id: 'colon', label: 'Digital Clock', sample: '02 : 45 : 12' },
    { id: 'compact', label: 'Compact Badge', sample: '02h 45m 12s' },
  ];

  return (
    <div
      id="launch-manager-modal"
      style={{ cursor: 'default' }}
      className="fixed inset-0 z-[100005] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto cursor-default"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        style={{ cursor: 'default' }}
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-6 text-slate-100 cursor-default"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Website Launch Controller</h2>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-amber-300 border border-slate-700">
                  Alt + L
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Configure poster image, transparent countdown, formatting &amp; drag position
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                type="button"
                onClick={handleLogout}
                title="Logout"
                style={{ cursor: 'pointer' }}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              style={{ cursor: 'pointer' }}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[82vh] overflow-y-auto space-y-6">
          {/* =========================================================================
              VIEW 1: LOGIN (If not authenticated)
          ========================================================================= */}
          {!isAdminLoggedIn ? (
            <div className="py-6 space-y-5">
              <div className="text-center max-w-md mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[#EAB308] flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white">Admin Authentication Required</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Please sign in to configure or activate the launch countdown screen.
                </p>
              </div>

              <form onSubmit={handleLogin} className="max-w-md mx-auto space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 cursor-default">
                    Username / Email
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    style={{ cursor: 'text' }}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors cursor-text"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 cursor-default">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="admin123"
                    style={{ cursor: 'text' }}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors cursor-text"
                  />
                </div>

                {loginError && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2 cursor-default">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    style={{ cursor: 'pointer' }}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#EAB308] hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors cursor-pointer shadow-lg flex items-center justify-center gap-2"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>Log In</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleQuickDemoLogin}
                    style={{ cursor: 'pointer' }}
                    className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer border border-slate-700"
                  >
                    1-Click Admin Access
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-800 text-[11px] text-slate-400 text-center">
                  💡 Hint: Default credentials are <strong className="text-amber-400">admin</strong> / <strong className="text-amber-400">admin123</strong>. Press <strong className="text-amber-400">Alt + L</strong> anytime.
                </div>
              </form>
            </div>
          ) : (
            /* =========================================================================
                VIEW 2: AUTHENTICATED ADMIN LAUNCH MANAGER CONTROLS
            ========================================================================= */
            <div className="space-y-6">
              {/* Notification Banner */}
              {saveSuccessMsg && (
                <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{saveSuccessMsg}</span>
                </div>
              )}

              {/* 1. MASTER TOGGLE & INSTANT STATUS */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      settings.enabled
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-slate-800 text-slate-500 border border-slate-700'
                    }`}
                  >
                    <Power className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">Launch Mode Gate</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          settings.enabled
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {settings.enabled ? 'ACTIVE (Will Lock Site)' : 'DISABLED (Site Open)'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      When enabled and saved, visitors will only see the custom launch image &amp; countdown.
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enabled}
                    onChange={(e) => setSettings((prev) => ({ ...prev, enabled: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#EAB308]"></div>
                </label>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-slate-800 gap-1 pb-1">
                {[
                  { id: 'poster-timer', label: 'Poster & Duration', icon: Clock },
                  { id: 'formatting', label: 'Transparency & Style', icon: Palette },
                  { id: 'location', label: 'Position & Dragging', icon: Move },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      style={{ cursor: 'pointer' }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#EAB308] text-slate-950 shadow-md'
                          : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* =====================================================================
                  TAB 1: POSTER & DURATION
              ===================================================================== */}
              {activeTab === 'poster-timer' && (
                <div className="space-y-5">
                  {/* Poster Image */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4 text-amber-400" />
                        <span>Launch Screen Poster Image</span>
                      </span>
                      {settings.imageUrl && (
                        <span className={`text-[11px] font-medium ${imageError ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {imageError ? 'Load Error' : 'Image Ready'}
                        </span>
                      )}
                    </label>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={settings.imageUrl}
                        onChange={(e) => {
                          setSettings((prev) => ({ ...prev, imageUrl: e.target.value }));
                          setImageError(false);
                        }}
                        onBlur={() => {
                          if (settings.imageUrl && !settings.imageUrl.startsWith('data:')) {
                            const normalized = normalizeImageUrl(settings.imageUrl);
                            setSettings((prev) => ({ ...prev, imageUrl: normalized }));
                          }
                        }}
                        placeholder="Paste image URL (Google Drive, direct link) or upload below"
                        style={{ cursor: 'text' }}
                        className="flex-1 px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-amber-500 cursor-text"
                      />

                      {/* File Upload Button */}
                      <label
                        style={{ cursor: 'pointer' }}
                        className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 cursor-pointer flex items-center gap-1.5 shrink-0 transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5 text-amber-400" />
                        <span>Upload File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Live Image Test & Preview */}
                    {settings.imageUrl && (
                      <div className="relative mt-2 rounded-xl overflow-hidden border border-slate-700 bg-black/90 max-h-40 flex items-center justify-center p-1">
                        <img
                          src={normalizeImageUrl(settings.imageUrl)}
                          alt="Poster Preview"
                          onError={() => setImageError(true)}
                          onLoad={() => setImageError(false)}
                          className="max-h-36 w-full object-contain rounded-lg select-none pointer-events-none"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-md text-[10px] font-bold backdrop-blur-md bg-black/80 border border-white/15">
                          {imageError ? (
                            <span className="text-rose-400 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> Image not loading from URL
                            </span>
                          ) : (
                            <span className="text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Image verified &amp; ready
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {imageError && (
                      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1">
                        <p className="font-bold flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>Image URL could not be displayed directly</span>
                        </p>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          Some websites block external hotlinking. <strong>Tip:</strong> If using Google Drive, make sure link sharing is set to <em>&quot;Anyone with the link&quot;</em>. Or click the <strong>Upload File</strong> button to upload the image directly from your device!
                        </p>
                      </div>
                    )}

                    {/* Quick Presets */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[11px] text-slate-400 mr-1">Presets:</span>
                      {[
                        {
                          name: 'Official Yellow Poster',
                          url: DEFAULT_LAUNCH_IMAGE,
                        },
                        {
                          name: 'Tech Circuit',
                          url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80',
                        },
                        {
                          name: 'Dark Nebula',
                          url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80',
                        },
                      ].map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => {
                            setSettings((prev) => ({ ...prev, imageUrl: preset.url }));
                            setImageError(false);
                          }}
                          style={{ cursor: 'pointer' }}
                          className="text-[11px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 cursor-pointer"
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Countdown Duration (Hours & Minutes) */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-white flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span>Countdown Duration</span>
                      </span>
                      <span className="text-[11px] font-mono text-amber-300">
                        {durationHours}h {durationMinutes}m remaining
                      </span>
                    </label>

                    <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <label className="block text-[11px] font-medium text-slate-300 mb-1">Hours</label>
                          <input
                            type="number"
                            min="0"
                            max="720"
                            value={durationHours}
                            onChange={(e) =>
                              handleApplyDuration(parseInt(e.target.value) || 0, durationMinutes)
                            }
                            style={{ cursor: 'text' }}
                            className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-base font-bold text-center cursor-text focus:outline-none focus:border-amber-500"
                          />
                        </div>
                        <span className="font-bold text-xl text-amber-400 mt-5">:</span>
                        <div className="flex-1">
                          <label className="block text-[11px] font-medium text-slate-300 mb-1">Minutes</label>
                          <input
                            type="number"
                            min="0"
                            max="59"
                            value={durationMinutes}
                            onChange={(e) =>
                              handleApplyDuration(durationHours, parseInt(e.target.value) || 0)
                            }
                            style={{ cursor: 'text' }}
                            className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-base font-bold text-center cursor-text focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>

                      {/* Quick Duration Preset Buttons */}
                      <div className="space-y-1.5 pt-1 border-t border-slate-700/60">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          Quick Presets:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            { label: '15 Min', h: 0, m: 15 },
                            { label: '30 Min', h: 0, m: 30 },
                            { label: '1 Hour', h: 1, m: 0 },
                            { label: '2 Hours', h: 2, m: 0 },
                            { label: '4 Hours', h: 4, m: 0 },
                            { label: '8 Hours', h: 8, m: 0 },
                            { label: '12 Hours', h: 12, m: 0 },
                            { label: '24 Hours', h: 24, m: 0 },
                            { label: '48 Hours', h: 48, m: 0 },
                          ].map((item) => {
                            const isCurrent = durationHours === item.h && durationMinutes === item.m;
                            return (
                              <button
                                key={item.label}
                                type="button"
                                onClick={() => handleApplyDuration(item.h, item.m)}
                                style={{ cursor: 'pointer' }}
                                className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer border ${
                                  isCurrent
                                    ? 'bg-[#EAB308] text-slate-950 border-[#EAB308]'
                                    : 'bg-slate-700/70 hover:bg-slate-700 text-slate-200 border-slate-600'
                                }`}
                              >
                                {item.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Title & Click Unlock */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1 cursor-default">
                        Overlay Headline
                      </label>
                      <input
                        type="text"
                        value={settings.title}
                        onChange={(e) => setSettings((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="Official Website Launch"
                        style={{ cursor: 'text' }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500 cursor-text"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-700/60">
                      <div className="pr-2">
                        <span className="text-xs font-semibold text-white block">5-Click Unlock</span>
                        <span className="text-[10px] text-slate-400">
                          Clicking 5 times on image reveals site
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.allowSecretClickUnlock}
                        onChange={(e) =>
                          setSettings((prev) => ({ ...prev, allowSecretClickUnlock: e.target.checked }))
                        }
                        style={{ cursor: 'pointer' }}
                        className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* =====================================================================
                  TAB 2: TRANSPARENCY & FORMATTING (USER REQUESTED)
              ===================================================================== */}
              {activeTab === 'formatting' && (
                <div className="space-y-5">
                  {/* Background Style / Transparency */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-bold text-white flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Palette className="w-4 h-4 text-amber-400" />
                        <span>Card Background &amp; Solid Dark Colors</span>
                      </span>
                      <span className="text-[11px] text-amber-400 font-mono">
                        {backgroundStyles.find((b) => b.id === settings.backgroundStyle)?.label}
                      </span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {backgroundStyles.map((item) => {
                        const isSelected = settings.backgroundStyle === item.id;
                        const isSolid = item.badge === 'SOLID DARK';
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() =>
                              setSettings((prev) => ({
                                ...prev,
                                backgroundStyle: item.id,
                                noOutlines: isSolid ? true : prev.noOutlines,
                              }))
                            }
                            style={{ cursor: 'pointer' }}
                            className={`p-3 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                              isSelected
                                ? 'bg-amber-500/15 border-[#EAB308] text-white shadow-md'
                                : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-300'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`w-3.5 h-3.5 rounded-md border border-slate-600 ${
                                    item.previewBg || 'bg-slate-800'
                                  }`}
                                />
                                <span className="text-xs font-bold text-white">{item.label}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                {item.badge && (
                                  <span
                                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                                      isSolid
                                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                        : 'bg-slate-700/80 text-slate-300'
                                    }`}
                                  >
                                    {item.badge}
                                  </span>
                                )}
                                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#EAB308]" />}
                              </div>
                            </div>
                            <p className="text-[10px] text-slate-400 pl-5.5">{item.desc}</p>
                          </button>
                        );
                      })}
                    </div>

                    {/* No Outlines & Borders Toggle */}
                    <div className="mt-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700 flex items-center justify-between">
                      <div className="space-y-0.5 pr-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">
                            No Outlines &amp; Borders (Clean Flat Solid)
                          </span>
                          {settings.noOutlines !== false && (
                            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              OUTLINES OFF
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Completely removes strokes, outlines, outer frames, and neon glows for clean, sharp flat solid blocks.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.noOutlines !== false}
                        onChange={(e) =>
                          setSettings((prev) => ({ ...prev, noOutlines: e.target.checked }))
                        }
                        style={{ cursor: 'pointer' }}
                        className="w-4 h-4 accent-amber-500 rounded cursor-pointer shrink-0"
                      />
                    </div>
                  </div>

                  {/* Color Theme */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Countdown Accent Color Theme</span>
                    </label>

                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {colorThemes.map((theme) => {
                        const isSelected = settings.colorTheme === theme.id;
                        return (
                          <button
                            key={theme.id}
                            type="button"
                            onClick={() =>
                              setSettings((prev) => ({ ...prev, colorTheme: theme.id }))
                            }
                            style={{ cursor: 'pointer' }}
                            className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                              isSelected
                                ? 'border-[#EAB308] bg-slate-800 scale-105 shadow-md'
                                : 'border-slate-700 bg-slate-800/50 hover:bg-slate-800'
                            }`}
                          >
                            <span className={`w-5 h-5 rounded-full ${theme.color} shadow-sm`} />
                            <span className="text-[10px] font-medium text-slate-300 text-center">
                              {theme.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Layout & Typography */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Time Format */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Format Layout</label>
                      <select
                        value={settings.timeFormat}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            timeFormat: e.target.value as CountdownTimeFormat,
                          }))
                        }
                        style={{ cursor: 'pointer' }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs cursor-pointer focus:outline-none focus:border-amber-500"
                      >
                        {timeFormats.map((tf) => (
                          <option key={tf.id} value={tf.id}>
                            {tf.label} ({tf.sample})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Font Size */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Digits Size</label>
                      <select
                        value={settings.fontSize}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            fontSize: e.target.value as CountdownFontSize,
                          }))
                        }
                        style={{ cursor: 'pointer' }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs cursor-pointer focus:outline-none focus:border-amber-500"
                      >
                        {fontSizes.map((fs) => (
                          <option key={fs.id} value={fs.id}>
                            {fs.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Font Family */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Typography Font</label>
                      <select
                        value={settings.fontFamily}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            fontFamily: e.target.value as CountdownFontFamily,
                          }))
                        }
                        style={{ cursor: 'pointer' }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs cursor-pointer focus:outline-none focus:border-amber-500"
                      >
                        {fontFamilies.map((ff) => (
                          <option key={ff.id} value={ff.id}>
                            {ff.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Elements Visibility Toggles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <label
                      style={{ cursor: 'pointer' }}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/70 text-xs cursor-pointer"
                    >
                      <span className="text-slate-300">Title Badge</span>
                      <input
                        type="checkbox"
                        checked={settings.showTitleBadge}
                        onChange={(e) =>
                          setSettings((prev) => ({ ...prev, showTitleBadge: e.target.checked }))
                        }
                        className="w-4 h-4 accent-amber-500 rounded"
                      />
                    </label>

                    <label
                      style={{ cursor: 'pointer' }}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/70 text-xs cursor-pointer"
                    >
                      <span className="text-slate-300">5-Click Hint Bar</span>
                      <input
                        type="checkbox"
                        checked={settings.showClickHint}
                        onChange={(e) =>
                          setSettings((prev) => ({ ...prev, showClickHint: e.target.checked }))
                        }
                        className="w-4 h-4 accent-amber-500 rounded"
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* =====================================================================
                  TAB 3: LOCATION & DRAGGING (USER REQUESTED)
              ===================================================================== */}
              {activeTab === 'location' && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5">
                    <Move className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-amber-300 block">Draggable Countdown Active:</strong>
                      <span className="text-slate-300">
                        You can grab and drag the countdown anywhere across the screen directly during launch view or preview. You can also anchor it using the presets below.
                      </span>
                    </div>
                  </div>

                  {settings.dragPosition && (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs">
                      <span className="text-slate-300">
                        Custom Drag Offset: X: {Math.round(settings.dragPosition.x)}px, Y:{' '}
                        {Math.round(settings.dragPosition.y)}px
                      </span>
                      <button
                        type="button"
                        onClick={() => setSettings((prev) => ({ ...prev, dragPosition: undefined }))}
                        style={{ cursor: 'pointer' }}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-amber-300 text-[11px] font-bold transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset Drag to Anchor</span>
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    {/* Position Picker Grid */}
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 grid grid-cols-3 grid-rows-3 gap-2 h-48">
                      {positions.map((pos) => {
                        const isSelected = settings.position === pos.id;
                        return (
                          <button
                            key={pos.id}
                            type="button"
                            onClick={() =>
                              setSettings((prev) => ({
                                ...prev,
                                position: pos.id,
                                dragPosition: undefined, // reset drag when selecting new anchor
                              }))
                            }
                            style={{ cursor: 'pointer' }}
                            className={`${pos.gridCol} rounded-lg text-[11px] font-bold p-1 flex items-center justify-center transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#EAB308] text-slate-950 shadow-[0_0_12px_rgba(234,179,8,0.5)] scale-105'
                                : 'bg-slate-700/60 hover:bg-slate-700 text-slate-300'
                            }`}
                          >
                            {pos.label}
                          </button>
                        );
                      })}
                    </div>

                    {/* Mini Visual Preview Card */}
                    <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-black h-48 flex items-center justify-center">
                      {settings.imageUrl ? (
                        <img
                          src={settings.imageUrl}
                          alt="Launch poster preview"
                          className="w-full h-full object-cover opacity-60"
                          onError={() => setImageError(true)}
                        />
                      ) : (
                        <div className="text-center p-4 text-slate-500 text-xs">
                          No poster image chosen yet
                        </div>
                      )}

                      {/* Position Pin Overlay */}
                      <div
                        className={`absolute p-2 transition-all duration-300 ${
                          settings.position === 'top-left'
                            ? 'top-2 left-2'
                            : settings.position === 'top-center'
                            ? 'top-2 left-1/2 -translate-x-1/2'
                            : settings.position === 'top-right'
                            ? 'top-2 right-2'
                            : settings.position === 'center'
                            ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                            : settings.position === 'bottom-left'
                            ? 'bottom-2 left-2'
                            : settings.position === 'bottom-right'
                            ? 'bottom-2 right-2'
                            : 'bottom-2 left-1/2 -translate-x-1/2'
                        }`}
                      >
                        <div className="px-2.5 py-1 rounded-lg bg-black/80 border border-amber-400 text-amber-300 text-[10px] font-mono font-bold shadow-lg flex items-center gap-1">
                          <Move className="w-3 h-3 text-amber-400" />
                          <span>Draggable</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ACTION BUTTONS (BOTTOM) */}
              <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onTriggerPreview}
                  style={{ cursor: 'pointer' }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 border border-slate-700"
                >
                  <Eye className="w-4 h-4 text-amber-400" />
                  <span>Test Fullscreen (Live Drag &amp; Preview)</span>
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    style={{ cursor: 'pointer' }}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveSettings}
                    style={{ cursor: 'pointer' }}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#EAB308] hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors cursor-pointer shadow-lg flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Save &amp; Apply Launch Now</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
