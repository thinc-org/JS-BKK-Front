import { useCallback } from 'react';
import {
  FetchResult,
  isFetchingCompleted,
  isFetchingFailed
} from '../../interfaces/Commons';
import { MyOrder } from '../../interfaces/Orders';
import { FirebaseModule, useFirestoreSnapshot } from '../firebase';

const useMyOrder = (): FetchResult<MyOrder | null> => {
  const getDocument = useCallback(
    (firebase: FirebaseModule) =>
      firebase
        .getEnvDoc()
        .collection('foodChoices')
        .doc(firebase.auth().currentUser!.uid),
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
  if (!snapshot.exists) {
    return { status: 'completed', data: null };
  }
  return { status: 'completed', data: snapshot.data() as any };
};

export default useMyOrder;
