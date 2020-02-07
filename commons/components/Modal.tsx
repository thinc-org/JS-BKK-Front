/* eslint-disable @typescript-eslint/indent */
import React, { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import FocusLock from 'react-focus-lock';
import Card from './Card';
import { ModalStore } from '../stores/authModalStores';

interface PropTypes {
  modalStore: ModalStore;
  noCloseButton?: boolean;
  className?: string;
  'aria-label'?: string;
  'data-testid'?: string;
}

const Modal: React.FC<PropTypes> = observer(
  ({
    children,
    modalStore,
    noCloseButton = false,
    className,
    'aria-label': ariaLabel,
    'data-testid': dataTestid
  }) => {
    const closeModal = useCallback(() => {
      modalStore.setModalOpen(false);
    }, []);

    const content = useMemo(() => {
      return (
        <Card
          tabIndex={0}
          className='flex flex-col items-center relative my-6'
          aria-label={ariaLabel}
          data-testid={dataTestid}
        >
          {children}
          {!noCloseButton && (
            <button
              style={{ top: '-20px', right: '-20px' }}
              className='absolute p-3 bg-white rounded-full shadow-circle'
              onClick={closeModal}
              aria-label='Close modal'
            >
              <img src='/icons/crossmark.svg' alt='close' />
            </button>
          )}
        </Card>
      );
    }, [noCloseButton, children]);

    const { isAnimating, isHidden, isModalOpen } = modalStore;

    const ANIMATION_CLASSES = noCloseButton
      ? `${isAnimating ? 'fade-out' : ''} ${isHidden ? 'hidden' : ''}`
      : `${isAnimating && !isModalOpen ? 'opacity-0' : ''} ${
          isHidden ? 'invisible opacity-0' : ''
        } fade`;
    const MODAL_CLASSES = `fixed top-0 left-0 w-full h-screen overflow-y-auto ${ANIMATION_CLASSES} ${className}`;

    return (
      <FocusLock disabled={noCloseButton || modalStore.isHidden}>
        <div className={MODAL_CLASSES}>{content}</div>
      </FocusLock>
    );
  }
);

export default Modal;
