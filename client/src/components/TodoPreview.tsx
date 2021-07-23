import React, { HTMLAttributes, ReactElement } from 'react';

import { useLocale } from '../contexts/Locale';
import { useModal } from '../contexts/Modal';
import { TodoItem } from '../redux/todo/types';
import { DateDisplay } from './DateDisplay';
import { TodoDetails } from './TodoDetails';

interface Props {
  data: TodoItem;
  hideDate?: boolean;
}

export const TodoPreview = ({
  data,
  hideDate = false,
  ...other
}: Props & HTMLAttributes<HTMLDivElement>): ReactElement<HTMLDivElement> => {
  const { t } = useLocale();
  const { add } = useModal();

  function onClick(): void {
    add({ title: data.title, content: <TodoDetails data={data} /> });
  }

  return (
    <div
      className="border-2 rounded border-gray-400 flex justify-between p-4 bg-blue-200 hover:bg-blue-300 mb-2 last:mb-0"
      onClick={onClick}
      {...other}
    >
      <span className="font-medium text-xl">{data.title}</span>
      {!hideDate && (
        <span className="text-xs">
          {t('due_date')} <DateDisplay date={data.dueDate} />
        </span>
      )}
    </div>
  );
};
