import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importaremos los archivos de traducción aquí
import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  es: {
    translation: translationES
  }
};

i18n
  .use(LanguageDetector) // Detecta el idioma del navegador
  .use(initReactI18next) // Conecta i18next con React
  .init({
    resources,
    fallbackLng: 'en', // Idioma de respaldo si el actual falla
    interpolation: {
      escapeValue: false // React ya protege contra XSS
    }
  });

export default i18n;