import dayjs from 'dayjs';
import React, { HTMLAttributes, ReactElement, useRef } from 'react';

import { useLocale } from '../contexts/Locale';
import { TodoItem } from '../redux/todo/types';

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

  function formatDate(date: dayjs.Dayjs): string {
    return date.format('DD MMMM YYYY HH:mm:ss');
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
    </div>
  );
};
