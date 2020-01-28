import React, { useMemo } from 'react';
import { Choice, Food } from '../../../interfaces/Orders';
import { ModalStore } from '../../stores/authModalStores';
import useFoodSelection from '../../hooks/useFoodSelection';
import Button from '../Button';

interface PropTypes {
  menuChoice?: Choice;
  modalStore: ModalStore;
}

const SelectFoodContent: React.FC<PropTypes> = ({ menuChoice, modalStore }) => {
  const {
    handleSubmit,
    register,
    multipleSupport,
    errors,
    validate
  } = useFoodSelection(menuChoice);

  const onSubmit = (values: Food[]) => {
    // eslint-disable-next-line no-console
    modalStore.setModalOpen(false);
    console.log(values, 'value');
  };

  const FoodMenu = useMemo(
    () =>
      menuChoice?.customizations.map((item, index) => {
        const Foods = item.choices.map((food, j) => {
          const isMultipleSupport = multipleSupport[index];
          return (
            isMultipleSupport !== undefined && (
              <div key={food.id}>
                <input
                  id={item.id + j}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...(!isMultipleSupport && { value: food.id })}
                  type={isMultipleSupport ? 'checkbox' : 'radio'}
                  name={isMultipleSupport ? food.id : item.id}
                  ref={register(
                    isMultipleSupport ? { validate } : { required: 'Required' }
                  )}
                />
                <p>{food.title}</p>
                {food.availability && <p>{food.availability} Left</p>}
              </div>
            )
          );
        });
        return (
          <div key={item.id}>
            <span className='font-extrabold'>{item.title}</span>
            {Foods}
          </div>
        );
      }),
    [menuChoice?.customizations, multipleSupport]
  );
  return useMemo(
    () => (
      <>
        <h2 className='text-base font-extrabold'>{menuChoice?.title}</h2>
        <form className='overflow-y-scroll' onSubmit={handleSubmit(onSubmit)}>
          {FoodMenu}
          <div className='flex flex-col'>
            <span>
              {Object.entries(errors).length !== 0 &&
                'all catagories is not selected'}
            </span>
            <Button type='submit'>submit</Button>
          </div>
        </form>
      </>
    ),
    [menuChoice, modalStore, multipleSupport, errors]
  );
};

export default SelectFoodContent;
