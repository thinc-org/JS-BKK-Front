import React, { useMemo } from 'react';
import { Restaurant, Food } from '../../interfaces/Orders';
import { ModalStore } from '../../commons/stores/authModalStores';
import useFoodSelection from '../../commons/hooks/useFoodSelection';
import Button from '../../commons/components/Button';

interface PropTypes {
  menuChoice?: Restaurant;
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
              <div className='flex items-center w-auto mt-2' key={food.id}>
                <label
                  htmlFor={item.id + j}
                  className='flex items-center cursor-pointer'
                >
                  {isMultipleSupport ? (
                    <input
                      id={item.id + j}
                      type='checkbox'
                      name={food.id}
                      ref={register({ validate })}
                    />
                  ) : (
                    <>
                      <input
                        id={item.id + j}
                        className='hidden'
                        value={food.id}
                        type='radio'
                        name={item.id}
                        ref={register({ required: 'Required' })}
                      />
                      <span className='flex-shrink-0 w-4 h-4 inline-block border border-grey' />
                    </>
                  )}
                  <div className='ml-2'>
                    <p>{food.title}</p>
                    {food.availability && <p>{food.availability} Left</p>}
                  </div>
                </label>
              </div>
            )
          );
        });

        return (
          <div className='mt-5' key={item.id}>
            <span className='font-extrabold text-base'>{item.title}</span>
            {Foods}
          </div>
        );
      }),
    [menuChoice?.customizations, multipleSupport]
  );

  return (
    <>
      <h2 className='text-base font-extrabold text-center'>
        {menuChoice?.title}
      </h2>
      <form
        className='flex flex-col justify-between min-h-500px'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>{FoodMenu}</div>
        <div className='flex flex-col'>
          <span>
            {Object.entries(errors).length !== 0 &&
              'all catagories is not selected'}
          </span>
          <Button
            className='w-auto py-2 bg-yellow-dark rounded-bg text-lg mt-5'
            type='submit'
          >
            Confirm
          </Button>
        </div>
      </form>
    </>
  );
};

export default SelectFoodContent;
