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
              title: 'Floor 8: Food stalls',
              food: 'Pad Thai with Fresh Shrimp (ผัดไทยกุ้งใหญ่สด)',
              food2: 'Sushi (ปลาดิบ)',
              allowedChoices: 2,
              drink: 'Coke',
              spice: 'Level 2',
              dessert: 'Pudding',
              side: "Spare ribs"
            } as MyOrder),
          300
        );
      })
  );
  return myOrder;
};

export default useMyOrder;
