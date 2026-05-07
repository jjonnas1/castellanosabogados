'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { es } from '../lib/i18n/dictionaries/es';
import { en } from '../lib/i18n/dictionaries/en';
import { fr } from '../lib/i18n/dictionaries/fr';
import { it } from '../lib/i18n/dictionaries/it';

type Language = 'es' | 'en' | 'fr' | 'it';
type Dictionary = typeof es;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const dictionaries = { es, en, fr, it };

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    const savedLang = localStorage.getItem('app-language') as Language;
    if (savedLang && ['es', 'en', 'fr', 'it'].includes(savedLang)) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('app-language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t: dictionaries[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
