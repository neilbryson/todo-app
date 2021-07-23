import React, { HTMLAttributes, ReactElement } from 'react';

import { useModal } from '../../contexts/Modal';
import type { ModalItem } from '../../contexts/Modal/modalReducer';

interface Props {
  data: ModalItem;
}

export const Modal = ({ data, ...other }: Props & HTMLAttributes<HTMLDivElement>): ReactElement<HTMLDivElement> => {
  const { close } = useModal();

  function closeCb(): void {
    close(data.id);
  }

  return (
    <div className="border-2 rounded border-blue-900 bg-blue-200 max-w-lg w-full p-8" {...other}>
      <section className="flex justify-between mb-2.5">
        <h2 className="font-bold text-2xl">{data.title}</h2>
        <span className="cursor-pointer" onClick={closeCb}>
          🗙
        </span>
      </section>
      <section>{data.content}</section>
    </div>
  );
};
