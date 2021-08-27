import { ThunkActions, TodoActions, TodoDisplay, TodoState } from './types';
import { getDatePriority, organiseTodoList, updatePriority } from './utilities';

export const initialState: TodoState = {
  displayType: TodoDisplay.DEFAULT,
  todoIds: [],
  todoList: {},
  todoPriority: {
    done: [],
    other: [],
    overdue: [],
    today: [],
    tomorrow: [],
  },
};

export function todo(state = initialState, action: TodoActions): TodoState {
  switch (action.type) {
    case ThunkActions.ADD_TODO_SUCCESS: {
      const priority = getDatePriority(action.payload);
      const newTodoPriority = {
        ...state.todoPriority,
        [priority]: [...state.todoPriority[priority], action.payload.id],
      };
      return {
        ...state,
        todoPriority: newTodoPriority,
        todoIds: [...state.todoIds, action.payload.id],
        todoList: { ...state.todoList, [action.payload.id]: action.payload },
      };
    }
    case ThunkActions.CHANGE_DONE_STATUS_SUCCESS: {
      const { id, isDone } = action.payload;
      return {
        ...state,
        todoList: { ...state.todoList, [id]: { ...state.todoList[id], isDone } },
        todoPriority: updatePriority({ operation: 'move', transferTo: 'done', id }, state.todoPriority),
      };
    }
    case ThunkActions.DELETE_TODO_SUCCESS: {
      const todoIds = state.todoIds.filter((id) => id !== action.payload);
      return {
        ...state,
        todoPriority: updatePriority({ operation: 'delete', id: action.payload }, state.todoPriority),
        // TODO remove from todoList
        todoIds,
      };
    }
    case ThunkActions.GET_TODO_LIST_SUCCESS: {
      const { todoPriority, todoIds, todoList } = organiseTodoList(action.payload);
      return { ...state, todoPriority, todoIds, todoList };
    }
    default:
      return state;
  }
}
