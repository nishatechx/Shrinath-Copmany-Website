import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import { PREMIUM_EASE, useMotionSettings } from '../hooks/useMotionConfig';

export interface ClientLogoItem {
  id: string;
  name: string;
  category: string;
  logoUrl: string;
  badge?: string;
}

export const CLIENT_LOGOS: ClientLogoItem[] = [
  {
    id: 'vatsgulma-live',
    name: 'Vatsgulma Live',
    category: 'Digital News & Media',
    logoUrl:
      'https://yt3.googleusercontent.com/Vcft0eTPGLG6uSOjhDsOgh-NSWSoWt7EFoUl8oasWyAyIXrob7zqzN1rXLaKh8OomUJYiLPQAmM=s900-c-k-c0x00ffffff-no-rj',
    badge: 'Media',
  },
  {
    id: 'samay-computers',
    name: 'Samay Computers',
    category: 'IT Solutions & Hardware',
    logoUrl:
      'https://whitelabel-content.s3.ap-south-1.amazonaws.com/14603/logo/web-logo/1591272623.jpg',
    badge: 'IT Partner',
  },
  {
    id: 'shivansh-digital',
    name: 'Shivansh Digital Services',
    category: 'Citizen & Digital Services',
    logoUrl:
      'https://blogger.googleusercontent.com/img/a/AVvXsEigh_qHRKb60fHjJQY-IDKn66ZSv3LbpBOxXZ43TapCdCHe68dmYE_CwZUHPGIZVX_Wi3O94RWE_OcoJwxfScjO_k_LTNDEmsgw64b2gjDOKvPiXHgUCvYav8rUxMG_3LF9VG78FCGIQ3_KQujsdFiA1WhceawfslBPhPJyZ07DcZiTVxuM6RowlkTkl44',
    badge: 'Digital E-Seva',
  },
  {
    id: 'shantidoot-movies',
    name: 'Shantidoot Movies',
    category: 'Film & Media Productions',
    logoUrl:
      'https://yt3.googleusercontent.com/31A3adVbIte3V9MhQJLROisWnj4uZIc9hxVwmjDW686ODqynoL5LlZ3lDG_z7BWAq5iR05YCPw=s160-c-k-c0x00ffffff-no-rj',
    badge: 'Entertainment',
  },
  {
    id: 'vithai-abhyasika',
    name: 'Vithai Abhyasika',
    category: 'Study Center & Library',
    logoUrl:
      'https://blogger.googleusercontent.com/img/a/AVvXsEgfadOsYPSTSDQMWz_DvvXqVDwamcXaD1W_zxyXlsZHeQLp-0uQBxtbklMYBpzquKjEe_Dm75CjHMSa-vCttpjCcl3g9ch3nQB5hW264waIh1gBFoIxUerunyGxrjPgU9noSwYNQqsKN3IWxC8R7qqfz4BwYj9S3QeppXoUb-Md1uvkY0oS5clHWfV1bHk=s1600',
    badge: 'Education',
  },
  {
    id: 'zp-school-ichori',
    name: 'ZP School Ichori',
    category: 'Government Primary School',
    logoUrl:
      'https://www.zpschoolichori.in/wp-content/uploads/2026/01/ZP-School-Ichori-Logo.png',
    badge: 'Public School',
  },
  {
    id: 'pnks-salon',
    name: "PNK's Salon",
    category: 'Beauty, Wellness & Grooming',
    logoUrl:
      'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlFgaV2_55iltWEWJ80EEpql2LFWsS4OvQCJtRm_Zc8hQ4ZiHRJHL1JfkdmMJ9qCbps2iyNJe5ySbV9BEqq1k6WuaUDgs_xu2dLwF6ku6-3M_tB3RJzRm75byueKPP_aWatAPsI9vSP7bK4=w243-h304-n-k-no-nu',
    badge: 'Lifestyle',
  },
  {
    id: 'samarth-academy',
    name: "Joshi Sir's Samarth Academy",
    category: 'Coaching & Academic Institute',
    logoUrl:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhJ0_Ouy2-by-wGaW_3o7gzaFz_NdLI9aLbR0LKqSbbHH3tIvi8oRY06iplLrO25ffA26qtYN0P4IjD6BAs8_Yx4S1PFdiIWOebYcInx2o1bhv2TURK-SMfG32LQdJ9xH5urwkWECjqvF94porSYcLC6z696d1Q0kZ6UC8uulBUbxJTtF3BYm9EC7SL23w/s1600/448250372_494997203030591_5472623113248746932_n.jpg',
    badge: 'Academy',
  },
  {
    id: 'bhavana-computer-centre',
    name: 'Bhavana Computer Centre',
    category: 'Technical Education & Training',
    logoUrl:
      'https://lh3.googleusercontent.com/a-/ALV-UjV1q5E-oIyU9m3T-YZugNh3jZrnTV3KcxUlvfHiOTJNNooJc1fv=s100-p-k-no-mo',
    badge: 'Training',
  },
  {
    id: 'gajanan-dhamane',
    name: 'Gajanan Dhamane',
    category: 'Business & Professional Services',
    logoUrl:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj-rD1Sgi9MAQ_CDc-zAuhLJ6WO1hrTLWaGuXW4119d9-OmN5ZX04Elu7s2zBATYkYsiiSG9XiDzJIs0pAkeslvK9ALDBOVnhh5cT7EAKL0PEfmkllMd8a2b-BBlMdyBkulCjd_lYVVUbZ9NiQBZ0uhmtqJx9p-9r6aA_3kF00c04cwyOzmDtFpLmklwEg/s1600/gajanan%20dhamane.png',
    badge: 'Enterprise',
  },
];

