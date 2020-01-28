import React from 'react';
import { observer } from 'mobx-react-lite';
import Modal from '../Modal';
import { Choice } from '../../../interfaces/Orders';
import { ModalStore } from '../../stores/authModalStores';
import SelectFoodContent from './SelectFoodContent';

interface PropTypes {
  menuChoice?: Choice;
  modalStore: ModalStore;
}

const SelectFoodModal: React.FC<PropTypes> = observer(
  ({ menuChoice, modalStore }) => {
    return (
      <Modal modalStore={modalStore}>
        {!modalStore.isHidden && (
          <SelectFoodContent menuChoice={menuChoice} modalStore={modalStore} />
        )}
      </Modal>
    );
  }
);

export default SelectFoodModal;
