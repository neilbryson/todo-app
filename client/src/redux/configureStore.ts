import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from './index';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const rootReducer = combineReducers({ ...reducers });
const middlewares = applyMiddleware(thunk);
const composeEnhancers =
  import.meta.env.DEV === true && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
export const store = createStore(rootReducer, composeEnhancers(middlewares));

export type RootState = ReturnType<typeof store.getState>;
