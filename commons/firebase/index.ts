import getEnvName from './getEnvName';
import useFetcher from '../hooks/useFetcher';

export async function getFirebase() {
  return import(/* webpackChunkName: "firebase" */ './firebase');
}

export { getEnvName };

export type FirebaseModule = typeof import('../../commons/firebase/firebase');
export type User = import('firebase').User;
export type FirestoreSnapshot = import('firebase').firestore.DocumentSnapshot;

export function useFirebase() {
  return useFetcher(getFirebase);
}
