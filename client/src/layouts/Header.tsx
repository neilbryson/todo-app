import React, { ReactElement } from 'react';

import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { useLocale } from '../contexts/Locale';
import { SearchBar } from './SearchBar';

export const Header = (): ReactElement<HTMLDivElement> => {
  const { t } = useLocale();

  return (
    <div className="flex justify-between items-center h-8 mt-2.5 mb-8">
      <section className="font-bold text-4xl">{t('app_title')}</section>
      <SearchBar />
      <LanguageSwitcher />
    </div>
  );
};
