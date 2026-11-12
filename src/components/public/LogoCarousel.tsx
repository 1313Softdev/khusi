'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export interface LogoSlideData {
  id: number;
  title: string;
  imageUrl: string;
  displayOrder: number;
  isActive: boolean;
}

interface LogoCarouselProps {
  logos?: LogoSlideData[];
  rotationInterval?: number; // seconds
  effect?: 'rotate' | 'fade' | 'slide';
  isEnabled?: boolean;
}

export default function LogoCarousel({
  logos = [],
  rotationInterval = 4,
  effect = 'fade',
  isEnabled = true,
}: LogoCarouselProps) {
  const { t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);

  const activeLogos = logos.filter((l) => l.isActive);

  useEffect(() => {
    if (!isEnabled || activeLogos.length <= 1) return;
    const intervalMs = (rotationInterval || 4) * 1000;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % activeLogos.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [activeLogos.length, rotationInterval, isEnabled]);

  if (!isEnabled || activeLogos.length === 0) return null;

  return (
    <section className="bg-navy-900 border-y border-navy-800/80 py-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Label / Heading */}
          <div className="text-center lg:text-left shrink-0">
            <span className="text-xs uppercase tracking-widest font-bold text-saffron-400 bg-saffron-500/10 px-3 py-1 rounded-full border border-saffron-500/20">
              {t('Official Insignias & Organizations', 'ਅਧਿਕਾਰਤ ਨਿਸ਼ਾਨ ਤੇ ਜਥੇਬੰਦੀਆਂ')}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-1.5 font-serif">
              {t('Punjab Sanjhivalta Dal & Community Missions', 'ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ ਅਤੇ ਲੋਕ ਭਲਾਈ ਮਿਸ਼ਨ')}
            </h3>
          </div>

          {/* Animated Centerpiece Display */}
          <div className="flex items-center justify-center relative w-full max-w-xl h-24 sm:h-28 overflow-hidden rounded-2xl bg-navy-950/60 border border-navy-800 px-6">
            {activeLogos.map((logo, index) => {
              const isCurrent = index === activeIdx;

              // Animation style depending on effect configuration
              let transformClass = 'opacity-0 pointer-events-none absolute';
              if (isCurrent) {
                if (effect === 'rotate') {
                  transformClass = 'opacity-100 scale-100 rotate-0 transition-all duration-700';
                } else if (effect === 'slide') {
                  transformClass = 'opacity-100 translate-x-0 transition-all duration-700';
                } else {
                  transformClass = 'opacity-100 scale-100 transition-opacity duration-700';
                }
              } else {
                if (effect === 'rotate') {
                  transformClass = 'opacity-0 scale-90 -rotate-12 transition-all duration-700 absolute';
                } else if (effect === 'slide') {
                  transformClass = 'opacity-0 -translate-x-full transition-all duration-700 absolute';
                } else {
                  transformClass = 'opacity-0 transition-opacity duration-700 absolute';
                }
              }

              return (
                <div
                  key={logo.id}
                  className={`flex items-center justify-center gap-4 ${transformClass}`}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 relative shrink-0">
                    <img
                      src={logo.imageUrl}
                      alt={logo.title}
                      className="w-full h-full object-contain filter drop-shadow"
                    />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-white font-bold text-sm sm:text-base">
                      {logo.title}
                    </span>
                    <span className="text-xs text-saffron-400 font-medium">
                      {t('Verified Public Association', 'ਪ੍ਰਮਾਣਿਤ ਜਨਤਕ ਸੇਵਾ')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Thumbnail Indicator Dots */}
          <div className="flex items-center gap-2 shrink-0">
            {activeLogos.map((l, idx) => (
              <button
                key={l.id}
                onClick={() => setActiveIdx(idx)}
                className={`transition-all duration-300 rounded-full ${
                  activeIdx === idx
                    ? 'w-7 h-2 bg-saffron-500 shadow-glow-saffron'
                    : 'w-2 h-2 bg-navy-700 hover:bg-navy-600'
                }`}
                title={l.title}
                aria-label={l.title}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
