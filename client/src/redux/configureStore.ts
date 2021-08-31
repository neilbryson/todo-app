import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

import { reducers } from './index';

const rootReducer = combineReducers({ ...reducers });
const middlewares = applyMiddleware(thunk);
const enhancers = composeWithDevTools(middlewares);
export const store = createStore(rootReducer, enhancers);

export type RootState = ReturnType<typeof store.getState>;
