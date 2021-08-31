import { ReactNode } from 'react';

import type { RecursiveWritable } from '../../types/Misc';

export interface ModalItem {
  id: string;
  title?: string;
  content?: ReactNode;
}

export interface ModalState {
  modalIds: readonly string[];
  modals: Record<string, ModalItem>;
}

type Action<A extends string, P extends unknown> = { type: A; payload: P };

type ActionTypes =
  | Action<'ADD', Omit<ModalItem, 'id'>>
  | Action<'CLOSE', string>
  | Action<'CLOSE_ALL', undefined>
  | Action<'CLOSE_LAST', undefined>;

export const initialState: ModalState = {
  modalIds: [],
  modals: {},
};

export function modalReducer(state: ModalState, action: ActionTypes): ModalState {
  switch (action.type) {
    case 'ADD': {
      const { content, title } = action.payload;
      // we'll just use Date.now() here to be as simple as possible
      const id = Date.now().toString();
      return { modals: { ...state.modals, [id]: { id, content, title } }, modalIds: [...state.modalIds, id] };
    }
    case 'CLOSE': {
      const { modalIds, modals } = state.modalIds.reduce<RecursiveWritable<ModalState>>(
        (prev, curr) => {
          if (curr === action.payload) return prev;
          prev.modalIds.push(curr);
          prev.modals[curr] = state.modals[curr];
          return prev;
        },
        { modalIds: [], modals: {} }
      );
      return { modalIds, modals };
    }
    case 'CLOSE_LAST': {
      const last = state.modalIds[state.modalIds.length - 1];
      return {
        modalIds: state.modalIds.filter((id) => id !== last),
        modals: state.modalIds.reduce<Record<string, ModalItem>>((prev, curr) => {
          if (state.modals[curr].id === last) return prev;
          prev[curr] = state.modals[curr];
          return prev;
        }, {}),
      };
    }
    case 'CLOSE_ALL':
      return initialState;
    default:
      return state;
  }
}
