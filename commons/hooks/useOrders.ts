import { useCallback } from 'react';
import { RestaurantGroup } from '../../interfaces/Orders';
import {
  FetchResult,
  isFetchingFailed,
  isFetchingCompleted
} from '../../interfaces/Commons';
import { FirebaseModule, useFirestoreSnapshot } from '../firebase';

type FoodConfiguration = {
  menu: {
    groups: RestaurantGroup[];
  };
  orderingPeriodEndTime: number;
};

const useOrders = (): FetchResult<FoodConfiguration> => {
  const getDocument = useCallback(
    (firebase: FirebaseModule) =>
      firebase
        .getEnvDoc()
        .collection('configuration')
        .doc('food'),
    []
  );
  const snapshotFetchResult = useFirestoreSnapshot(getDocument);
  if (isFetchingFailed(snapshotFetchResult)) {
    return { status: 'error', error: snapshotFetchResult.error };
  }
  if (!isFetchingCompleted(snapshotFetchResult)) {
    return { status: 'loading' };
  }
  const snapshot = snapshotFetchResult.data;
  return { status: 'completed', data: snapshot.data() as any };
};

export default useOrders;
