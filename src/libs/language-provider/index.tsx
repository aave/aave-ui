import React, { ReactNode, useContext, useEffect, useState } from 'react';
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
import en from '../../translations/en.json';

dayjs.extend(localizedFormat);

interface LanguageContextProps {
  currentLangSlug: SupportedLanguage;
  changeLang: (langCode: SupportedLanguage) => void;
}

const messageLoader = {
  en: () => import('../../translations/en.json'),
  es: () => import('../../translations/es.json'),
  fr: () => import('../../translations/fr.json'),
  it: () => import('../../translations/it.json'),
  zh: () => import('../../translations/cn.json'),
  ja: () => import('../../translations/ja.json'),
  tr: () => import('../../translations/tr.json'),
  vi: () => import('../../translations/vi.json'),
  ko: () => import('../../translations/ko.json'),
  pt: () => import('../../translations/pt.json'),
};

const LanguageContext = React.createContext({} as LanguageContextProps);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLang, setCurrentLangSlug] = useState<SupportedLanguage>(getCurrentLocale());
  const [messages, setMessages] = useState<{ [key: string]: {} }>({ en });

  const changeLang = (langCode: SupportedLanguage) => {
    localStorage.setItem('locale', langCode);
    setCurrentLangSlug(langCode);
  };

  dayjs.locale(currentLang === 'zh' ? 'zh-cn' : currentLang);

  useEffect(() => {
    if (!messages[currentLang])
      messageLoader[currentLang]?.().then((messages) =>
        setMessages((cache: any) => ({ ...cache, [currentLang]: messages }))
      );
  }, [currentLang]);

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
