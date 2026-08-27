import React from 'react';
import { useSiteContent } from '../context/SiteContentContext';

export const CLIENT_LOGOS = [
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

export const ClientsMarquee: React.FC = () => {
  const { content } = useSiteContent();
  const rawLogos = content.clientLogos?.length ? content.clientLogos : CLIENT_LOGOS;
  // Duplicate for seamless infinite marquee scroll
  const marqueeLogos = [...rawLogos, ...rawLogos, ...rawLogos];

  return (
    <div 
      id="clients" 
      className="w-full bg-slate-950/95 border-t border-slate-800/90 py-3 relative overflow-hidden select-none z-20 backdrop-blur-md flex items-center"
    >
      {/* Starting "TRUSTED BY" Badge anchored at the start of the logos bar */}
      <div className="shrink-0 z-20 pl-4 sm:pl-8 pr-4 sm:pr-6 py-1.5 flex items-center gap-2 bg-slate-950/95 border-r border-slate-800 shadow-[10px_0_20px_rgba(2,6,23,0.9)]">
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
        <span className="text-xs sm:text-xs font-bold text-white uppercase tracking-widest font-mono whitespace-nowrap">
          TRUSTED BY
        </span>
      </div>

      {/* Infinite scrolling marquee track directly attached to hero base */}
      <div className="flex w-full overflow-hidden relative">
        {/* Side gradient fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-r from-slate-950/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-950 via-slate-950/90 to-transparent z-10 pointer-events-none" />

        <div className="flex items-center gap-4 sm:gap-6 animate-marquee whitespace-nowrap pl-4">
          {marqueeLogos.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/50 transition-all duration-300 hover:scale-105 shrink-0 group shadow-sm"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                <img
                  src={client.url}
                  alt={client.name}
                  className="w-full h-full object-contain filter group-hover:contrast-105 transition-all"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `<div class="w-full h-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs rounded">${client.name.substring(0, 2).toUpperCase()}</div>`;
                    }
                  }}
                />
              </div>
              <span className="text-slate-200 text-xs sm:text-sm font-semibold tracking-tight group-hover:text-sky-300 transition-colors whitespace-nowrap">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

