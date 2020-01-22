import React, { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import Card from './Card';
import { ModalStore } from '../stores/authModalStores';

interface PropTypes {
  modalStore: ModalStore;
  noCloseButton?: boolean;
}

const Modal: React.FC<PropTypes> = observer(
  ({ children, modalStore, noCloseButton = false }) => {
    const closeModal = useCallback(() => {
      // eslint-disable-next-line no-param-reassign
      modalStore.setModalOpen(false);
    }, []);

    const content = useMemo(() => {
      return (
        <Card className='flex flex-col items-center '>
          {!noCloseButton && <button onClick={closeModal}>Close</button>}
          {children}
        </Card>
      );
    }, [noCloseButton, children]);

    const { isAnimating, isHidden, isModalOpen } = modalStore;

    return noCloseButton ? (
      <div
        className={`fixed flex justify-center pin-l pin-t my-4 px-4 z-50 ${
          isAnimating ? 'fade-out' : ''
        } ${isHidden ? 'hidden' : ''}`}
      >
        {content}
      </div>
    ) : (
      <div
        className={`fixed flex justify-center pin-l pin-t my-4 px-4 z-50 fade ${
          isAnimating && !isModalOpen ? 'opacity-0' : ''
        } ${isHidden ? 'invisible opacity-0' : ''}`}
      >
        {content}
      </div>
    );
  }
);

export default Modal;
