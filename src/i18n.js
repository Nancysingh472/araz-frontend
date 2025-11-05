// src/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend'; // To load translation files

i18n
  .use(HttpBackend) // Load translations via HTTP
  .use(initReactI18next) // Bind react-i18next to i18next
  .init({
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    debug: true, // Enable debug to see logs in console
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Path to translation files
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
