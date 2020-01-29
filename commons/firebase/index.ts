import getEnvName from './getEnvName';

export async function getFirebase() {
  return import(/* webpackChunkName: "firebase" */ './firebase');
}

export { getEnvName };

export type FirebaseModule = typeof import('../../commons/firebase/firebase');
export type User = import('firebase').User;
export type FirestoreSnapshot = import('firebase').firestore.DocumentSnapshot;
