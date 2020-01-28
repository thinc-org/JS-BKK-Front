import { useForm } from 'react-hook-form';
import React, { useMemo } from 'react';
import Modal from '../Modal';
import { Menu } from '../../../interfaces/Orders';
import { ModalStore } from '../../stores/authModalStores';

interface PropTypes {
  storeData: {
    items: Menu[];
    name: string;
  };
  modalStore: ModalStore;
}

interface Test {
  text: string;
}

const SelectFoodModal: React.FC<PropTypes> = ({ storeData, modalStore }) => {
  const { handleSubmit, register, errors } = useForm<Test>();

  const onSubmit = (values: Test) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  const FoodMenu = useMemo(
    () =>
      storeData?.items?.map(item => {
        const Foods = item.choices.map(food => {
          return (
            <div key={food.id}>
              <input
                type='radio'
                name={food.id}
                ref={register({ required: 'Required' })}
              />
              <p>{food.title}</p>
              {(errors as any)[food.id]}
            </div>
          );
        });
        return (
          <div key={item.id}>
            <span className='font-extrabold'>{item.title}</span>
            {Foods}
          </div>
        );
      }),
    [storeData?.items]
  );

  return useMemo(
    () => (
      <Modal modalStore={modalStore}>
        <h2 className='text-base font-extrabold'>{storeData?.name}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>{FoodMenu}</form>
      </Modal>
    ),
    [storeData, modalStore]
  );
};

export default SelectFoodModal;
