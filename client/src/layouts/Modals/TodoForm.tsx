import dayjs from 'dayjs';
import React, { HTMLAttributes, ReactElement, useState } from 'react';
import Datepicker from 'react-datepicker';
import { useDispatch } from 'react-redux';

import { Button } from '../../components/Button';
import { TextArea } from '../../components/TextArea';
import { TextField } from '../../components/TextField';
import { useLocale } from '../../contexts/Locale';
import { useModal } from '../../contexts/Modal';
import { addTodo, editTodo } from '../../redux/todo/actions';
import { TodoItem } from '../../redux/todo/types';

interface Props {
  data?: TodoItem;
}

export const TodoForm = ({ data, ...other }: Props & HTMLAttributes<HTMLDivElement>): ReactElement<HTMLDivElement> => {
  const isEditMode = typeof data !== 'undefined';
  const dispatch = useDispatch();
  const [title, setTitle] = useState(data?.title ?? '');
  const [description, setDescription] = useState(data?.description ?? '');
  const [dueDate, setSelectedDate] = useState(data?.dueDate ? dayjs(data.dueDate).toDate() : new Date());
  const { localeCode, t } = useLocale();
  const { closeAll } = useModal();

  function generateFormTitle(title: string): ReactElement<HTMLSpanElement> {
    return <span className="font-bold text-lg mt-1.5 mb-1.5 first:mt-0 first:mb-0">{title}</span>;
  }

  function onChangeDate(date: Date): void {
    setSelectedDate(date);
  }

  function onChangeTitle(e: React.ChangeEvent<HTMLInputElement>): void {
    setTitle(e.target.value);
  }

  function onChangeNotes(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setDescription(e.target.value);
  }

  function onSave(): void {
    const dueDateISO = dayjs(dueDate).toISOString();

    if (typeof data === 'undefined') {
      dispatch(addTodo({ dueDate: dueDateISO, title, description, isDone: false }));
    } else {
      dispatch(editTodo(data.id, { dueDate: dueDateISO, title, isDone: false, description }));
    }

    closeAll();
  }

  return (
    <div className="flex flex-col">
      <section className="flex flex-col mb-2.5" {...other}>
        {generateFormTitle(t('task'))}
        <TextField onChange={onChangeTitle} defaultValue={title} />
        {generateFormTitle(t('task_details'))}
        <TextArea onChange={onChangeNotes} defaultValue={description} />
        {generateFormTitle(t('due_date_form'))}
        <Datepicker
          dateFormat="Pp"
          timeFormat="p"
          locale={localeCode}
          selected={dueDate}
          onChange={onChangeDate}
          showTimeSelect
        />
      </section>
      <section className="flex justify-end">
        <Button disabled={title === '' && description === ''} onClick={onSave}>
          {t(isEditMode ? 'update' : 'add')}
        </Button>
      </section>
    </div>
  );
};
