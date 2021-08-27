import dayjs from 'dayjs';

import { ThunkActions, TodoActions, TodoDisplay, TodoItem, TodoPriority, TodoState } from './types';

const initialState: TodoState = {
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
        todoPriority: transferToPriority('done', id, state.todoPriority),
      };
    }
    case ThunkActions.DELETE_TODO_SUCCESS: {
      const todoIds = state.todoIds.filter((id) => id !== action.payload);
      return {
        ...state,
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

function transferToPriority(
  transferTo: keyof TodoPriority,
  idToTransfer: string,
  todoPriority: TodoPriority
): TodoPriority {
  return Object.keys(todoPriority).reduce<TodoPriority>(
    (prev, curr) => {
      const key = curr as keyof TodoPriority;
      if (transferTo === key) {
        prev[key] = [...todoPriority[key], idToTransfer];
        return prev;
      }
      if (todoPriority[key].includes(idToTransfer)) prev[key] = todoPriority[key].filter((k) => k !== idToTransfer);
      else prev[key] = [...todoPriority[key]];
      return prev;
    },
    { done: [], overdue: [], today: [], tomorrow: [], other: [] }
  );
}

function getDatePriority(item: TodoItem): keyof TodoPriority {
  const today = dayjs();
  const date = item.dueDate;
  if (item.isDone) return 'done';
  if (today.isSame(date, 'day')) return 'today';
  if (today.isBefore(date, 'day') && today.startOf('day').diff(date, 'day') === -1) return 'tomorrow';
  if (today.isAfter(date, 'day')) return 'overdue';
  return 'other';
}

function organiseTodoList(todoItems: TodoItem[]): Omit<TodoState, 'displayType'> {
  const { todoPriority, todoIds, todoList } = todoItems.reduce<Omit<TodoState, 'displayType'>>(
    (prev, curr) => {
      const datePriority = getDatePriority(curr);
      prev.todoPriority[datePriority].push(curr.id);
      prev.todoIds.push(curr.id);
      prev.todoList[curr.id] = curr;
      return prev;
    },
    { todoPriority: initialState.todoPriority, todoIds: [], todoList: {} }
  );
  return { todoIds, todoList, todoPriority };
}
