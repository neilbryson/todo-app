import React, { HTMLAttributes, ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { useLocale } from '../contexts/Locale';
import { useModal } from '../contexts/Modal';
import { changeDoneStatus } from '../redux/todo/actions';
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
  const dispatch = useDispatch();
  const { t } = useLocale();
  const { add } = useModal();

  function onClickPreview(): void {
    add({ title: data.title, content: <TodoDetails data={data} /> });
  }

  function onClickCheck(isDone: boolean): void {
    dispatch(changeDoneStatus(data.id, isDone));
  }

  return (
    <div
      className={`flex items-center border-2 rounded border-gray-400 p-4 mb-2 last:mb-0 ${
        data.isDone ? 'bg-gray-200 hover:bg-blue:200' : 'bg-blue-200 hover:bg-blue-300'
      }`}
      onClick={onClickPreview}
      {...other}
    >
      <Check checked={data.isDone} onClick={onClickCheck} />
      <div className="flex justify-between items-center ml-4 w-full">
        <span
          className={`font-medium text-xl ${data.title === '' && 'italic text-gray-600'} ${
            data.isDone && 'line-through'
          }`}
        >
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
