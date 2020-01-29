export async function getFirebase() {
  return import(/* webpackChunkName: "firebase" */ './firebase');
}
