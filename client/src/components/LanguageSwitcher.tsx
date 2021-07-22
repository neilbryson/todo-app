import React, { ReactElement } from 'react';

import { useLocale } from '../contexts/Locale';
import { supportedLocaleCodes } from '../utilities/locale';

export const LanguageSwitcher = (): ReactElement<HTMLDivElement> => {
  const { changeLocale, localeCode } = useLocale();

  function changeLocaleCb(code: string): () => void {
    return () => changeLocale(code);
  }

  return (
    <div>
      {supportedLocaleCodes.map((c) => {
        const selectedStyle = localeCode === c ? 'font-bold text-blue-600' : '';
        return (
          <span
            className={`cursor-pointer hover:font-bold mr-4 last:mr-0 ${selectedStyle}`}
            key={c}
            onClick={changeLocaleCb(c)}
          >
            {c.toUpperCase()}
          </span>
        );
      })}
    </div>
  );
};
