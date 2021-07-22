import React, { HTMLAttributes, ReactElement } from 'react';

import { TodoItem } from '../redux/todo/types';

interface Props {
  data: TodoItem;
}

export const TodoPreview = ({
  data,
  ...other
}: Props & HTMLAttributes<HTMLDivElement>): ReactElement<HTMLDivElement> => {
  return (
    <div className="border-2 rounded border-gray-400 flex flex-col p-4 bg-blue-200 mb-2 last:mb-0" {...other}>
      <span className="font-medium text-xl mb-4">{data.title}</span>
    </div>
  );
};
