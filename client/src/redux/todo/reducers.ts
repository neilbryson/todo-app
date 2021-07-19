import { ThunkActions, TodoActions, TodoDisplay, TodoState } from './types';

const initialState: TodoState = {
  displayType: TodoDisplay.DEFAULT,
  todoIds: [],
  todoList: {},
};

export function todo(state = initialState, action: TodoActions): TodoState {
  switch (action.type) {
    case ThunkActions.ADD_TODO_SUCCESS:
      return {
        ...state,
        todoIds: [...state.todoIds, action.payload._id],
        todoList: { ...state.todoList, [action.payload._id]: action.payload },
      };
    case ThunkActions.DELETE_TODO_SUCCESS: {
      const todoIds = state.todoIds.filter((id) => id !== action.payload);
      return {
        ...state,
        // TODO remove from todoList
        todoIds,
      };
    }
    case ThunkActions.GET_TODO_LIST_SUCCESS: {
      const { todoIds = [], todoList = {} } = action.payload.reduce<Pick<TodoState, 'todoIds' | 'todoList'>>(
        (prev, curr) => {
          prev.todoIds.push(curr._id);
          prev.todoList[curr._id] = curr;
          return prev;
        },
        { todoIds: [], todoList: {} }
      );
      return { ...state, todoIds, todoList };
    }
    default:
      return state;
  }
}
