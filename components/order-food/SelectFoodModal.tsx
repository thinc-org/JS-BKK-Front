import React from 'react';
import { observer } from 'mobx-react-lite';
import Modal from '../../commons/components/Modal';
import { Restaurant } from '../../interfaces/Orders';
import { ModalStore } from '../../commons/stores/authModalStores';
import SelectFoodContent from './SelectFoodContent';

interface PropTypes {
  menuChoice?: Restaurant;
  modalStore: ModalStore;
}

const SelectFoodModal: React.FC<PropTypes> = observer(
  ({ menuChoice, modalStore }) => {
    return (
      <Modal
        modalStore={modalStore}
        className='bg-dim top-0 p-6 min-h-500px z-50'
        data-testid='food-customization-modal'
        aria-label='Customize your meal'
      >
        {!modalStore.isHidden && (
          <SelectFoodContent menuChoice={menuChoice} modalStore={modalStore} />
        )}
      </Modal>
    );
  }
);

export default SelectFoodModal;
