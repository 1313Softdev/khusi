'use client';

import React from 'react';

export interface AdvertisementData {
  id: number;
  title: string;
  placement: string;
  imageUrl?: string | null;
  destinationUrl?: string | null;
  htmlCode?: string | null;
  isActive: boolean;
}

interface AdBannerProps {
  ads?: AdvertisementData[];
  placement: 'homepage' | 'between_blogs' | 'blog_sidebar' | 'before_article' | 'after_article' | 'footer';
  className?: string;
}

export default function AdBanner({ ads = [], placement, className = '' }: AdBannerProps) {
  const activeAd = ads.find((a) => a.placement === placement && a.isActive);

  if (!activeAd) return null;

  return (
    <div className={`my-8 overflow-hidden rounded-2xl border border-navy-800 bg-navy-950/80 shadow-md ${className}`}>
      {/* If Custom HTML/AdSense provided */}
      {activeAd.htmlCode && activeAd.htmlCode.trim().length > 0 ? (
        <div
          className="w-full flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: activeAd.htmlCode }}
        />
      ) : activeAd.imageUrl ? (
        <a
          href={activeAd.destinationUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative w-full group overflow-hidden"
        >
          <img
            src={activeAd.imageUrl}
            alt={activeAd.title}
            className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-black/60 text-gray-300 backdrop-blur-sm">
            Public Notice
          </div>
        </a>
      ) : null}
    </div>
  );
}
