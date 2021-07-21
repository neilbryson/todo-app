import React, { HTMLAttributes, ReactElement, useContext } from 'react';

import { LocaleContext } from '../contexts/Locale';
import { TodoItem } from '../redux/todo/types';
import { DateDisplay } from './DateDisplay';

interface Props {
  data: TodoItem;
}

export const Todo = ({ data, ...other }: Props & HTMLAttributes<HTMLDivElement>): ReactElement<HTMLDivElement> => {
  const { t } = useContext(LocaleContext);

  return (
    <div className="border-2 rounded border-gray-400 flex flex-col p-4 bg-blue-200" {...other}>
      <span className="font-medium text-xl mb-4">{data.title}</span>
      <span className="mb-2.5">{data.description}</span>
      <section className="text-xs flex justify-between mt-auto">
        <span>
          {t('due_date')} <DateDisplay date={data.dueDate} />
        </span>
        <span>
          {t('last_modified_date')} <DateDisplay date={data.dateLastModified} />
        </span>
      </section>
    </div>
  );
};
