import dayjs from 'dayjs';
import React, { HTMLAttributes, ReactElement, useContext } from 'react';

import { LocaleContext } from '../contexts/Locale';
import { TodoItem } from '../redux/todo/types';

interface Props {
  data: TodoItem;
}

export const Todo = ({ data, ...other }: Props & HTMLAttributes<HTMLDivElement>): ReactElement<HTMLDivElement> => {
  const { t } = useContext(LocaleContext);

  function getFormattedDate(date: string): string {
    return dayjs(date).fromNow();
  }

  return (
    <div className="border-2 rounded border-gray-400 flex flex-col p-4 bg-blue-200" {...other}>
      <span className="font-medium text-xl mb-4">{data.title}</span>
      <span className="mb-2.5">{data.description}</span>
      <section className="text-xs flex justify-between mt-auto">
        <span>{t('due_date', [getFormattedDate(data.dueDate)])}</span>
        <span>{t('last_modified_date', [getFormattedDate(data.dateLastModified)])}</span>
      </section>
    </div>
  );
};
