import { RestaurantGroup } from '../../interfaces/Orders';
import { FetchResult } from '../../interfaces/Commons';
import useFetcher from './useFetcher';
import { getFirebase } from '../firebase';

const useOrders = (): FetchResult<RestaurantGroup[]> => {
  return useFetcher<RestaurantGroup[]>(async () => {
    const firebase = await getFirebase();
    const food = await firebase
      .getEnvDoc()
      .collection('configuration')
      .doc('food')
      .get();
    console.log('FOOD LIST', food);
    return food.data()!.menu.groups;
  });
};

export default useOrders;
