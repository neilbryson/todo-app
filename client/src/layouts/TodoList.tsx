import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getTodoList } from '../redux/todo/actions';

export const TodoList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodoList());
  }, [dispatch]);
  return <div>TodoList</div>;
};
