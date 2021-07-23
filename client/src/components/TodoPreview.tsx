import React, { HTMLAttributes, ReactElement } from 'react';

import { useLocale } from '../contexts/Locale';
import { useModal } from '../contexts/Modal';
import { TodoItem } from '../redux/todo/types';
import { Check } from './Check';
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
      className="flex items-center border-2 rounded border-gray-400 p-4 bg-blue-200 hover:bg-blue-300 mb-2 last:mb-0"
      onClick={onClick}
      {...other}
    >
      <Check />
      <div className="flex justify-between items-center ml-4 w-full">
        <span className={`font-medium text-xl ${data.title === '' && 'italic text-gray-600'}`}>
          {data.title || t('untitled')}
        </span>
        {!hideDate && (
          <span className="text-xs">
            {t('due_date')} <DateDisplay date={data.dueDate} />
          </span>
        )}
      </div>
    </div>
  );
};
