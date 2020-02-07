import { useMemo } from 'react';
import { Restaurant, Menu, Food } from '../../interfaces/Orders';
import {
  FetchResult,
  isFetchingFailed,
  isFetchingCompleted
} from '../../interfaces/Commons';
import { useRealtimeDatabaseSnapshot } from '../../commons/firebase';

export const useRestaurantAvailability = (
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
    return {
      status: 'completed',
      data: Math.max(0, restaurant.availability - result)
    };
  }, [dataState]);
};

export const useCustomizationChoiceAvailability = (
  restaurant: Restaurant,
  customization: Menu,
  customizationChoice: Food
): FetchResult<number | null> => {
  const dataState = useRealtimeDatabaseSnapshot(firebase =>
    firebase
      .getEnvRef()
      .child('selectionStats')
      .child(
        [restaurant.id, customization.id, customizationChoice.id].join('-')
      )
  );
  return useMemo(() => {
    if (customizationChoice.availability == null) {
      return { status: 'completed', data: null };
    }
    if (isFetchingFailed(dataState)) {
      return { status: 'error', error: dataState.error };
    }
    if (!isFetchingCompleted(dataState)) {
      return { status: 'loading' };
    }
    const result = dataState.data.val() || 0;
    return {
      status: 'completed',
      data: Math.max(0, customizationChoice.availability - result)
    };
  }, [dataState]);
};
