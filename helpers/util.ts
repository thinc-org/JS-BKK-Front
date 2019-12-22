// eslint-disable-next-line import/prefer-default-export
export const authenticate = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (token === 'validtoken') {
        resolve({ name: 'new', username: 'new5558', points: 10 });
      } else {
        reject();
      }
    }, 1000);
  });
};
