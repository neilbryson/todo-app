import type { Action as ReduxAction } from 'redux';
import type { ThunkAction as TAction } from 'redux-thunk';

import type { RootState } from '../redux/configureStore';

export type Action<T, P extends unknown = undefined> = P extends undefined
  ? ReduxAction<T>
  : ReduxAction<T> & { payload: P };

export type ThunkAction<A extends ReduxAction> = TAction<void, RootState, void, A>;
