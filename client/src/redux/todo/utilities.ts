import dayjs from 'dayjs';

import { initialState } from './reducers';
import { TodoItem, TodoPriority, TodoState } from './types';

type UpdatePriorityParams =
  | { operation: 'move'; id: string; transferTo: keyof TodoPriority }
  | { operation: 'delete'; id: string; transferTo?: never };

export function updatePriority(params: UpdatePriorityParams, todoPriority: TodoPriority): TodoPriority {
  return Object.keys(todoPriority).reduce<TodoPriority>(
    (prev, curr) => {
      const key = curr as keyof TodoPriority;
      if (params.operation === 'delete') {
        if (todoPriority[key].includes(params.id)) prev[key] = todoPriority[key].filter((k) => k !== params.id);
        else prev[key] = todoPriority[key];
        return prev;
      }
      if (params.operation === 'move' && params.transferTo === key) {
        prev[key] = [...todoPriority[key], params.id];
        return prev;
      }
      if (todoPriority[key].includes(params.id)) prev[key] = todoPriority[key].filter((k) => k !== params.id);
      else prev[key] = todoPriority[key];
      return prev;
    },
    { done: [], overdue: [], today: [], tomorrow: [], other: [] }
  );
}

export function getDatePriority(item: TodoItem): keyof TodoPriority {
  const today = dayjs();
  const date = item.dueDate;
  if (item.isDone) return 'done';
  if (today.isSame(date, 'day')) return 'today';
  if (today.isBefore(date, 'day') && today.startOf('day').diff(date, 'day') === -1) return 'tomorrow';
  if (today.isAfter(date, 'day')) return 'overdue';
  return 'other';
}

export function organiseTodoList(todoItems: TodoItem[]): Omit<TodoState, 'displayType'> {
  const { todoPriority, todoIds, todoList } = todoItems.reduce<Omit<TodoState, 'displayType'>>(
    (prev, curr) => {
      const datePriority = getDatePriority(curr);
      if (datePriority) prev.todoPriority[datePriority].push(curr.id);
      prev.todoIds.push(curr.id);
      prev.todoList[curr.id] = curr;
      return prev;
    },
    { todoPriority: { ...initialState.todoPriority }, todoIds: [], todoList: {} }
  );
  return { todoIds, todoList, todoPriority };
}
