import { useForm } from 'react-hook-form';
import { useEffect, useState, useCallback } from 'react';
import { Food, Restaurant } from '../../interfaces/Orders';

const useFoodSelection = (menuChoice?: Restaurant) => {
  const { handleSubmit, register, errors, getValues } = useForm<any>();
  const [multipleSupport, setMultiple] = useState<boolean[]>([]);

  const validate = useCallback(() => {
    const allValues = getValues();
    let matchedAllowedChoices = false;
    menuChoice?.customizations.forEach(item => {
      if (item?.allowedChoices) {
        const _matchedAllowedChoices = Object.keys(allValues).filter(
          key => !!(allValues as any)[key]
        );
        matchedAllowedChoices =
          _matchedAllowedChoices.length === item.allowedChoices;
      }
    });
    return matchedAllowedChoices;
  }, [menuChoice?.customizations]);

  useEffect(() => {
    const newMultiple: boolean[] = [];
    menuChoice?.customizations.forEach(item => {
      newMultiple.push(!!item?.allowedChoices);
    });
    setMultiple(newMultiple);
  }, [menuChoice?.customizations]);

  return {
    handleSubmit,
    register,
    multipleSupport,
    errors,
    validate,
    getValues
  };
};

export default useFoodSelection;
