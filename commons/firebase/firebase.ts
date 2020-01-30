import firebase from 'firebase/app';

/* eslint import/no-duplicates: off */
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/functions';

import getEnvName from './getEnvName';

const firebaseConfig = {
  apiKey: 'AIzaSyCDBqjN2IOo-sycp9ITPgSNpc_KBPtjTYg',
  authDomain: 'javascriptbangkok-companion.firebaseapp.com',
  databaseURL: 'https://javascriptbangkok-companion.firebaseio.com',
  projectId: 'javascriptbangkok-companion',
  storageBucket: 'javascriptbangkok-companion.appspot.com',
  messagingSenderId: '838146383473',
  appId: '1:838146383473:web:91601ee661d34794a085d0',
  measurementId: 'G-FPZZTTK06Y'
};

firebase.initializeApp(firebaseConfig);

export const { auth, database, firestore } = firebase;
export const functions = (region: string) => firebase.app().functions(region);

export function getEnvRef() {
  const env = getEnvName();
  return firebase.database().ref(`environments/${env}`);
}

export function getEnvDoc() {
  const env = getEnvName();
  return firebase
    .firestore()
    .collection('environments')
    .doc(env);
}
