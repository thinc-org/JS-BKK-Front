import {
  FetchResult,
  isFetchingCompleted,
  isFetchingFailed
} from '../../interfaces/Commons';
import { MyOrder } from '../../interfaces/Orders';
import { useFirebase, FirestoreSnapshot } from '../firebase';
import { useEffect, useState } from 'react';

const useMyOrder = (): FetchResult<MyOrder | null> => {
  const firebaseFetchResult = useFirebase();

  const [snapshot, setSnapshot] = useState<FirestoreSnapshot | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isFetchingCompleted(firebaseFetchResult)) {
      return () => {};
    }
    const firebase = firebaseFetchResult.data;
    return firebase
      .getEnvDoc()
      .collection('foodChoices')
      .doc(firebase.auth().currentUser!.uid)
      .onSnapshot(setSnapshot, setError);
  }, [firebaseFetchResult]);

  if (isFetchingFailed(firebaseFetchResult)) {
    return { status: 'error', error: firebaseFetchResult.error };
  }
  if (!isFetchingCompleted(firebaseFetchResult)) {
    return { status: 'loading' };
  }
  if (error) {
    return { status: 'error', error: error };
  }
  if (!snapshot) {
    return { status: 'loading' };
  }
  if (!snapshot.exists) {
    return { status: 'completed', data: null };
  }
  return { status: 'completed', data: snapshot.data() as any };
};

export default useMyOrder;
