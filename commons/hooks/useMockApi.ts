import { useCallback } from 'react';
import { RestaurantGroup } from '../../interfaces/Orders';

const useMockApi = (arg: string) => {
  let result: null | RestaurantGroup[] = null;
  switch (arg) {
    default:
      result = null;
      break;
  }
  return useCallback(
    () =>
      new Promise<RestaurantGroup[] | null>((resolve, reject) => {
        if (result === null) reject();
        setTimeout(() => resolve(result), 500);
      }),
    []
  );
};

export default useMockApi;
