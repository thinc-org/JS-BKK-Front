/* eslint-disable @typescript-eslint/indent */
import { useCallback, useEffect, useState } from 'react';
import {
  getEnvName,
  getFirebase,
  FirebaseModule,
  useFirestoreSnapshot,
  useRealtimeDatabaseSnapshot
} from '../firebase';
import { NetworkingProfile } from '../../interfaces/Users';
import {
  Networking,
  isFetchingFailed,
  isFetchingCompleted
} from '../../interfaces/Commons';

export default async function addUserToNetwork(uid: string) {
  const firebase = await getFirebase();
  const _addUserToNetwork = firebase
    .functions('asia-northeast1')
    .httpsCallable('addUserToNetwork');
  await _addUserToNetwork({
    uid,
    env: getEnvName()
  });
}

export async function createNetworkingProfile(bio: string) {
  const firebase = await getFirebase();
  const _createNetworkingProfile = firebase
    .functions('asia-northeast1')
    .httpsCallable('createNetworkingProfile');
  await _createNetworkingProfile({
    uid: firebase.auth().currentUser!.uid,
    env: getEnvName(),
    bio
  });
}

export async function updateBio(bio: string) {
  const firebase = await getFirebase();
  const _createNetworkingProfile = firebase
    .functions('asia-northeast1')
    .httpsCallable('updateBio');
  await _createNetworkingProfile({
    bio,
    env: getEnvName()
  });
}

// export async function addWinner() {
//   const firebase = await getFirebase();
//   const add = firebase.functions('asia-northeast1').httpsCallable('addWinner');
//   return add({
//     env: getEnvName()
//   });
// }

export const useNetworking = (): Networking => {
  const [uuid, setUuid] = useState();

  const getDocument = useCallback(
    (firebase: FirebaseModule) =>
      firebase
        .getEnvDoc()
        .collection('networkingProfiles')
        .doc(firebase.auth().currentUser!.uid),
    []
  );

  const getWinner = useCallback(
    (firebase: FirebaseModule) =>
      firebase
        .getEnvRef()
        .child('networking')
        .child('winners'),
    []
  );

  const snapshotFetchResult = useFirestoreSnapshot(getDocument);
  const realtimeFetchResult = useRealtimeDatabaseSnapshot(getWinner);

  useEffect(() => {
    // addWinner();
    getFirebase().then(firebase => {
      setUuid(firebase.auth().currentUser!.uid);
    });
  }, []);

  const winners = realtimeFetchResult.data?.val();
  const winnersArray = winners ? Object.entries(winners) : [];
  console.log(winnersArray, 'arr');
  const hasAllWinner = winnersArray.length >= 3;
  const isWinner =
    hasAllWinner &&
    winnersArray.slice(0, 3).filter(winner => {
      return winner[0] === uuid;
    }).length !== 0;

  if (isFetchingFailed(snapshotFetchResult)) {
    return { status: 'error', error: snapshotFetchResult.error };
  }
  if (!isFetchingCompleted(snapshotFetchResult)) {
    return { status: 'loading' };
  }

  const snapshot = snapshotFetchResult.data;
  const result = {
    status: 'completed',
    data: snapshot.data() as NetworkingProfile,
    hasAllWinner,
    isWinner,
    uuid: snapshot.id
  };

  if (result.status === 'completed' && result.data === undefined) {
    return { status: 'notRegistered' };
  }
  return result;
};
