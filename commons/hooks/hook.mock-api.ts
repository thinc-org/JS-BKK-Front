import { useCallback } from 'react';
import { Order } from '../../interfaces/interface.order';

const useMockApi = (arg: string) => {
  let result: null | Order[] = null;
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
      ] as Order[];
      break;
    default:
      result = null;
      break;
  }
  return useCallback(
    () =>
      new Promise<Order[] | null>((resolve, reject) => {
        if (result === null) reject();
        setTimeout(() => resolve(result), 500);
      }),
    []
  );
};

export default useMockApi;
