import React, { ReactElement, ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { TodoPreview } from '../components/TodoPreview';
import { useLocale } from '../contexts/Locale';
import { useModal } from '../contexts/Modal';
import { useAppSelector } from '../hooks/useAppSelector';
import { getTodoList } from '../redux/todo/actions';

export const TodoList = (): ReactElement<HTMLDivElement> => {
  const dispatch = useDispatch();
  const { t } = useLocale();
  const { add } = useModal();
  const { todoPriority, todoList } = useAppSelector((state) => ({
    todoPriority: state.todo.todoPriority,
    todoList: state.todo.todoList,
  }));

  useEffect(() => {
    dispatch(getTodoList());
  }, [dispatch]);

  function renderSection(title: string, children: ReactNode): ReactElement {
    return (
      <section className=" mt-4 first:mt-0">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        {children}
      </section>
    );
  }

  function renderTodoToday(): ReturnType<typeof renderSection> | null {
    if (todoPriority.today.length === 0) return null;
    return renderSection(
      t('today'),
      todoPriority.today.map((id) => <TodoPreview data={todoList[id]} key={id} hideDate />)
    );
  }

  function renderTodoTomorrow(): ReturnType<typeof renderSection> | null {
    if (todoPriority.tomorrow.length === 0) return null;
    return renderSection(
      t('tomorrow'),
      todoPriority.tomorrow.map((id) => <TodoPreview data={todoList[id]} key={id} hideDate />)
    );
  }

  function renderTodoOverdue(): ReturnType<typeof renderSection> | null {
    if (todoPriority.overdue.length === 0) return null;
    return renderSection(
      t('overdue'),
      todoPriority.overdue.map((id) => <TodoPreview data={todoList[id]} key={id} />)
    );
  }

  function renderTodoOther(): ReturnType<typeof renderSection> | null {
    if (todoPriority.other.length === 0) return null;
    return renderSection(
      t('other_todo'),
      todoPriority.other.map((id) => <TodoPreview data={todoList[id]} key={id} />)
    );
  }

  return (
    <div className="mb-4 overflow-y-auto">
      {renderTodoToday()}
      {renderTodoTomorrow()}
      {renderTodoOverdue()}
      {renderTodoOther()}
    </div>
  );
};
