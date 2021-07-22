import { ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

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

type ActionTypes = Action<'ADD', Omit<ModalItem, 'id'>> | Action<'CLOSE', string> | Action<'CLOSE_ALL', undefined>;

export const initialState: ModalState = {
  modalIds: [],
  modals: {},
};

export function modalReducer(state: ModalState, action: ActionTypes): ModalState {
  switch (action.type) {
    case 'ADD': {
      const { content, title } = action.payload;
      const id = uuidv4();
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
    case 'CLOSE_ALL':
      return initialState;
    default:
      return state;
  }
}
