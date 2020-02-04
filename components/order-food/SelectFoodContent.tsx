import React, { useMemo, useState } from 'react';
import { Restaurant, Menu, Food } from '../../interfaces/Orders';
import { ModalStore } from '../../commons/stores/authModalStores';
import useFoodSelection from '../../commons/hooks/useFoodSelection';
import Button from '../../commons/components/Button';
import submitFoodOrder from '../../commons/hooks/submitFoodOrder';
import {
  ModalType,
  FetchResult,
  isFetchingCompleted
} from '../../interfaces/Commons';
import { useCustomizationChoiceAvailability } from './FoodAvailabilityHooks';

interface PropTypes {
  menuChoice?: Restaurant;
  modalStore: ModalStore;
}

function getCustomizations(
  menuChoice: Restaurant,
  multipleSupport: boolean[],
  values: any
): { [key: string]: string[] } {
  const customizations: { [key: string]: string[] } = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [index, item] of Array.from(menuChoice.customizations.entries())) {
    const isMultipleSupport = multipleSupport[index];
    if (isMultipleSupport) {
      // eslint-disable-next-line no-restricted-syntax
      for (const choice of item.choices) {
        if (values[choice.id]) {
          if (!customizations[item.id]) customizations[item.id] = [];
          customizations[item.id].push(choice.id);
        }
      }
    } else {
      customizations[item.id] = [values[item.id]];
    }
  }
  return customizations;
}

const SelectFoodContent: React.FC<PropTypes> = ({ menuChoice, modalStore }) => {
  const {
    handleSubmit,
    register,
    multipleSupport,
    errors,
    validate
  } = useFoodSelection(menuChoice);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      if (!menuChoice) {
        throw new Error('No restaurant selected.');
      }
      const customizations = getCustomizations(
        menuChoice,
        multipleSupport,
        values
      );
      await submitFoodOrder(menuChoice.id, customizations);
      modalStore.setModalOpen(false);
    } catch (e) {
      // @TODO check if error is about stock lasts
      modalStore.setModalType(ModalType.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const FoodMenu = useMemo(
    () =>
      menuChoice?.customizations.map((item, index) => {
        const customizationChoices = item.choices.map((food, j) => {
          const isMultipleSupport = multipleSupport[index];
          return (
            <CustomizationChoiceAvailabilityConnector
              restaurant={menuChoice}
              customization={item}
              customizationChoice={food}
            >
              {availabilityResult => {
                const availability = isFetchingCompleted(availabilityResult)
                  ? availabilityResult.data
                  : '…';
                const isDisabled =
                  !isFetchingCompleted(availabilityResult) ||
                  availabilityResult.data === 0;
                return (
                  isMultipleSupport !== undefined && (
                    <div
                      className='flex items-center w-auto mt-2'
                      key={food.id}
                    >
                      <label
                        htmlFor={item.id + j}
                        className='flex items-center cursor-pointer'
                      >
                        {isMultipleSupport ? (
                          <input
                            disabled={isDisabled}
                            id={item.id + j}
                            type='checkbox'
                            name={food.id}
                            ref={register({ validate })}
                          />
                        ) : (
                          <>
                            <input
                              disabled={isDisabled}
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
                          {availability != null ? (
                            <p className='font-bold text-bkk-blue whitespace-no-wrap'>
                              {availability} left
                            </p>
                          ) : null}
                        </div>
                      </label>
                    </div>
                  )
                );
              }}
            </CustomizationChoiceAvailabilityConnector>
          );
        });

        return (
          <div className='mt-5' key={item.id}>
            <span className='font-extrabold text-base'>{item.title}</span>
            {customizationChoices}
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
              'Please select your preferred meal'}
          </span>
          {!isSubmitting && (
            <Button
              className='w-auto py-2 bg-yellow-dark rounded-bg text-lg mt-5'
              type='submit'
            >
              Confirm
            </Button>
          )}
        </div>
      </form>
    </>
  );
};

const CustomizationChoiceAvailabilityConnector: React.FC<{
  restaurant: Restaurant;
  customization: Menu;
  customizationChoice: Food;
  children: (result: FetchResult<number | null>) => React.ReactNode;
}> = ({ restaurant, customization, customizationChoice, children }) => {
  const result = useCustomizationChoiceAvailability(
    restaurant,
    customization,
    customizationChoice
  );
  return <>{children(result)}</>;
};

export default SelectFoodContent;
