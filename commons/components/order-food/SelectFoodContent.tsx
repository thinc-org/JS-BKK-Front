import React, { useMemo } from 'react';
import { Choice, Food } from '../../../interfaces/Orders';
import { ModalStore } from '../../stores/authModalStores';
import useFoodSelection from '../../hooks/useFoodSelection';

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
                  required={!isMultipleSupport}
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
                {(errors as any)[food.id]}
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
        <h2 className='text-base font-extrabold'>{menuChoice?.title}</h2>(
        <form onSubmit={handleSubmit(onSubmit)}>
          {FoodMenu}
          <button type='submit'>submit</button>
        </form>
      </>
    ),
    [menuChoice, modalStore, multipleSupport]
  );
};

export default SelectFoodContent;
