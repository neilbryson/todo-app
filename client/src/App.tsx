import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';

import { store } from './redux/configureStore';
import { TodoView } from './views/TodoView';

export const App = (): ReactElement => {
  return (
    <Provider store={store}>
      <div className="w-screen h-screen bg-blue-100 text-gray-800 overflow-hidden">
        <TodoView />
      </div>
    </Provider>
  );
};
