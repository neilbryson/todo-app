import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';

import { Container } from './components/Modal/Container';
import { LocaleProvider } from './contexts/Locale';
import { ModalProvider } from './contexts/Modal';
import { store } from './redux/configureStore';
import { TodoView } from './views/TodoView';

export const App = (): ReactElement => {
  return (
    <Provider store={store}>
      <LocaleProvider>
        <div className="w-screen h-screen bg-blue-100 text-gray-800 overflow-hidden">
          <ModalProvider>
            <TodoView />
            <Container />
          </ModalProvider>
        </div>
      </LocaleProvider>
    </Provider>
  );
};
