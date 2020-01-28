import { useCallback } from 'react';
import { Restaurant } from '../../interfaces/Orders';

const useMockApi = (arg: string) => {
  let result: null | Restaurant[] = null;
  switch (arg) {
    case 'order':
      result = [
        {
          key: 0,
          title: 'test',
          merchant: 'merchant 1',
          genres: ['pork', 'chicken'],
          allergics: ['seafood']
        },
        {
          key: 1,
          title: 'test',
          merchant: 'merchant 1',
          genres: ['pork', 'chicken']
        },
        {
          key: 2,
          title: 'test',
          merchant: 'merchant 1',
          genres: ['pork', 'chicken']
        }
      ] as Restaurant[];
      break;
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
