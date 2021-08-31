import React from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '../../components/Button';
import { useLocale } from '../../contexts/Locale';
import { useModal } from '../../contexts/Modal';
import { deleteTodo } from '../../redux/todo/actions';
import { TailwindComponent } from '../../types/Misc';

interface Props {
  todoId: string;
}

export const DeleteTodoModal: TailwindComponent<Props, HTMLDivElement> = ({ todoId, ...other }) => {
  const { t } = useLocale();
  const dispatch = useDispatch();
  const { closeAll, closeLast } = useModal();

  function onClickDelete(): void {
    dispatch(deleteTodo(todoId));
    closeAll();
  }

  return (
    <div className="flex flex-col" {...other}>
      <span>{t('delete_confirm')}</span>
      <div className="mt-2.5 flex justify-around">
        <Button onClick={onClickDelete}>{t('affirmative')}</Button>
        <Button onClick={closeLast}>{t('cancel')}</Button>
      </div>
    </div>
  );
};
