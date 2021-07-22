import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';

import { useModal } from '../../contexts/Modal';
import { Modal } from './Modal';

export const Container = (): ReactElement<HTMLDivElement> | null => {
  const { modals } = useModal();
  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot || modals.modalIds.length === 0) return null;

  function render() {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        {modals.modalIds.map((modalId) => (
          <Modal key={modalId} data={modals.modals[modalId]} />
        ))}
      </div>
    );
  }

  return ReactDOM.createPortal(render(), modalRoot);
};
