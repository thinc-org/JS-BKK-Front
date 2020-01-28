import { useState, useEffect } from 'react';

const useMyOrder = (
  food: string,
  spiceLevel: string,
  drink: string
): [string, string, string] => {
  const [orderedFood, setOrderedFood] = useState();
  const [orderedSpice, setOrderedSpice] = useState();
  const [orderedDrink, setOrderDrink] = useState()

  useEffect(() => {
    setOrderedFood(food);
    setOrderDrink(drink);
    setOrderedSpice(spiceLevel);
  }, [food, spiceLevel, drink])

  return [orderedFood, orderedSpice, orderedDrink];
};

export default useMyOrder;