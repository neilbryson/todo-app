import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '../redux/configureStore';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
