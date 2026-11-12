'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, HeartPulse, Trophy, Trees, ArrowRight, Quote } from 'lucide-react';

export interface BiographyData {
  fullNameEn: string;
  fullNamePa: string;
  titleEn: string;
  titlePa: string;
  identityEn: string;
  identityPa: string;
  profileImageUrl?: string | null;
  shortBioEn: string;
  shortBioPa: string;
  journeyEn?: string;
  journeyPa?: string;
  quoteEn?: string | null;
  quotePa?: string | null;
}

interface AboutIntroProps {
  bio?: BiographyData | null;
}

export default function AboutIntro({ bio }: AboutIntroProps) {
  const { t } = useLanguage();

  if (!bio) return null;

  const impactMetrics = [
    {
      icon: HeartPulse,
      value: '15,000+',
      labelEn: 'Free Health Consultations',
      labelPa: 'ਮਰੀਜ਼ਾਂ ਦੀ ਮੁਫ਼ਤ ਜਾਂਚ',
    },
    {
      icon: Trophy,
      value: '8+',
      labelEn: 'Village Sports Gyms & Tournaments',
      labelPa: 'ਪੇਂਡੂ ਓਪਨ ਜਿੰਮ ਤੇ ਖੇਡ ਮੇਲੇ',
    },
    {
      icon: Trees,
      value: '25,000+',
      labelEn: 'Native Trees Planted',
      labelPa: 'ਲਗਾਏ ਗਏ ਰਵਾਇਤੀ ਰੁੱਖ',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Profile Card with Golden Border */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-2 border-saffron-500/40 bg-navy-900 group">
              <img
                src={bio.profileImageUrl || '/images/khushinder-hero.png'}
                alt={bio.fullNameEn}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-80" />

              {/* Bottom Identity Pill */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-navy-900/90 backdrop-blur-md border border-saffron-500/30 text-center">
                <span className="text-sm font-bold text-white font-serif block">
                  {t(bio.fullNameEn, bio.fullNamePa)}
                </span>
                <span className="text-xs text-saffron-400 font-semibold block mt-0.5">
                  {t(bio.titleEn, bio.titlePa)}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Service Pillars */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-saffron-500/10 border border-saffron-500/30 text-saffron-400 text-xs font-extrabold uppercase tracking-widest self-start mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('Grounded Social Worker & Advocate', 'ਜ਼ਮੀਨੀ ਸਮਾਜ ਸੇਵੀ ਤੇ ਆਗੂ')}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-serif leading-tight mb-6">
              {t('A Life Dedicated to Public Harmony & Rural Progress', 'ਲੋਕ ਭਲਾਈ, ਭਾਈਚਾਰਕ ਸਾਂਝ ਅਤੇ ਪੰਜਾਬ ਦੇ ਵਿਕਾਸ ਨੂੰ ਸਮਰਪਿਤ ਜੀਵਨ')}
            </h2>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6 font-normal">
              {t(bio.shortBioEn, bio.shortBioPa)}
            </p>

            {/* Respectful Quote Banner */}
            {(bio.quoteEn || bio.quotePa) && (
              <div className="p-4 sm:p-5 rounded-2xl bg-navy-950/70 border-l-4 border-saffron-500 border-y border-r border-navy-800 my-4 flex items-start gap-3">
                <Quote className="w-6 h-6 text-saffron-400 shrink-0 mt-0.5 opacity-80" />
                <p className="text-xs sm:text-sm text-saffron-200/95 italic font-medium leading-relaxed">
                  {t(bio.quoteEn || '', bio.quotePa || '')}
                </p>
              </div>
            )}

            {/* Impact Numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
              {impactMetrics.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-navy-950/50 border border-navy-800 hover:border-saffron-500/40 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-saffron-400 mb-2" />
                    <span className="text-xl sm:text-2xl font-extrabold text-white block">
                      {item.value}
                    </span>
                    <span className="text-xs text-gray-400 mt-1 block">
                      {t(item.labelEn, item.labelPa)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Read More Link */}
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-saffron-500 hover:bg-saffron-600 text-navy-950 font-bold text-sm shadow-glow-saffron transition-all transform hover:-translate-y-0.5"
              >
                <span>{t('Read Complete Biography & Vision', 'ਮੇਰੀ ਸਮਾਜ ਸੇਵਾ ਤੇ ਸੋਚ ਬਾਰੇ ਵਿਸਥਾਰ ਨਾਲ ਪੜ੍ਹੋ')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
