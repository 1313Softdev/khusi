'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Phone, Mail, MapPin, Calendar, Heart, ShieldCheck } from 'lucide-react';

interface FooterProps {
  settings?: {
    siteName?: string;
    siteDescription?: string;
    contactEmail?: string;
    contactPhone?: string;
    contactAddress?: string;
    whatsappNumber?: string;
    copyrightText?: string;
  };
  socialLinks?: Array<{
    platform: string;
    profileUrl: string;
    isActive: boolean;
  }>;
}

export default function Footer({ settings, socialLinks = [] }: FooterProps) {
  const { t } = useLanguage();

  return (
    <footer className="bg-navy-950 text-gray-300 border-t border-navy-800/80 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-navy-800/80">
          {/* Col 1: Identity & Bio summary */}
          <div className="lg:col-span-4 flex flex-col">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-saffron-500 to-amber-400 p-0.5 flex items-center justify-center font-bold text-navy-950 font-serif text-sm">
                KS
              </div>
              <div>
                <span className="text-white font-extrabold text-base sm:text-lg block font-serif">
                  {t('Sardar Khushinder Singh Jand Sahib', 'ਸਰਦਾਰ ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ ਜੰਡ ਸਾਹਿਬ')}
                </span>
                <span className="text-xs text-saffron-400 font-semibold block">
                  {t('Social Worker | Member, Punjab Sanjhivalta Dal', 'ਸਮਾਜ ਸੇਵੀ | ਮੈਂਬਰ, ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ')}
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
              {t(
                settings?.siteDescription || 'Dedicated to transparent public service, rural healthcare, youth empowerment, and preserving the social harmony of Punjab.',
                'ਪੰਜਾਬ ਦੀ ਬਿਹਤਰੀ, ਪੇਂਡੂ ਸਿਹਤ ਸੇਵਾਵਾਂ, ਨੌਜਵਾਨਾਂ ਦੀ ਸਿੱਖਿਆ ਅਤੇ ਭਾਈਚਾਰਕ ਏਕਤਾ ਨੂੰ ਸਮਰਪਿਤ ਸੁਹਿਰਦ ਸਮਾਜ ਸੇਵਾ।'
              )}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-navy-900 border border-saffron-500/20 text-xs text-saffron-300">
              <ShieldCheck className="w-4 h-4 text-saffron-400 shrink-0" />
              <span>{t('Member: Punjab Sanjhivalta Dal', 'ਮੈਂਬਰ: ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ')}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 font-serif border-b border-saffron-500/30 pb-2 inline-block">
              {t('Navigation', 'ਮੁੱਖ ਲਿੰਕ')}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-saffron-400 transition-colors">
                  {t('Home', 'ਮੁੱਖ ਪੰਨਾ')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-saffron-400 transition-colors">
                  {t('About Me & Biography', 'ਮੇਰੇ ਬਾਰੇ ਤੇ ਜੀਵਨ')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-saffron-400 transition-colors">
                  {t('News & Articles', 'ਖ਼ਬਰਾਂ ਤੇ ਲੇਖ')}
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:text-saffron-400 transition-colors">
                  {t('Social Work Gallery', 'ਸਮਾਜ ਸੇਵਾ ਗੈਲਰੀ')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-saffron-400 transition-colors">
                  {t('Contact Office', 'ਦਫ਼ਤਰੀ ਸੰਪਰਕ')}
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-gray-500 hover:text-gray-300 transition-colors">
                  {t('Admin Portal', 'ਐਡਮਿਨ ਲੌਗਇਨ')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Public Sabha / Meeting Hours */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 font-serif border-b border-saffron-500/30 pb-2 inline-block">
              {t('Public Sabha Hours', 'ਜਨਤਕ ਮੁਲਾਕਾਤ ਸਮਾਂ')}
            </h4>
            <div className="p-4 rounded-xl bg-navy-900/90 border border-navy-800 text-xs sm:text-sm space-y-2">
              <div className="flex items-center gap-2 text-saffron-400 font-bold">
                <Calendar className="w-4 h-4" />
                <span>{t('Every Sunday: 10:00 AM - 2:00 PM', 'ਹਰ ਐਤਵਾਰ: ਸਵੇਰੇ 10:00 ਤੋਂ ਦੁਪਹਿਰ 2:00 ਵਜੇ')}</span>
              </div>
              <p className="text-gray-300 text-xs leading-relaxed">
                {t(
                  'Open public meeting and grievance hearing held at Village Jand Sahib office for all citizens of Punjab.',
                  'ਪਿੰਡ ਜੰਡ ਸਾਹਿਬ ਦਫ਼ਤਰ ਵਿਖੇ ਕੋਈ ਵੀ ਸੱਜਣ ਆਪਣੀ ਸਮੱਸਿਆ ਜਾਂ ਵਿਚਾਰ ਸਾਂਝੇ ਕਰਨ ਲਈ ਸਿੱਧਾ ਮਿਲ ਸਕਦਾ ਹੈ।'
                )}
              </p>
            </div>
          </div>

          {/* Col 4: Contact & Social Handles */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 font-serif border-b border-saffron-500/30 pb-2 inline-block">
              {t('Contact Office', 'ਰਾਬਤਾ ਕਾਇਮ ਕਰੋ')}
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-saffron-400 shrink-0 mt-0.5" />
                <span>{settings?.contactAddress || 'Village Jand Sahib, Punjab, India'}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-saffron-400 shrink-0" />
                <a href={`tel:${settings?.contactPhone || '+919876543210'}`} className="hover:text-white">
                  {settings?.contactPhone || '+91 98765 43210'}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-saffron-400 shrink-0" />
                <a href={`mailto:${settings?.contactEmail || 'contact@khushindersingh.org'}`} className="hover:text-white">
                  {settings?.contactEmail || 'contact@khushindersingh.org'}
                </a>
              </li>
            </ul>

            {/* Social Media Link Buttons */}
            <div className="flex items-center gap-2.5 mt-5">
              <a
                href="https://www.facebook.com/khushindersingh.sandhu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-navy-800 hover:bg-[#1877F2] text-white flex items-center justify-center transition-all shadow"
                title="Facebook"
              >
                <span className="font-bold text-xs">f</span>
              </a>
              <a
                href="https://www.instagram.com/khushinder_singh"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-navy-800 hover:bg-gradient-to-tr hover:from-yellow-500 hover:to-pink-500 text-white flex items-center justify-center transition-all shadow"
                title="Instagram"
              >
                <span className="font-bold text-xs">ig</span>
              </a>
              <a
                href="https://youtube.com/@KhushinderSinghJandSahib"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-navy-800 hover:bg-red-600 text-white flex items-center justify-center transition-all shadow"
                title="YouTube"
              >
                <span className="font-bold text-xs">yt</span>
              </a>
              <a
                href="https://x.com/KhushinderJand"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-navy-800 hover:bg-black text-white flex items-center justify-center transition-all shadow"
                title="X (Twitter)"
              >
                <span className="font-bold text-xs">𝕏</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>
            {settings?.copyrightText || '© 2026 Sardar Khushinder Singh Jand Sahib. Member, Punjab Sanjhivalta Dal. All Rights Reserved.'}
          </p>
          <div className="flex items-center gap-1 text-gray-400">
            <span>{t('Devoted to Sarbat Da Bhala', 'ਸਰਬੱਤ ਦੇ ਭਲੇ ਨੂੰ ਸਮਰਪਿਤ')}</span>
            <Heart className="w-3.5 h-3.5 text-saffron-500 fill-saffron-500" />
            <span>Punjab</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
