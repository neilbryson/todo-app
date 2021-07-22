import React, { HTMLAttributes, ReactElement } from 'react';

import { useLocale } from '../contexts/Locale';
import { TodoItem } from '../redux/todo/types';
import { DateDisplay } from './DateDisplay';

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

  return (
    <div
      className="border-2 rounded border-gray-400 flex justify-between p-4 bg-blue-200 hover:bg-blue-300 mb-2 last:mb-0"
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
