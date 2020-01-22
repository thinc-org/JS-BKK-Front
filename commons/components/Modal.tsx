import React, { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import Card from './Card';
import { ModalStore } from '../stores/authModalStores';

interface PropTypes {
  modalStore: ModalStore;
  isUnclosable?: boolean;
}

const Modal: React.FC<PropTypes> = observer(
  ({ children, modalStore, isUnclosable = false }) => {
    const closeModal = useCallback(() => {
      // eslint-disable-next-line no-param-reassign
      modalStore.setModalOpen(false);
    }, []);

    const content = useMemo(() => {
      return (
        <Card className='flex flex-col items-center '>
          {!isUnclosable && <button onClick={closeModal}>Close</button>}
          {children}
        </Card>
      );
    }, [isUnclosable, children]);

    const { isAnimating, isHidden, isModalOpen } = modalStore;

    return isUnclosable ? (
      <div
        className={`fixed flex justify-center pin-l pin-t my-4 px-4 z-50 ${
          isAnimating ? 'fade-out' : ''
        } ${isHidden ? 'hidden' : 'test'}`}
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
