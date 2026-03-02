import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  // Get initial language from localStorage or default to 'malayalam'
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    return savedLanguage || 'malayalam';
  });

  // Save language preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedLanguage', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'malayalam' ? 'english' : 'malayalam');
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    isEnglish: language === 'english',
    isMalayalam: language === 'malayalam',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
