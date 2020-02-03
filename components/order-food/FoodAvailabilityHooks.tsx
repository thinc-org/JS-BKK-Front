import { useMemo } from 'react';
import { Restaurant } from '../../interfaces/Orders';
import {
  FetchResult,
  isFetchingFailed,
  isFetchingCompleted
} from '../../interfaces/Commons';
import { useRealtimeDatabaseSnapshot } from '../../commons/firebase';

const useRestaurantAvailability = (
  restaurant: Restaurant
): FetchResult<number> => {
  const dataState = useRealtimeDatabaseSnapshot(firebase =>
    firebase
      .getEnvRef()
      .child('selectionStats')
      .child(restaurant.id)
  );
  return useMemo(() => {
    if (isFetchingFailed(dataState)) {
      return { status: 'error', error: dataState.error };
    }
    if (!isFetchingCompleted(dataState)) {
      return { status: 'loading' };
    }
    const result = dataState.data.val() || 0;
    return { status: 'completed', data: restaurant.availability - result };
  }, [dataState]);
};

export default useRestaurantAvailability;
