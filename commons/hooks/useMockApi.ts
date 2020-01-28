import { useCallback } from 'react';
import { Restaurant } from '../../interfaces/Orders';

const useMockApi = (arg: string) => {
  let result: null | Restaurant[] = null;
  switch (arg) {
    default:
      result = null;
      break;
  }
  return useCallback(
    () =>
      new Promise<Restaurant[] | null>((resolve, reject) => {
        if (result === null) reject();
        setTimeout(() => resolve(result), 500);
      }),
    []
  );
};

export default useMockApi;
