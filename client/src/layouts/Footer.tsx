import React, { ReactElement } from 'react';

import { Button } from '../components/Button';
import { useLocale } from '../contexts/Locale';
import { useModal } from '../contexts/Modal';
import { Filter } from './Filter';
import { TodoForm } from './Modals/TodoForm';

export const Footer = (): ReactElement<HTMLElement> => {
  const { t } = useLocale();
  const { add } = useModal();

  function onClickAdd(): void {
    add({ title: t('add_task'), content: <TodoForm /> });
  }
  return (
    <footer className="pt-1 pb-1 flex justify-between">
      <Button onClick={onClickAdd}>➕ {t('add_task')}</Button>
      <Filter />
    </footer>
  );
};
