import { Action } from '../../types/Redux';

export const enum TodoDisplay {
  DEFAULT,
  WITH_DONE,
  ALL,
}

export const enum LocalActions {
  SET_DISPLAY = '@todo/SET_DISPLAY',
}

export const enum ThunkActions {
  ADD_TODO_START = '@todo/ADD_TODO_START',
  ADD_TODO_SUCCESS = '@todo/ADD_TODO_SUCCESS',
  ADD_TODO_ERROR = '@todo/ADD_TODO_ERROR',
  DELETE_TODO_START = '@todo/DELETE_TODO_START',
  DELETE_TODO_SUCCESS = '@todo/DELETE_TODO_SUCCESS',
  DELETE_TODO_ERROR = '@todo/DELETE_TODO_ERROR',
  EDIT_TODO_START = '@todo/EDIT_TODO_START',
  EDIT_TODO_SUCCESS = '@todo/EDIT_TODO_SUCCESS',
  EDIT_TODO_ERROR = '@todo/EDIT_TODO_ERROR',
  GET_TODO_LIST_START = '@todo/GET_TODO_LIST_START',
  GET_TODO_LIST_SUCCESS = '@todo/GET_TODO_LIST_SUCCESS',
  GET_TODO_LIST_ERROR = '@todo/GET_TODO_LIST_ERROR',
}

// Should be similar to server/TodoServer.Models.TodoItem
export interface TodoItem {
  dateLastModified: string;
  description: string;
  dueDate: string;
  id: string;
  isDone: boolean;
  title: string;
}

export interface TodoState {
  displayType: TodoDisplay;
  todoIds: string[];
  todoList: Record<string, TodoItem>;
}

export type WhichTodoItem<ShowAll extends boolean> = ShowAll extends true ? TodoItem[] : TodoItem;

// Local actions
export type SetDisplay = Action<LocalActions.SET_DISPLAY, TodoDisplay>;

// Thunk actions
export type AddTodoStart = Action<ThunkActions.ADD_TODO_START, Omit<TodoItem, 'id' | 'dateLastModified'>>;
export type AddTodoSuccess = Action<ThunkActions.ADD_TODO_SUCCESS, TodoItem>;
export type AddTodoError = Action<ThunkActions.ADD_TODO_ERROR>;

export type DeleteTodoStart = Action<ThunkActions.DELETE_TODO_START, string>;
export type DeleteTodoSuccess = Action<ThunkActions.DELETE_TODO_SUCCESS, string>;
export type DeleteTodoError = Action<ThunkActions.DELETE_TODO_ERROR>;

export type EditTodoStart = Action<
  ThunkActions.EDIT_TODO_START,
  { id: string; todo: Omit<TodoItem, 'id' | 'dateLastModified'> }
>;
export type EditTodoSuccess = Action<ThunkActions.EDIT_TODO_SUCCESS, TodoItem>;
export type EditTodoError = Action<ThunkActions.EDIT_TODO_ERROR>;

export type GetTodoListStart = Action<ThunkActions.GET_TODO_LIST_START>;
export type GetTodoListSuccess = Action<ThunkActions.GET_TODO_LIST_SUCCESS, TodoItem[]>;
export type GetTodoListError = Action<ThunkActions.GET_TODO_LIST_ERROR>;

export type TodoActions =
  | SetDisplay
  | AddTodoStart
  | AddTodoSuccess
  | AddTodoError
  | DeleteTodoStart
  | DeleteTodoSuccess
  | DeleteTodoError
  | EditTodoStart
  | EditTodoSuccess
  | EditTodoError
  | GetTodoListStart
  | GetTodoListSuccess
  | GetTodoListError;