interface LogoCardProps {
  client: ClientLogoItem;
  index: number;
}

const LogoCard: React.FC<LogoCardProps> = ({ client }) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div
      id={`trusted-client-${client.id}`}
      className="group flex items-center gap-2.5 px-3 py-1.5 mx-1 sm:mx-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-500/80 transition-all duration-200 select-none cursor-pointer flex-shrink-0"
    >
      {/* Logo container with fallback */}
      <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-white p-0.5 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
        {!imageFailed ? (
          <img
            src={client.logoUrl}
            alt={`${client.name} logo`}
            className="w-full h-full object-contain rounded-xs"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-800 font-bold text-[9px]">
            {client.name.substring(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      {/* Client Name */}
      <span className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-white transition-colors whitespace-nowrap">
        {client.name}
      </span>
    </div>
  );
};

export const TrustedBySection: React.FC = () => {
  const { reducedMotion } = useMotionSettings();
  const [isPaused, setIsPaused] = useState(false);

  // Triple repeat ensures an ultra-seamless infinite marquee loop with CSS translateX(-33.333%)
  const triplicatedLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section
      id="trusted-by-section"
      aria-label="Trusted by Brands"
      className="relative w-full bg-[#0f172a] border-y border-slate-800/90 py-2 sm:py-2.5 overflow-hidden shadow-inner flex items-center"
    >
      <div className="w-full flex items-center">
        {/* Minimal News Ticker Title Badge */}
        <div className="relative z-20 flex-shrink-0 flex items-center pl-3 sm:pl-5 lg:pl-8 pr-2 sm:pr-4 bg-[#0f172a]">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/90 border border-slate-700/80 text-slate-300 select-none">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider whitespace-nowrap text-slate-300">
              Trusted by
            </span>
          </div>
        </div>

        {/* Scrolling Logos Carousel Container */}
        <div
          className="relative flex-1 overflow-hidden py-0.5"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Left Gradient Shadow */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 z-10 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent" />
          {/* Right Gradient Shadow */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 z-10 bg-gradient-to-l from-[#0f172a] via-[#0f172a]/90 to-transparent" />

          {/* Continuous Scrolling Track */}
          <div
            className={`flex w-max items-center ${
              reducedMotion ? 'overflow-x-auto scrollbar-none px-4' : 'animate-marquee'
            }`}
            style={
              !reducedMotion && isPaused
                ? { animationPlayState: 'paused' }
                : undefined
            }
          >
            {triplicatedLogos.map((client, idx) => (
              <LogoCard
                key={`${client.id}-${idx}`}
                client={client}
                index={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
