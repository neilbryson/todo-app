import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Todo } from '../components/Todo';
import { useAppSelector } from '../hooks/useAppSelector';
import { getTodoList } from '../redux/todo/actions';

export const TodoList = () => {
  const dispatch = useDispatch();
  const { todoIds, todoList } = useAppSelector((state) => ({
    todoIds: state.todo.todoIds,
    todoList: state.todo.todoList,
  }));

  useEffect(() => {
    dispatch(getTodoList());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 overflow-y-auto">
      {todoIds.map((t) => (
        <Todo data={todoList[t]} key={todoList[t].id} />
      ))}
    </div>
  );
};
