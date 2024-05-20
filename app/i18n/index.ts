/* eslint-disable max-len */

import i18n from 'i18next';
import english from './en';
import SupportedLanguages, {
  defaultFallbackLanguage,
} from './i18n-SupportedLanguages';

i18n.init({
  lng: 'en',
  compatibilityJSON: 'v3',
  fallbackLng: defaultFallbackLanguage,
  resources: {
    [SupportedLanguages.en]: {
      translation: english,
    },
  },
});

export const { changeLanguage } = i18n;

export default i18n.t;
