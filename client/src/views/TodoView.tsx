import React, { ReactElement } from 'react';

import { Header } from '../layouts/Header';
import { TodoList } from '../layouts/TodoList';

export const TodoView = (): ReactElement<HTMLDivElement> => {
  return (
    <div className="h-full ml-24 mr-24">
      <Header />
      <TodoList />
    </div>
  );
};
