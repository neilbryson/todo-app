import dayjs from 'dayjs';

import { LocalActions, ThunkActions, TodoActions, TodoDisplay, TodoItem, TodoState } from './types';
import { getDatePriority, organiseTodoList, rebuildPriority } from './utilities';

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
    case LocalActions.SET_DISPLAY:
      return { ...state, displayType: action.payload };
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
    case ThunkActions.EDIT_TODO_SUCCESS: {
      const { dateLastModified, id, ...other } = action.payload;
      const nextTodoList = { ...state.todoList, [id]: { ...state.todoList[id], ...other, dateLastModified } };
      const nextTodoPriority = rebuildPriority({ ids: state.todoIds, data: nextTodoList });
      return {
        ...state,
        todoList: nextTodoList,
        todoPriority: nextTodoPriority,
      };
    }
    case ThunkActions.CHANGE_DONE_STATUS_SUCCESS: {
      const { id, isDone } = action.payload;
      const nextTodoList = {
        ...state.todoList,
        [id]: { ...state.todoList[id], isDone, dateLastModified: dayjs().toISOString() },
      };
      const nextTodoPriority = rebuildPriority({ ids: state.todoIds, data: nextTodoList });
      return {
        ...state,
        todoList: nextTodoList,
        todoPriority: nextTodoPriority,
      };
    }
    case ThunkActions.DELETE_TODO_SUCCESS: {
      const nextTodoIds = state.todoIds.filter((id) => id !== action.payload);
      const nextTodoList = nextTodoIds.reduce<Record<string, TodoItem>>((prev, curr) => {
        prev[curr] = state.todoList[curr];
        return prev;
      }, {});
      const nextTodoPriority = rebuildPriority({ ids: nextTodoIds, data: nextTodoList });
      return {
        ...state,
        todoPriority: nextTodoPriority,
        todoList: nextTodoList,
        todoIds: nextTodoIds,
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
