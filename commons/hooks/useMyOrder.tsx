import useFetcher from './useFetcher';
import { FetchResult } from '../../interfaces/Commons';
import { MyOrder } from '../../interfaces/Orders';

const useMyOrder = (): FetchResult<MyOrder> => {
  const myOrder = useFetcher<MyOrder>(
    () =>
      new Promise<MyOrder>(resolve => {
        setTimeout(
          () =>
            resolve({
              food: 'Chicken Green Curry Spagehetti',
              drink: 'Coke',
              spice: 'Level 2',
              dessert: 'Pudding'
            } as MyOrder),
          300
        );
      })
  );
  return myOrder;
};

export default useMyOrder;
