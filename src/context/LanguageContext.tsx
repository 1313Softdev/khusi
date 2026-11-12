'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'pa';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (en: string, pa?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (en: string) => en,
});

export function LanguageProvider({
  children,
  defaultLang = 'en',
}: {
  children: React.ReactNode;
  defaultLang?: Language;
}) {
  const [language, setLanguageState] = useState<Language>(defaultLang);

  useEffect(() => {
    const saved = localStorage.getItem('khushinder_lang') as Language;
    if (saved && (saved === 'en' || saved === 'pa')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('khushinder_lang', lang);
  };

  const toggleLanguage = () => {
    const next = language === 'en' ? 'pa' : 'en';
    setLanguage(next);
  };

  const t = (en: string, pa?: string) => {
    if (language === 'pa' && pa && pa.trim().length > 0) {
      return pa;
    }
    return en;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
