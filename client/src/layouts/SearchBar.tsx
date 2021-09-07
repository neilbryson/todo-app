import React, { useState } from 'react';

import { useLocale } from '../contexts/Locale';
import { TailwindComponent } from '../types/Misc';

export const SearchBar: TailwindComponent<Record<string, never>, HTMLDivElement> = () => {
  const { t } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');

  function onChangeQuery(e: React.ChangeEvent<HTMLInputElement>): void {
    setSearchQuery(e.target.value);
  }

  return (
    <input
      className="rounded p-2.5 flex flex-1 ml-6 mr-6 bg-gray-100"
      placeholder={t('search')}
      type="text"
      onChange={onChangeQuery}
      value={searchQuery}
    />
  );
};
