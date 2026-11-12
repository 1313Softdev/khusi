'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, HeartHandshake, PhoneCall } from 'lucide-react';

export interface HeroSlideData {
  id: number;
  titleEn: string;
  titlePa: string;
  subtitleEn?: string | null;
  subtitlePa?: string | null;
  descriptionEn?: string | null;
  descriptionPa?: string | null;
  imageUrl: string;
  videoUrl?: string | null;
  btn1TextEn?: string | null;
  btn1TextPa?: string | null;
  btn1Url?: string | null;
  btn2TextEn?: string | null;
  btn2TextPa?: string | null;
  btn2Url?: string | null;
  overlayOpacity?: number;
}

interface HeroSliderProps {
  slides?: HeroSlideData[];
}

export default function HeroSlider({ slides = [] }: HeroSliderProps) {
  const { t } = useLanguage();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Fallback if no slides configured
  const activeSlides = slides.length > 0 ? slides : [
    {
      id: 1,
      titleEn: 'Dedicated to People, Grounded in Service',
      titlePa: 'ਲੋਕ ਸੇਵਾ ਨੂੰ ਸਮਰਪਿਤ, ਜ਼ਮੀਨ ਨਾਲ ਜੁੜੀ ਆਵਾਜ਼',
      subtitleEn: 'Sardar Khushinder Singh Jand Sahib',
      subtitlePa: 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ',
      descriptionEn: 'Working relentlessly for rural empowerment, youth development, and farmer welfare across Punjab. Member of Punjab Sanjhivalta Dal.',
      descriptionPa: 'ਪੰਜਾਬ ਦੇ ਪਿੰਡਾਂ, ਨੌਜਵਾਨੀ ਅਤੇ ਕਿਸਾਨੀ ਦੀ ਬਿਹਤਰੀ ਲਈ ਦਿਨ-ਰਾਤ ਤਤਪਰ। ਮੈਂਬਰ, ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ।',
      imageUrl: '/images/hero-1.jpg',
      btn1TextEn: 'About Me',
      btn1TextPa: 'ਮੇਰੇ ਬਾਰੇ',
      btn1Url: '/about',
      btn2TextEn: 'Contact Me',
      btn2TextPa: 'ਸੰਪਰਕ ਕਰੋ',
      btn2Url: '/contact',
      overlayOpacity: 0.55,
    }
  ];

  useEffect(() => {
    if (activeSlides.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % activeSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [activeSlides.length, isPaused]);

  const slide = activeSlides[currentIdx] || activeSlides[0];

  return (
    <section
      className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-navy-950 pt-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {slide.videoUrl ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-opacity duration-1000"
            src={slide.videoUrl}
          />
        ) : (
          <div
            className="w-full h-full bg-cover bg-center transition-all duration-1000 transform scale-105"
            style={{ backgroundImage: `url(${slide.imageUrl || '/images/hero-1.jpg'})` }}
          />
        )}

        {/* Dynamic Dark Navy / Saffron Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-900/60"
          style={{ opacity: slide.overlayOpacity !== undefined ? Math.max(0.3, slide.overlayOpacity) : 0.6 }}
        />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-navy-950/40 to-navy-950" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Verified Identity Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900/90 border border-saffron-500/40 text-saffron-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-6 shadow-glow-saffron backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
          <ShieldCheck className="w-4 h-4 text-saffron-400" />
          <span>{t(slide.subtitleEn || 'Social Worker | Member of Punjab Sanjhivalta Dal', slide.subtitlePa || 'ਸਮਾਜ ਸੇਵੀ | ਮੈਂਬਰ, ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ')}</span>
        </div>

        {/* Prominent Name Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight sm:leading-none mb-4 font-serif">
          {t('Sardar Khushinder Singh Jand Sahib', 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ')}
        </h1>

        {/* Dynamic Slide Tagline */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-saffron-300 max-w-3xl mb-6">
          {t(slide.titleEn, slide.titlePa)}
        </h2>

        {/* Dynamic Slide Description */}
        <p className="text-base sm:text-lg md:text-xl text-gray-200/90 max-w-2xl font-normal leading-relaxed mb-10">
          {t(
            slide.descriptionEn || 'Dedicated to transparent public service, rural healthcare, youth empowerment, and the progress of Punjab.',
            slide.descriptionPa || 'ਪੰਜਾਬ ਦੇ ਪਿੰਡਾਂ, ਨੌਜਵਾਨੀ ਅਤੇ ਕਿਸਾਨੀ ਦੀ ਬਿਹਤਰੀ ਲਈ ਦਿਨ-ਰਾਤ ਤਤਪਰ। ਮੈਂਬਰ, ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ।'
          )}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href={slide.btn1Url || '/about'}
            className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-saffron-500 to-amber-500 hover:from-saffron-600 hover:to-amber-600 text-navy-950 font-extrabold text-sm sm:text-base shadow-glow-saffron transform hover:-translate-y-0.5 transition-all"
          >
            <span>{t(slide.btn1TextEn || 'About Me', slide.btn1TextPa || 'ਮੇਰੇ ਬਾਰੇ')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/blog"
            className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-navy-800/80 hover:bg-navy-700/90 text-white font-bold text-sm sm:text-base border border-white/20 hover:border-saffron-400/60 backdrop-blur-sm transition-all"
          >
            <HeartHandshake className="w-4 h-4 text-saffron-400" />
            <span>{t('Read Latest Updates', 'ਤਾਜ਼ਾ ਖ਼ਬਰਾਂ ਪੜ੍ਹੋ')}</span>
          </Link>

          <Link
            href={slide.btn2Url || '/contact'}
            className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-100 font-semibold text-sm sm:text-base border border-white/10 hover:border-white/30 backdrop-blur-sm transition-all"
          >
            <PhoneCall className="w-4 h-4 text-amber-300" />
            <span>{t(slide.btn2TextEn || 'Contact Me', slide.btn2TextPa || 'ਸੰਪਰਕ ਕਰੋ')}</span>
          </Link>
        </div>
      </div>

      {/* Slider Left / Right Navigation Controls */}
      {activeSlides.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIdx((prev) => (prev - 1 + activeSlides.length) % activeSlides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-navy-900/60 hover:bg-navy-800 text-white border border-white/10 flex items-center justify-center transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setCurrentIdx((prev) => (prev + 1) % activeSlides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-navy-900/60 hover:bg-navy-800 text-white border border-white/10 flex items-center justify-center transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 z-20 flex items-center gap-2">
            {activeSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                className={`transition-all duration-300 rounded-full ${
                  currentIdx === idx ? 'w-8 h-2.5 bg-saffron-500' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
