import React, { ReactElement } from 'react';

import { Button } from '../components/Button';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { TodoForm } from '../components/TodoForm';
import { useLocale } from '../contexts/Locale';
import { useModal } from '../contexts/Modal';

export const Header = (): ReactElement<HTMLDivElement> => {
  const { t } = useLocale();
  const { add } = useModal();

  function onClickAdd(): void {
    add({ title: t('add_task'), content: <TodoForm /> });
  }

  return (
    <div className="flex justify-between items-center h-8 mt-2.5 mb-8">
      <section className="font-bold text-4xl">{t('app_title')}</section>
      <Button onClick={onClickAdd}>{t('add_task')}</Button>
      <section>
        <LanguageSwitcher />
      </section>
    </div>
  );
};
