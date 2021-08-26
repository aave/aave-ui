import React, { ReactNode, useContext, useState } from 'react';
import { IntlProvider } from 'react-intl';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/en';
import 'dayjs/locale/es';
import 'dayjs/locale/fr';
import 'dayjs/locale/it';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/zh';
import 'dayjs/locale/ja';
import 'dayjs/locale/tr';
import 'dayjs/locale/vi';
import 'dayjs/locale/ko';
import 'dayjs/locale/pt';

import { getCurrentLocale } from './get-language';
import { SupportedLanguage } from './constants';

import enMessages from '../../translations/en.json';
import esMessages from '../../translations/es.json';
import frMessages from '../../translations/fr.json';
import itMessages from '../../translations/it.json';
import cnMessages from '../../translations/cn.json';
import jaMessages from '../../translations/ja.json';
import trMessages from '../../translations/tr.json';
import viMessages from '../../translations/vi.json';
import koMessages from '../../translations/ko.json';
import ptMessages from '../../translations/pt.json';

dayjs.extend(localizedFormat);

interface LanguageContextProps {
  currentLangSlug: SupportedLanguage;
  changeLang: (langCode: SupportedLanguage) => void;
}

const messages: {
  [key: string]: {};
} = {
  en: enMessages,
  es: esMessages,
  fr: frMessages,
  it: itMessages,
  zh: cnMessages,
  ja: jaMessages,
  tr: trMessages,
  vi: viMessages,
  ko: koMessages,
  pt: ptMessages,
};

const LanguageContext = React.createContext({} as LanguageContextProps);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLang, setCurrentLangSlug] = useState<SupportedLanguage>(getCurrentLocale());

  const changeLang = (langCode: SupportedLanguage) => {
    localStorage.setItem('locale', langCode);
    setCurrentLangSlug(langCode);
  };

  dayjs.locale(currentLang === 'zh' ? 'zh-cn' : currentLang);

  return (
    <LanguageContext.Provider value={{ currentLangSlug: currentLang, changeLang }}>
      <IntlProvider
        locale={currentLang === 'zh' ? 'zh-cn' : currentLang}
        messages={messages[currentLang]}
        defaultLocale="en"
      >
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
}

export const useLanguageContext = () => useContext(LanguageContext);
