import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/functions';

var firebaseConfig = {
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

export const { auth, database, firestore, functions } = firebase;

export function getEnvName() {
  const match = String(window.location.search).match(/[&?]env=(\w+)/);
  if (match) {
    return match[1];
  } else {
    return 'production';
  }
}

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
