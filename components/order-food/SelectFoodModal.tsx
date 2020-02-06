/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { observer } from 'mobx-react-lite';
import Modal from '../../commons/components/Modal';
import { Restaurant } from '../../interfaces/Orders';
import { ModalStore } from '../../commons/stores/authModalStores';
import SelectFoodContent from './SelectFoodContent';
import { ModalType } from '../../interfaces/Commons';

interface PropTypes {
  menuChoice?: Restaurant;
  modalStore: ModalStore;
  onFinish: () => void;
}

const SelectFoodModal: React.FC<PropTypes> = observer(
  ({ menuChoice, modalStore, onFinish }) => {
    return (
      <Modal
        modalStore={modalStore}
        className='bg-dim top-0 p-6 min-h-500px z-50 items-center'
        data-testid='food-customization-modal'
        aria-label='Customize your meal'
      >
        {!modalStore.isHidden &&
        modalStore.currentModal === ModalType.normal ? (
          <SelectFoodContent
            menuChoice={menuChoice}
            modalStore={modalStore}
            onFinish={onFinish}
          />
        ) : (
          <>
            <h3 className='text-base font-bold mb-8'>{menuChoice?.title}</h3>
            <div className='font-bold text-bkk-nak text-center pb-4'>
              <span className='text-lg'>
                All Sold out here :( <br />
              </span>
              <span className='text-bg'>sorry choose another one</span>
            </div>
          </>
        )}
      </Modal>
    );
  }
);

export default SelectFoodModal;
