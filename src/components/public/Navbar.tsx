'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Menu, X, Phone, Globe, ChevronRight } from 'lucide-react';

interface NavbarProps {
  settings?: {
    siteName?: string;
    contactPhone?: string;
    whatsappNumber?: string;
    mainLogoUrl?: string;
  };
}

export default function Navbar({ settings }: NavbarProps) {
  const pathname = usePathname();
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', labelEn: 'Home', labelPa: 'ਮੁੱਖ ਪੰਨਾ' },
    { href: '/about', labelEn: 'About Me', labelPa: 'ਮੇਰੇ ਬਾਰੇ' },
    { href: '/blog', labelEn: 'News & Blogs', labelPa: 'ਖ਼ਬਰਾਂ ਤੇ ਬਲਾਗ' },
    { href: '/#gallery', labelEn: 'Gallery', labelPa: 'ਲੋਕ ਸੇਵਾ ਗੈਲਰੀ' },
    { href: '/contact', labelEn: 'Contact', labelPa: 'ਸੰਪਰਕ' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy-900/95 backdrop-blur-md shadow-lg border-b border-navy-800/80 py-2.5'
          : 'bg-navy-950/80 backdrop-blur-sm border-b border-white/10 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-saffron-600 via-gold-500 to-amber-300 p-0.5 shadow-glow-saffron flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-navy-950 rounded-full flex items-center justify-center font-bold text-saffron-400 text-sm sm:text-base tracking-wider font-serif">
                KS
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-extrabold text-base sm:text-lg tracking-tight group-hover:text-saffron-400 transition-colors">
                {t('S. Khushinder Singh', 'ਸ. ਖੁਸ਼ਇੰਦਰ ਸਿੰਘ')}
              </span>
              <span className="text-xs text-saffron-400/90 font-medium tracking-wide">
                {t('Jand Sahib | Punjab Sanjhivalta Dal', 'ਜੰਡ ਸਾਹਿਬ | ਪੰਜਾਬ ਸਾਂਝੀਵਾਲਤਾ ਦਲ')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-saffron-500 text-navy-950 shadow-md font-bold'
                      : 'text-gray-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {t(link.labelEn, link.labelPa)}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Language Toggle & Contact CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Bilingual Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy-800/80 hover:bg-navy-700 text-xs font-bold text-gray-200 border border-navy-600/50 hover:border-saffron-500/50 transition-all"
              title="Toggle Punjabi / English"
            >
              <Globe className="w-3.5 h-3.5 text-saffron-400" />
              <span>{language === 'en' ? 'ਪੰਜਾਬੀ' : 'English'}</span>
            </button>

            {/* Direct Phone / Contact Pill */}
            <a
              href={`tel:${settings?.contactPhone || '+919876543210'}`}
              className="flex items-center gap-2 bg-gradient-to-r from-saffron-600 to-amber-500 hover:from-saffron-500 hover:to-amber-400 text-navy-950 font-bold px-4 py-1.5 rounded-full text-xs shadow-md transition-all transform hover:scale-[1.02]"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{settings?.contactPhone || '+91 98765 43210'}</span>
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded-full bg-navy-800 text-xs font-bold text-saffron-400 border border-navy-700"
            >
              {language === 'en' ? 'ਪੰਜਾਬੀ' : 'EN'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-navy-800 text-gray-200 hover:text-white border border-navy-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-950/98 border-b border-navy-800/90 px-4 pt-4 pb-6 space-y-3 animate-in fade-in duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-saffron-500 text-navy-950 font-bold'
                      : 'text-gray-200 hover:bg-white/5'
                  }`}
                >
                  <span>{t(link.labelEn, link.labelPa)}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-navy-800/80 flex flex-col gap-2">
            <a
              href={`tel:${settings?.contactPhone || '+919876543210'}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-saffron-500 text-navy-950 font-bold text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>{t('Call Office', 'ਦਫ਼ਤਰ ਫ਼ੋਨ ਕਰੋ')}: {settings?.contactPhone || '+91 98765 43210'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
