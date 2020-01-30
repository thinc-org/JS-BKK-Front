import { getFirebase, getEnvName } from '../firebase';

export default async function submitFoodOrder(
  restaurantId: string,
  customizations: { [key: string]: string[] }
) {
  const firebase = await getFirebase();
  const selectFoodChoice = firebase
    .functions('asia-northeast1')
    .httpsCallable('selectFoodChoice');
  await selectFoodChoice({
    restaurantId,
    customizations,
    env: getEnvName()
  });
}
