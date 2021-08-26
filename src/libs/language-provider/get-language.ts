import queryString from 'query-string';

import { SUPPORTED_LANGUAGES, SupportedLanguage } from './constants';

interface RouteParams {
  locale?: string;
}

export const getCurrentLocale = (): SupportedLanguage => {
  let { locale: urlLocale }: RouteParams = queryString.parse(document.location.search);
  if (urlLocale?.length) {
    urlLocale = urlLocale.slice(0, 2);
  }
  const storedLocale = localStorage.getItem('locale');
  if (urlLocale && urlLocale !== storedLocale) {
    localStorage.setItem('locale', urlLocale);
  }
  const browserLang = (navigator.languages && navigator.languages[0]) || navigator.language;
  const browserLangShort = (browserLang && browserLang.slice(0, 2)) || '';
  const userPreferredLanguages = [urlLocale, storedLocale, browserLang, browserLangShort, 'en'];

  for (let i = 0; i < userPreferredLanguages.length; i += 1) {
    let preferredLanguage = userPreferredLanguages[i];
    if (preferredLanguage && SUPPORTED_LANGUAGES.includes(preferredLanguage as SupportedLanguage)) {
      return userPreferredLanguages[i] as SupportedLanguage;
    }
  }

  return SupportedLanguage.en;
};
