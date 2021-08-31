import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { useLocale } from '../contexts/Locale';
import { useAppSelector } from '../hooks/useAppSelector';
import { setDisplay } from '../redux/todo/actions';
import { TodoDisplay } from '../redux/todo/types';

export const Filter = (): ReactElement<HTMLDivElement> => {
  const { t } = useLocale();
  const dispatch = useDispatch();
  const displayType = useAppSelector((state) => state.todo.displayType);

  function renderFilter(type: TodoDisplay): ReactElement<HTMLSpanElement> {
    const onClickFilter = () => dispatch(setDisplay(type));
    return (
      <span
        className={`cursor-pointer hover:text-blue-600 ${displayType === type && 'text-blue-700'}`}
        onClick={onClickFilter}
      >
        {t(type)}
      </span>
    );
  }

  return (
    <div>
      <span className="mr-1.5 font-bold">{t('filter')}</span>
      <span>
        {renderFilter(TodoDisplay.DEFAULT)} | {renderFilter(TodoDisplay.WITH_DONE)} | {renderFilter(TodoDisplay.DONE)}
      </span>
    </div>
  );
};
