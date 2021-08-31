import dayjs from 'dayjs';

import { initialState } from './reducers';
import { TodoItem, TodoPriority, TodoState } from './types';

interface RebuildPriorityParams {
  data: Record<string, TodoItem>;
  ids: string[];
}

export function rebuildPriority(params: RebuildPriorityParams): TodoPriority {
  const { data = {}, ids = [] } = params;
  return ids.reduce<TodoPriority>(
    (prev, curr) => {
      const datePriority = getDatePriority(data[curr]);
      prev[datePriority].push(curr);
      return prev;
    },
    { done: [], today: [], overdue: [], tomorrow: [], other: [] }
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
