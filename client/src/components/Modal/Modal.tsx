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
    <div className="border-2 rounded border-blue-900 bg-indigo-300 w-96 h-96 p-8" onClick={closeCb} {...other}>
      {data.title}
    </div>
  );
};
