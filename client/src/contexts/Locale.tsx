import dayjs from 'dayjs';
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { LOCALE_KEY } from '../constants/storageKeys';
import defaultLocale from '../i18n/locale/en.json';
import { DEFAULT_LOCALE_CODE, getLocaleCollection, t } from '../utilities/locale';

interface LocaleContextProps {
  changeLocale: (localeCode: string) => void;
  localeCode: string;
  t: (id: string, values?: string[], defaultText?: string) => string;
}

interface LocaleProviderProps {
  children: ReactNode;
}

export const LocaleContext = createContext<LocaleContextProps>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changeLocale: () => {},
  localeCode: DEFAULT_LOCALE_CODE,
  t,
});

export const useLocale = (): LocaleContextProps => useContext(LocaleContext);

export const LocaleProvider = ({ children }: LocaleProviderProps): ReturnType<typeof LocaleContext.Provider> => {
  const [localeCode, setLocaleCode] = useState(DEFAULT_LOCALE_CODE);
  const [language, setLanguage] = useState<Record<string, string>>(defaultLocale);

  useEffect(() => {
    getLocaleCollection()
      .then(([loc, lang]) => {
        dayjs.locale(loc);
        setLocaleCode(loc);
        setLanguage(lang);
      })
      .catch(() => {
        dayjs.locale(DEFAULT_LOCALE_CODE);
        setLocaleCode(DEFAULT_LOCALE_CODE);
        setLanguage(defaultLocale);
      });
  }, []);

  useEffect(() => {
    window.localStorage.setItem(LOCALE_KEY, localeCode);
    getLocaleCollection()
      .then(([loc, lang]) => {
        dayjs.locale(loc);
        setLanguage(lang);
      })
      .catch(() => {
        dayjs.locale(DEFAULT_LOCALE_CODE);
        setLanguage(defaultLocale);
        window.localStorage.removeItem(LOCALE_KEY);
      });
  }, [localeCode]);

  const tFunc = useCallback(
    (id: string, values?: string[], defaultText?: string) => t(id, values, defaultText, language),
    [language]
  );

  const contextValues = useMemo(() => ({ changeLocale: setLocaleCode, localeCode, t: tFunc }), [localeCode, tFunc]);

  return <LocaleContext.Provider value={contextValues}>{children}</LocaleContext.Provider>;
};
