import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';

import { useModal } from '../../contexts/Modal';
import { Modal } from './Modal';

const ModalContainer = (): ReactElement<HTMLDivElement> | null => {
  const { modals } = useModal();
  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot || modals.modalIds.length === 0) return null;

  function render() {
    return (
      <div className="flex justify-center items-center w-screen h-screen relative">
        <div className="w-screen h-screen bg-gray-200 opacity-60 absolute top-0 -z-1" />
        {modals.modalIds.map((modalId) => (
          <Modal key={modalId} data={modals.modals[modalId]} />
        ))}
      </div>
    );
  }

  return ReactDOM.createPortal(render(), modalRoot);
};

export default ModalContainer;
