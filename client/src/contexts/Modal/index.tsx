import React, { createContext, ReactNode, useCallback, useContext, useMemo, useReducer } from 'react';

import { initialState, ModalItem, modalReducer, ModalState } from './modalReducer';

interface ModalContextProps {
  add: (props: Omit<ModalItem, 'id'>) => void;
  close: (id: string) => void;
  closeAll: () => void;
  modals: ModalState;
}

interface ModalProviderProps {
  children: ReactNode;
}

const noOp = () => void 0;

export const ModalContext = createContext<ModalContextProps>({
  add: noOp,
  close: noOp,
  closeAll: noOp,
  modals: initialState,
});

export const useModal = (): ModalContextProps => useContext(ModalContext);

export const ModalProvider = ({ children }: ModalProviderProps): ReturnType<typeof ModalContext.Provider> => {
  const [state, dispatch] = useReducer(modalReducer, initialState);
  const add = useCallback((props: Omit<ModalItem, 'id'>) => dispatch({ type: 'ADD', payload: props }), []);
  const close = useCallback((id: string) => dispatch({ type: 'CLOSE', payload: id }), []);
  const closeAll = useCallback(() => dispatch({ type: 'CLOSE_ALL', payload: undefined }), []);
  const contextValue = useMemo(() => ({ add, close, closeAll, modals: state }), [add, close, closeAll, state]);
  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};
