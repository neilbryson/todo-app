import dayjs from 'dayjs';

import { ThunkActions, TodoActions, TodoDisplay, TodoItem, TodoState } from './types';

const initialState: TodoState = {
  displayType: TodoDisplay.DEFAULT,
  todoIds: [],
  todoList: {},
  todoPriority: {
    other: [],
    overdue: [],
    today: [],
    tomorrow: [],
  },
};

export function todo(state = initialState, action: TodoActions): TodoState {
  switch (action.type) {
    case ThunkActions.ADD_TODO_SUCCESS:
      return {
        ...state,
        todoIds: [...state.todoIds, action.payload.id],
        todoList: { ...state.todoList, [action.payload.id]: action.payload },
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
      const { todoPriority, todoIds, todoList } = organiseTodoList(action.payload);
      return { ...state, todoPriority, todoIds, todoList };
    }
    default:
      return state;
  }
}

function organiseTodoList(todoItems: TodoItem[]): Omit<TodoState, 'displayType'> {
  const today = dayjs();
  const { todoPriority, todoIds, todoList } = todoItems.reduce<Omit<TodoState, 'displayType'>>(
    (prev, curr) => {
      const [date] = curr.dueDate.split('T');
      if (today.isSame(date, 'day')) {
        prev.todoPriority.today.push(curr.id);
      } else if (today.isBefore(date, 'day') && today.startOf('day').diff(date, 'day') === -1) {
        prev.todoPriority.tomorrow.push(curr.id);
      } else if (today.isAfter(date, 'day')) {
        prev.todoPriority.overdue.push(curr.id);
      } else {
        prev.todoPriority.other.push(curr.id);
      }
      prev.todoIds.push(curr.id);
      prev.todoList[curr.id] = curr;
      return prev;
    },
    { todoPriority: initialState.todoPriority, todoIds: [], todoList: {} }
  );
  return { todoIds, todoList, todoPriority };
}
