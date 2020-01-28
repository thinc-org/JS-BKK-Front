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
      storeData?.items.map(item => {
        const Foods = useMemo(
          () =>
            item.foods.map(food => {
              return (
                <div key={food.name}>
                  <input
                    type='radio'
                    name={food.name}
                    ref={register({ required: 'Required' })}
                  />
                  <p>{food.name}</p>
                  <p>{food.thaiName}</p>
                  {(errors as any)[food.name]}
                </div>
              );
            }),
          [item.foods]
        );
        return (
          <div key={item.name}>
            <span className='font-extrabold'>
              {item.name} ({item.thaiName}){Foods}
            </span>
          </div>
        );
      }),
    [storeData?.items]
  );

  return (
    <Modal modalStore={modalStore}>
      <h2 className='text-base font-extrabold'>{storeData?.name}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>{FoodMenu}</form>
    </Modal>
  );
};

export default SelectFoodModal;
