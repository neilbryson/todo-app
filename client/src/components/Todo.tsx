import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { HTMLAttributes, ReactElement } from 'react';

import { TodoItem } from '../redux/todo/types';

dayjs.extend(relativeTime);

interface Props {
  data: TodoItem;
}

export const Todo = ({ data, ...other }: Props & HTMLAttributes<HTMLDivElement>): ReactElement<HTMLDivElement> => {
  function getFormattedDate(date: string): string {
    return dayjs(date).fromNow();
  }

  return (
    <div className="border-2 rounded border-gray-400 flex flex-col p-4 bg-blue-200" {...other}>
      <span className="font-medium text-xl mb-4">{data.title}</span>
      <span className="mb-2.5">{data.description}</span>
      <section className="text-sm flex justify-between mt-auto">
        <span>Due {getFormattedDate(data.dueDate)}</span>
        <span>Last modified {getFormattedDate(data.dateLastModified)}</span>
      </section>
    </div>
  );
};
