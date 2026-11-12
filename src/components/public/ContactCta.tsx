'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Phone, Mail, MapPin, ArrowRight, MessageSquareText } from 'lucide-react';

interface ContactCtaProps {
  settings?: {
    contactPhone?: string;
    contactEmail?: string;
    contactAddress?: string;
    whatsappNumber?: string;
  };
}

export default function ContactCta({ settings }: ContactCtaProps) {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 border-t border-navy-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(245,158,11,0.1),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 lg:p-16 border border-saffron-500/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-xs uppercase tracking-widest font-extrabold text-saffron-400 bg-saffron-500/10 px-3.5 py-1 rounded-full border border-saffron-500/20 inline-block mb-3">
              {t('Open Public Communication', 'ਖੁੱਲ੍ਹਾ ਜਨਤਕ ਰਾਬਤਾ')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-serif mb-4 leading-tight">
              {t('Have a Community Issue or Seeking Assistance?', 'ਕੀ ਤੁਹਾਡੇ ਪਿੰਡ ਜਾਂ ਇਲਾਕੇ ਵਿੱਚ ਕੋਈ ਸਾਂਝੀ ਮੁਸ਼ਕਲ ਹੈ?')}
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
              {t(
                'Sardar Khushinder Singh is dedicated to standing shoulder-to-shoulder with the people of Punjab. Write your grievance or request an in-person meeting at Jand Sahib office.',
                'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ ਹਮੇਸ਼ਾ ਲੋਕਾਂ ਦੇ ਦੁੱਖ-ਸੁੱਖ ਵਿੱਚ ਨਾਲ ਖੜ੍ਹੇ ਹਨ। ਆਪਣਾ ਸੁਨੇਹਾ ਭੇਜੋ ਜਾਂ ਜੰਡ ਸਾਹਿਬ ਦਫ਼ਤਰ ਵਿਖੇ ਮੁਲਾਕਾਤ ਕਰੋ।'
              )}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-saffron-400 shrink-0" />
                <span>{settings?.contactAddress || 'Village Jand Sahib, Punjab'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-saffron-400 shrink-0" />
                <span>{settings?.contactPhone || '+91 98765 43210'}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Link
              href="/contact"
              className="btn-shimmer flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-saffron-500 via-amber-500 to-gold-500 hover:from-saffron-600 hover:to-amber-600 text-navy-950 font-extrabold text-sm sm:text-base shadow-glow-saffron transform hover:-translate-y-0.5 transition-all"
            >
              <span>{t('Write to Khushinder Singh', 'ਸਿੱਧਾ ਸੁਨੇਹਾ ਭੇਜੋ')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`https://wa.me/${(settings?.whatsappNumber || '919876543210').replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all"
            >
              <MessageSquareText className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
