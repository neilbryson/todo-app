import { vsprintf } from 'sprintf-js';

import defaultLocale from '../i18n/locale/en.json';

export const supportedLocaleCodes = ['en', 'fr'];
export const DEFAULT_LOCALE_CODE = 'en';

export function getLocaleCode(supportedLang = supportedLocaleCodes): string {
  let localeCode: string;
  const fromStorage = window.localStorage.getItem('todo-locale');
  if (fromStorage) localeCode = fromStorage;
  else if (navigator.language) localeCode = navigator.language;
  else return DEFAULT_LOCALE_CODE;
  return supportedLang.includes(localeCode) ? localeCode : DEFAULT_LOCALE_CODE;
}

export async function getLocaleCollection(): Promise<[localeCode: string, locale: Record<string, string>]> {
  const loc = getLocaleCode();

  try {
    const collection = await import(`../i18n/locale/${loc}.json`);
    return [loc, collection];
  } catch {
    return [loc, {}];
  }
}

export function t(
  id: string,
  values?: string[],
  defaultText?: string,
  lang: Record<string, string> = defaultLocale
): string {
  if (import.meta.env.DEV && !lang[id]) {
    // eslint-disable-next-line no-console
    console.warn(`[Locale] Invalid string id ${id}`);
  }
  const defaultValue = defaultText ?? id;
  if (!values) return lang[id] || defaultValue;
  return vsprintf(lang[id], values) || defaultValue;
}
