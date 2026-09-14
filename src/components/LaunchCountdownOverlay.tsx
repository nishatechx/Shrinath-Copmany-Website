import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LaunchSettings,
  CountdownPosition,
  CountdownBackgroundStyle,
  CountdownColorTheme,
  CountdownFontSize,
  CountdownFontFamily,
  CountdownTimeFormat,
} from './LaunchManagerModal';
import {
  normalizeImageUrl,
  DEFAULT_LAUNCH_IMAGE,
  getGoogleDriveId,
} from '../utils/imageUrl';

interface LaunchCountdownOverlayProps {
  settings: LaunchSettings;
  onUnlock?: () => void;
  isForcedPreview?: boolean;
  onClosePreview?: () => void;
  onOpenManager?: () => void;
  onUpdateDragPosition?: (pos: { x: number; y: number }) => void;
}

export const LaunchCountdownOverlay: React.FC<LaunchCountdownOverlayProps> = ({
  settings,
  onUnlock,
  isForcedPreview = false,
  onClosePreview,
  onOpenManager,
  onUpdateDragPosition,
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    totalMs: number;
    isPast: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalMs: 0,
    isPast: false,
  });

  const [clicks, setClicks] = useState<number>(0);
  const [isBlasting, setIsBlasting] = useState<boolean>(false);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const blastTriggeredRef = useRef<boolean>(false);

  // =========================================================================
  // IMAGE URL HANDLING & MULTI-TIER FALLBACK ENGINE
  // =========================================================================
  const [imgSrc, setImgSrc] = useState<string>(() => {
    return normalizeImageUrl(settings.imageUrl) || DEFAULT_LAUNCH_IMAGE;
  });
  const [retryAttempt, setRetryAttempt] = useState<number>(0);

  useEffect(() => {
    const normalized = normalizeImageUrl(settings.imageUrl);
    setImgSrc(normalized || DEFAULT_LAUNCH_IMAGE);
    setRetryAttempt(0);
  }, [settings.imageUrl]);

  const handleImageError = () => {
    // If it was a Google Drive URL, attempt alternate CDN endpoints
    const driveId = getGoogleDriveId(settings.imageUrl);
    if (driveId && retryAttempt === 0) {
      setRetryAttempt(1);
      setImgSrc(`https://drive.google.com/thumbnail?id=${driveId}&sz=w2560`);
      return;
    }
    if (driveId && retryAttempt === 1) {
      setRetryAttempt(2);
      setImgSrc(`https://drive.google.com/uc?export=view&id=${driveId}`);
      return;
    }

    // Otherwise, fallback safely to default official poster so the screen is never blank
    if (imgSrc !== DEFAULT_LAUNCH_IMAGE) {
      console.warn('Custom launch image could not be loaded, using official poster.');
      setImgSrc(DEFAULT_LAUNCH_IMAGE);
    }
  };

  // Play launch fanfare audio
  const playLaunchFanfare = useCallback(() => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
        gain.gain.setValueAtTime(0.001, ctx.currentTime + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + i * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.12);
        osc.stop(ctx.currentTime + i * 0.12 + 0.85);
      });
    } catch {
      // ignore audio error
    }
  }, []);

  // Multi-cannon full-screen celebratory confetti blast
  const fireBlastAnimation = useCallback(() => {
    if (blastTriggeredRef.current) return;
    blastTriggeredRef.current = true;
    setIsBlasting(true);
    playLaunchFanfare();

    const colors = ['#EAB308', '#F59E0B', '#FFD21F', '#3B82F6', '#10B981', '#FFFFFF', '#EC4899'];

    const count = 300;
    const defaults = {
      origin: { y: 0.6 },
      colors,
      zIndex: 100002,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    const end = Date.now() + 2500;
    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors,
        zIndex: 100002,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors,
        zIndex: 100002,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setTimeout(() => {
      setIsRevealed(true);
      if (onUnlock) {
        onUnlock();
      }
    }, 1800);
  }, [playLaunchFanfare, onUnlock]);

  // Live countdown timer calculation
  useEffect(() => {
    const calculateTime = () => {
      const now = Date.now();
      const diff = settings.targetTimestamp - now;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          totalMs: 0,
          isPast: true,
        });

        if (!blastTriggeredRef.current && !isForcedPreview) {
          fireBlastAnimation();
        }
        return;
      }

      const totalHours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: 0,
        hours: totalHours,
        minutes,
        seconds,
        totalMs: diff,
        isPast: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [settings.targetTimestamp, fireBlastAnimation, isForcedPreview]);

  // Handle secret 5-click screen unlock (no visible counter labels)
  const handleScreenClick = () => {
    if (!settings.allowSecretClickUnlock) return;

    const newClickCount = clicks + 1;
    setClicks(newClickCount);

    if (newClickCount >= 5) {
      fireBlastAnimation();
    }
  };

  if (isRevealed && !isForcedPreview) {
    return null;
  }

  // Positioning classes mapping based on user setting
  const getPositionClasses = (pos: CountdownPosition): string => {
    switch (pos) {
      case 'top-left':
        return 'top-12 left-4 sm:left-10 items-start text-left';
      case 'top-center':
        return 'top-12 left-1/2 -translate-x-1/2 items-center text-center';
      case 'top-right':
        return 'top-12 right-4 sm:right-10 items-end text-right';
      case 'center':
        return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center text-center';
      case 'bottom-left':
        return 'bottom-10 left-4 sm:left-10 items-start text-left';
      case 'bottom-right':
        return 'bottom-10 right-4 sm:right-10 items-end text-right';
      case 'bottom-center':
      default:
        return 'bottom-10 left-1/2 -translate-x-1/2 items-center text-center';
    }
  };

  // Theme color styles resolver
  const getColorThemeStyles = (theme: CountdownColorTheme) => {
    switch (theme) {
      case 'white':
        return {
          primaryText: 'text-white',
          accentText: 'text-slate-100',
          labelText: 'text-slate-200',
          glow: 'drop-shadow-[0_0_20px_rgba(255,255,255,0.7)]',
        };
      case 'cyan':
        return {
          primaryText: 'text-white',
          accentText: 'text-cyan-300',
          labelText: 'text-cyan-200',
          glow: 'drop-shadow-[0_0_20px_rgba(56,189,248,0.7)]',
        };
      case 'emerald':
        return {
          primaryText: 'text-white',
          accentText: 'text-emerald-300',
          labelText: 'text-emerald-200',
          glow: 'drop-shadow-[0_0_20px_rgba(16,185,129,0.7)]',
        };
      case 'coral':
        return {
          primaryText: 'text-white',
          accentText: 'text-rose-300',
          labelText: 'text-rose-200',
          glow: 'drop-shadow-[0_0_20px_rgba(244,63,94,0.7)]',
        };
      case 'purple':
        return {
          primaryText: 'text-white',
          accentText: 'text-purple-300',
          labelText: 'text-purple-200',
          glow: 'drop-shadow-[0_0_20px_rgba(192,132,252,0.7)]',
        };
      case 'gold':
      default:
        return {
          primaryText: 'text-white',
          accentText: 'text-[#FFD21F]',
          labelText: 'text-amber-300',
          glow: 'drop-shadow-[0_0_20px_rgba(234,179,8,0.7)]',
        };
    }
  };

  const themeStyles = getColorThemeStyles(settings.colorTheme || 'gold');

  // Solid dark and outline detection
  const isSolidDark =
    settings.backgroundStyle === 'solid-black' ||
    settings.backgroundStyle === 'solid-slate' ||
    settings.backgroundStyle === 'solid-zinc' ||
    settings.backgroundStyle === 'solid-carbon';

  const noOutlines =
    settings.noOutlines !== false && (settings.noOutlines === true || isSolidDark);

  // Background style classes resolver (solid dark, transparent, etc.)
  const getContainerBgClasses = (style: CountdownBackgroundStyle) => {
    switch (style) {
      case 'solid-black':
        return 'bg-black border-0 outline-none ring-0 shadow-[0_25px_60px_rgba(0,0,0,0.95)] rounded-2xl sm:rounded-3xl p-3.5 sm:p-6';
      case 'solid-slate':
        return 'bg-[#0f172a] border-0 outline-none ring-0 shadow-[0_25px_60px_rgba(0,0,0,0.95)] rounded-2xl sm:rounded-3xl p-3.5 sm:p-6';
      case 'solid-zinc':
        return 'bg-[#09090b] border-0 outline-none ring-0 shadow-[0_25px_60px_rgba(0,0,0,0.95)] rounded-2xl sm:rounded-3xl p-3.5 sm:p-6';
      case 'solid-carbon':
        return 'bg-[#18181b] border-0 outline-none ring-0 shadow-[0_25px_60px_rgba(0,0,0,0.95)] rounded-2xl sm:rounded-3xl p-3.5 sm:p-6';
      case 'glass':
        return noOutlines
          ? 'bg-black/35 backdrop-blur-md border-0 outline-none ring-0 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] p-3 sm:p-5'
          : 'bg-black/30 backdrop-blur-md border border-white/20 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] p-3 sm:p-5';
      case 'translucent':
        return noOutlines
          ? 'bg-slate-950/70 backdrop-blur-sm border-0 outline-none ring-0 rounded-3xl shadow-2xl p-3 sm:p-5'
          : 'bg-slate-950/65 backdrop-blur-sm border border-slate-700/60 rounded-3xl shadow-2xl p-3 sm:p-5';
      case 'neon-border':
        return noOutlines
          ? 'bg-black/40 backdrop-blur-sm border-0 outline-none ring-0 rounded-3xl shadow-2xl p-3 sm:p-5'
          : 'bg-black/35 backdrop-blur-sm border-2 border-amber-400/50 rounded-3xl shadow-[0_0_35px_rgba(0,0,0,0.8)] p-3 sm:p-5';
      case 'minimal':
      case 'transparent':
      default:
        return 'bg-transparent border-0 outline-none ring-0 shadow-none p-1 sm:p-2';
    }
  };

  const getDigitCardBgClasses = (style: CountdownBackgroundStyle) => {
    switch (style) {
      case 'solid-black':
        return 'bg-[#141414] border-0 outline-none ring-0 rounded-xl sm:rounded-2xl shadow-none';
      case 'solid-slate':
        return 'bg-[#1e293b] border-0 outline-none ring-0 rounded-xl sm:rounded-2xl shadow-none';
      case 'solid-zinc':
        return 'bg-[#18181b] border-0 outline-none ring-0 rounded-xl sm:rounded-2xl shadow-none';
      case 'solid-carbon':
        return 'bg-[#27272a] border-0 outline-none ring-0 rounded-xl sm:rounded-2xl shadow-none';
      case 'glass':
        return noOutlines
          ? 'bg-white/5 border-0 outline-none ring-0 rounded-2xl backdrop-blur-sm'
          : 'bg-white/5 border border-white/15 rounded-2xl backdrop-blur-sm';
      case 'translucent':
        return noOutlines
          ? 'bg-slate-900/80 border-0 outline-none ring-0 rounded-2xl'
          : 'bg-slate-900/80 border border-slate-700/80 rounded-2xl';
      case 'neon-border':
        return noOutlines
          ? 'bg-black/40 border-0 outline-none ring-0 rounded-2xl'
          : 'bg-black/40 border border-amber-400/40 rounded-2xl';
      case 'minimal':
      case 'transparent':
      default:
        return 'bg-transparent border-0 outline-none ring-0 shadow-none';
    }
  };

  // Font typography classes resolver
  const getFontFamilyClass = (family: CountdownFontFamily) => {
    switch (family) {
      case 'sans':
        return 'font-sans font-black tracking-tight';
      case 'serif':
        return 'font-serif font-bold';
      case 'mono':
      default:
        return 'font-mono font-black';
    }
  };

  // Font size classes resolver
  const getFontSizeClasses = (size: CountdownFontSize) => {
    switch (size) {
      case 'sm':
        return {
          digit: 'text-2xl sm:text-3xl',
          label: 'text-[10px] sm:text-[11px]',
          colon: 'text-2xl sm:text-3xl',
        };
      case 'md':
        return {
          digit: 'text-3xl sm:text-5xl',
          label: 'text-xs sm:text-sm',
          colon: 'text-3xl sm:text-5xl',
        };
      case 'xl':
        return {
          digit: 'text-5xl sm:text-7xl md:text-8xl',
          label: 'text-sm sm:text-base font-bold',
          colon: 'text-5xl sm:text-7xl md:text-8xl',
        };
      case 'lg':
      default:
        return {
          digit: 'text-4xl sm:text-6xl md:text-7xl',
          label: 'text-xs sm:text-sm font-bold',
          colon: 'text-4xl sm:text-6xl md:text-7xl',
        };
    }
  };

  const sizeStyles = getFontSizeClasses(settings.fontSize || 'lg');
  const fontClass = getFontFamilyClass(settings.fontFamily || 'mono');
  const isTransparent = (settings.backgroundStyle || 'transparent') === 'transparent' || settings.backgroundStyle === 'minimal';

  // Units list: Pure Hours, Minutes, Seconds (no dates or days)
  const unitCards = [
    { key: 'hours', label: 'Hours', val: String(timeLeft.hours).padStart(2, '0') },
    { key: 'minutes', label: 'Minutes', val: String(timeLeft.minutes).padStart(2, '0') },
    { key: 'seconds', label: 'Seconds', val: String(timeLeft.seconds).padStart(2, '0') },
  ];

  return (
    <AnimatePresence>
      {!isRevealed && (
        <motion.div
          key="launch-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleScreenClick}
          className="fixed inset-0 z-[99999] w-screen h-screen bg-black text-white flex flex-col justify-center items-center select-none overflow-hidden cursor-default"
          style={{ touchAction: 'manipulation' }}
        >
          {/* =========================================================================
              1. FULL-SCREEN LAUNCH POSTER IMAGE (100% CLEAN - NO DARKENING OVERLAYS)
          ========================================================================= */}
          <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black flex items-center justify-center pointer-events-none select-none">
            <img
              src={imgSrc}
              alt="Launch Poster"
              onError={handleImageError}
              className="w-full h-full object-cover object-center pointer-events-none select-none transition-opacity duration-500"
              referrerPolicy="no-referrer"
              loading="eager"
            />
          </div>

          {/* =========================================================================
              2. ADMIN EMERGENCY CONTROLS (ONLY IN PREVIEW MODE OR DOUBLE-CLICK)
          ========================================================================= */}
          {/* Subtle exit button ONLY shown when admin is previewing */}
          {isForcedPreview && onClosePreview && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClosePreview();
              }}
              className="fixed top-4 right-4 z-50 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white/90 hover:text-white text-xs font-bold transition-all shadow-lg flex items-center gap-1.5 border border-white/20 backdrop-blur-md cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Exit Preview</span>
            </button>
          )}

          {/* =========================================================================
              3. CELEBRATION BLAST BANNER (TRIGGERS WHEN COUNTDOWN ENDS OR 5 CLICKS)
          ========================================================================= */}
          <AnimatePresence>
            {isBlasting && (
              <motion.div
                initial={{ scale: 0.7, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 1.1, opacity: 0 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                className="absolute inset-0 z-40 flex items-center justify-center px-4 pointer-events-none"
              >
                <div className="bg-slate-950/95 border-2 border-[#EAB308] rounded-3xl p-8 sm:p-12 text-center max-w-xl shadow-[0_0_80px_rgba(234,179,8,0.5)] backdrop-blur-xl">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 mb-6 shadow-xl animate-bounce">
                    <Sparkles className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase mb-3">
                    🚀 IT&apos;S LAUNCH TIME!
                  </h2>
                  <p className="text-amber-300 font-bold text-lg sm:text-xl mb-4">
                    Welcome to Shrinath IT Solutions
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed max-w-md mx-auto">
                    Opening the complete official portal now...
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* =========================================================================
              4. DRAGGABLE LIVE COUNTDOWN (IMAGE & COUNT DOWN ONLY)
          ========================================================================= */}
          <motion.div
            drag
            dragMomentum={false}
            dragElastic={0.05}
            onDragEnd={(_, info) => {
              const newOffset = {
                x: (settings.dragPosition?.x || 0) + info.offset.x,
                y: (settings.dragPosition?.y || 0) + info.offset.y,
              };
              if (onUpdateDragPosition) {
                onUpdateDragPosition(newOffset);
              }
            }}
            initial={false}
            animate={{
              x: settings.dragPosition?.x || 0,
              y: settings.dragPosition?.y || 0,
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`absolute z-20 flex flex-col pointer-events-auto max-w-[95vw] sm:max-w-2xl cursor-grab active:cursor-grabbing select-none ${getPositionClasses(
              settings.position
            )}`}
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={() => onOpenManager?.()}
            title="Drag to reposition anywhere"
          >
            {/* Main Countdown Container */}
            <div
              className={`flex flex-col items-center transition-all ${getContainerBgClasses(
                settings.backgroundStyle || 'transparent'
              )}`}
            >
              {/* =====================================================================
                  LAYOUT 1: STANDARD (BOXED DIGITS WITH LABELS)
              ===================================================================== */}
              {(!settings.timeFormat || settings.timeFormat === 'standard') && (
                <div className="grid grid-cols-3 gap-2.5 sm:gap-4 w-full">
                  {unitCards.map((unit, idx) => (
                    <div
                      key={unit.key}
                      className={`p-2.5 sm:p-4 text-center flex flex-col items-center justify-center ${getDigitCardBgClasses(
                        settings.backgroundStyle || 'transparent'
                      )}`}
                    >
                      <span
                        className={`${sizeStyles.digit} ${fontClass} tracking-tight ${
                          idx % 2 === 1 ? themeStyles.accentText : themeStyles.primaryText
                        } ${
                          isSolidDark || noOutlines
                            ? 'drop-shadow-none'
                            : isTransparent
                            ? 'drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]'
                            : themeStyles.glow
                        }`}
                      >
                        {unit.val}
                      </span>
                      <span
                        className={`block ${sizeStyles.label} font-bold uppercase tracking-widest mt-1 ${
                          isSolidDark ? 'text-slate-400' : themeStyles.labelText
                        } ${isTransparent && !isSolidDark ? 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]' : ''}`}
                      >
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* =====================================================================
                  LAYOUT 2: DIGITAL CLOCK (02 : 45 : 12)
              ===================================================================== */}
              {settings.timeFormat === 'colon' && (
                <div className="flex items-center justify-center gap-2 sm:gap-4 py-1">
                  {unitCards.map((unit, idx) => (
                    <React.Fragment key={unit.key}>
                      <div className="flex flex-col items-center">
                        <span
                          className={`${sizeStyles.digit} ${fontClass} ${
                            idx % 2 === 1 ? themeStyles.accentText : themeStyles.primaryText
                          } ${
                            isSolidDark || noOutlines
                              ? 'drop-shadow-none'
                              : isTransparent
                              ? 'drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]'
                              : themeStyles.glow
                          }`}
                        >
                          {unit.val}
                        </span>
                        <span
                          className={`text-[10px] sm:text-xs uppercase font-bold tracking-widest mt-1 ${
                            isSolidDark ? 'text-slate-400' : themeStyles.labelText
                          } ${isTransparent && !isSolidDark ? 'drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]' : ''}`}
                        >
                          {unit.label}
                        </span>
                      </div>
                      {idx < unitCards.length - 1 && (
                        <span
                          className={`font-mono font-black ${sizeStyles.colon} ${themeStyles.accentText} pb-4 ${
                            isSolidDark || noOutlines
                              ? 'drop-shadow-none'
                              : isTransparent
                              ? 'drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]'
                              : ''
                          }`}
                        >
                          :
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}

              {/* =====================================================================
                  LAYOUT 3: COMPACT BADGE (02d : 45h : 12m : 30s)
              ===================================================================== */}
              {settings.timeFormat === 'compact' && (
                <div className="flex items-center justify-center gap-2 sm:gap-3 py-1 flex-wrap">
                  {unitCards.map((unit) => (
                    <div
                      key={unit.key}
                      className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 border-0 outline-none ring-0 ${
                        isSolidDark
                          ? 'bg-[#141414] shadow-md'
                          : isTransparent
                          ? 'bg-black/40 backdrop-blur-sm shadow-lg'
                          : getDigitCardBgClasses(settings.backgroundStyle || 'transparent')
                      }`}
                    >
                      <span
                        className={`${sizeStyles.digit} ${fontClass} ${themeStyles.accentText} ${
                          isSolidDark || noOutlines
                            ? 'drop-shadow-none'
                            : 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]'
                        }`}
                      >
                        {unit.val}
                      </span>
                      <span
                        className={`text-[11px] font-bold uppercase ${
                          isSolidDark ? 'text-slate-400' : 'text-slate-200'
                        } ${isSolidDark || noOutlines ? '' : 'drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]'}`}
                      >
                        {unit.label.charAt(0).toLowerCase()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
