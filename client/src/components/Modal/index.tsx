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
        {modals.modalIds.map((modalId) => (
          <div
            className="w-screen h-screen bg-translucent absolute top-0 left-0 flex items-center justify-center"
            key={modalId}
          >
            <Modal data={modals.modals[modalId]} />
          </div>
        ))}
      </div>
    );
  }

  return ReactDOM.createPortal(render(), modalRoot);
};

export default ModalContainer;
