import { ThunkAction } from '../../types/Redux';
import { api } from '../../utilities/api';
import * as types from './types';
import { TodoItem } from './types';

// Local actions
export const setDisplay = (displayType: types.TodoDisplay): types.TodoActions => ({
  type: types.LocalActions.SET_DISPLAY,
  payload: displayType,
});

// Thunk actions
export function addTodo(
  todo: Omit<TodoItem, 'id' | 'dateLastModified'>
): ThunkAction<types.AddTodoStart | types.AddTodoSuccess | types.AddTodoError> {
  return async (dispatch) => {
    dispatch({ type: types.ThunkActions.ADD_TODO_START, payload: todo });

    try {
      const { data } = await api<TodoItem>({ data: todo, url: '/api/v1/todo', method: 'post' });
      dispatch({ payload: data, type: types.ThunkActions.ADD_TODO_SUCCESS });
    } catch (e: unknown) {
      dispatch({ type: types.ThunkActions.ADD_TODO_ERROR });
    }
  };
}

export function deleteTodo(
  id: string
): ThunkAction<types.DeleteTodoStart | types.DeleteTodoSuccess | types.DeleteTodoError> {
  return async (dispatch) => {
    dispatch({ type: types.ThunkActions.DELETE_TODO_START, payload: id });

    try {
      await api({ url: `/api/v1/todo/${id}`, method: 'delete' });
      dispatch({ payload: id, type: types.ThunkActions.DELETE_TODO_SUCCESS });
    } catch (e: unknown) {
      dispatch({ type: types.ThunkActions.DELETE_TODO_ERROR });
    }
  };
}

export function editTodo(
  id: string,
  todo: Omit<TodoItem, 'id' | 'dateLastModified'>
): ThunkAction<types.EditTodoStart | types.EditTodoSuccess | types.EditTodoError> {
  return async (dispatch) => {
    dispatch({ type: types.ThunkActions.EDIT_TODO_START, payload: { id, todo } });

    try {
      const { data } = await api<Pick<TodoItem, 'id' | 'dateLastModified'>>({
        data: todo,
        url: `/api/v1/todo/${id}`,
        method: 'put',
      });
      dispatch({ payload: { ...todo, ...data }, type: types.ThunkActions.EDIT_TODO_SUCCESS });
    } catch (e: unknown) {
      dispatch({ type: types.ThunkActions.EDIT_TODO_ERROR });
    }
  };
}

export function getTodoList(
  showAll = false
): ThunkAction<types.GetTodoListStart | types.GetTodoListSuccess | types.GetTodoListError> {
  return async (dispatch) => {
    dispatch({
      type: types.ThunkActions.GET_TODO_LIST_START,
      payload: { showAll },
    });

    try {
      const { data } = await api<types.TodoItem[]>({ url: '/api/v1/todo' });

      dispatch({
        payload: data,
        type: types.ThunkActions.GET_TODO_LIST_SUCCESS,
      });
    } catch (e: unknown) {
      dispatch({ type: types.ThunkActions.GET_TODO_LIST_ERROR });
    }
  };
}

export function changeDoneStatus(
  id: string,
  isDone: boolean
): ThunkAction<types.ChangeDoneStatusStart | types.ChangeDoneStatusSuccess | types.ChangeDoneStatusError> {
  return async (dispatch) => {
    dispatch({
      type: types.ThunkActions.CHANGE_DONE_STATUS_START,
      payload: { id, isDone },
    });

    try {
      await api({
        url: `api/v1/todo/change-done`,
        method: 'patch',
        data: { id, isDone },
      });

      dispatch({
        payload: { id, isDone },
        type: types.ThunkActions.CHANGE_DONE_STATUS_SUCCESS,
      });
    } catch (e: unknown) {
      dispatch({ type: types.ThunkActions.CHANGE_DONE_STATUS_ERROR });
    }
  };
}
