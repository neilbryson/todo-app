import dayjs from 'dayjs';
import React, { HTMLAttributes, ReactElement, useRef } from 'react';

import { useLocale } from '../contexts/Locale';
import { useModal } from '../contexts/Modal';
import { DeleteTodoModal } from '../layouts/Modals/DeleteTodoModal';
import { TodoForm } from '../layouts/Modals/TodoForm';
import { TodoItem } from '../redux/todo/types';
import { Button } from './Button';

interface Props {
  data: TodoItem;
}

export const TodoDetails = ({
  data,
  ...other
}: Props & HTMLAttributes<HTMLDivElement>): ReactElement<HTMLDivElement> => {
  const { t } = useLocale();
  const dueDate = useRef(dayjs(data.dueDate));
  const dateLastModified = useRef(dayjs(data.dateLastModified));
  const { add } = useModal();

  function formatDate(date: dayjs.Dayjs): string {
    return date.format('DD MMMM YYYY HH:mm:ss');
  }

  function onClickDelete(): void {
    add({ title: t('delete_title'), content: <DeleteTodoModal todoId={data.id} /> });
  }

  function onClickEdit(): void {
    add({ title: t('edit_title'), content: <TodoForm data={data} /> });
  }

  return (
    <div {...other}>
      <section className="max-h-64 overflow-auto mb-2.5">{data.description}</section>
      <section className="text-xs">
        {!data.isDone && (
          <div>
            {t('due_date')} {formatDate(dueDate.current)}
          </div>
        )}
        <div>
          {t('last_modified_date')} {formatDate(dateLastModified.current)}
        </div>
      </section>
      {!data.isDone && (
        <div className="mt-2.5 flex justify-around">
          <Button onClick={onClickEdit}>{t('edit_title')}</Button>
          <Button onClick={onClickDelete}>{t('delete_title')}</Button>
        </div>
      )}
    </div>
  );
};
