'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, HeartHandshake, Eye, Award, Users, Compass, BookOpen, Quote } from 'lucide-react';

interface AboutClientViewProps {
  bio: any;
}

export default function AboutClientView({ bio }: AboutClientViewProps) {
  const { t } = useLanguage();

  if (!bio) return null;

  return (
    <div className="py-12">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron-500/10 border border-saffron-500/30 text-saffron-400 text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>{t(bio.identityEn || 'Social Worker | Member of Punjab Sanjhivalta Dal', bio.identityPa || 'ਸਮਾਜ ਸੇਵੀ | ਮੈਂਬਰ, ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-serif mb-4">
            {t(bio.fullNameEn, bio.fullNamePa)}
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            {t(bio.shortBioEn, bio.shortBioPa)}
          </p>
        </div>
      </div>

      {/* Main Narrative Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Profile Card on Left */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="rounded-3xl overflow-hidden border-2 border-saffron-500/40 bg-navy-900 shadow-2xl relative">
              <img
                src={bio.profileImageUrl || '/images/khushinder-hero.png'}
                alt={bio.fullNameEn}
                className="w-full h-auto object-cover"
              />
              <div className="p-6 bg-gradient-to-t from-navy-950 via-navy-900 to-navy-900/90 text-center">
                <h3 className="text-xl font-bold text-white font-serif">
                  {t(bio.fullNameEn, bio.fullNamePa)}
                </h3>
                <p className="text-xs text-saffron-400 font-semibold mt-1">
                  {t(bio.titleEn, bio.titlePa)}
                </p>
                <div className="mt-4 pt-4 border-t border-navy-800 text-xs text-gray-400">
                  <span>📍 {t('Jand Sahib, Punjab, India', 'ਪਿੰਡ ਜੰਡ ਸਾਹਿਬ, ਪੰਜਾਬ, ਭਾਰਤ')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Biography Content on Right */}
          <div className="lg:col-span-7 space-y-12">
            {/* 1. Personal Introduction */}
            <div className="bg-navy-900/60 p-8 rounded-3xl border border-navy-800">
              <div className="flex items-center gap-3 mb-4 text-saffron-400">
                <BookOpen className="w-5 h-5" />
                <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
                  {t('Personal Introduction', 'ਨਿੱਜੀ ਜਾਣ-ਪਛਾਣ ਤੇ ਪਿਛੋਕੜ')}
                </h3>
              </div>
              <div className="text-gray-300 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line font-normal">
                {t(bio.fullBioEn, bio.fullBioPa)}
              </div>
            </div>

            {/* 2. Social Work Journey */}
            <div className="bg-navy-900/60 p-8 rounded-3xl border border-navy-800">
              <div className="flex items-center gap-3 mb-4 text-saffron-400">
                <Compass className="w-5 h-5" />
                <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
                  {t('Social Work Journey', 'ਸਮਾਜ ਸੇਵਾ ਦਾ ਸਫ਼ਰ')}
                </h3>
              </div>
              <div className="text-gray-300 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line font-normal">
                {t(bio.journeyEn, bio.journeyPa)}
              </div>
            </div>

            {/* 3. Public Service Activities */}
            <div className="bg-navy-900/60 p-8 rounded-3xl border border-navy-800">
              <div className="flex items-center gap-3 mb-4 text-saffron-400">
                <HeartHandshake className="w-5 h-5" />
                <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
                  {t('Public Service & Community Initiatives', 'ਲੋਕ ਭਲਾਈ ਤੇ ਜਨਤਕ ਸੇਵਾ ਕਾਰਜ')}
                </h3>
              </div>
              <div className="text-gray-300 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line font-normal">
                {t(bio.publicServiceEn, bio.publicServicePa)}
              </div>
            </div>

            {/* 4. Vision for Punjab */}
            <div id="vision" className="bg-gradient-to-br from-navy-900 via-navy-850 to-navy-900 p-8 rounded-3xl border border-saffron-500/30">
              <div className="flex items-center gap-3 mb-4 text-saffron-400">
                <Award className="w-5 h-5" />
                <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
                  {t('Vision for Punjab', 'ਪੰਜਾਬ ਲਈ ਸੁਪਨਾ ਤੇ ਸੋਚ')}
                </h3>
              </div>
              <div className="text-gray-200 text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium">
                {t(bio.visionEn, bio.visionPa)}
              </div>
            </div>

            {/* 5. Organization Membership */}
            <div className="bg-navy-900/60 p-8 rounded-3xl border border-navy-800">
              <div className="flex items-center gap-3 mb-4 text-saffron-400">
                <Users className="w-5 h-5" />
                <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
                  {t('Punjab Sanjhivalta Dal Membership', 'ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ ਨਾਲ ਜੁੜਾਅ')}
                </h3>
              </div>
              <div className="text-gray-300 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line font-normal">
                {t(bio.organizationEn, bio.organizationPa)}
              </div>
            </div>

            {/* Respectful Quote Banner */}
            {(bio.quoteEn || bio.quotePa) && (
              <div className="p-6 rounded-2xl bg-navy-950 border-l-4 border-saffron-500 border-y border-r border-navy-800 flex items-start gap-4">
                <Quote className="w-7 h-7 text-saffron-400 shrink-0 opacity-80" />
                <p className="text-sm sm:text-base text-saffron-200 italic font-medium leading-relaxed">
                  {t(bio.quoteEn || '', bio.quotePa || '')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
