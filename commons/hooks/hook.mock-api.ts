import { useCallback } from 'react';
import { Order } from '../../interfaces/interface.order';
import {Schedule} from '../../interfaces/interface.schedule';

const useMockApi = (arg: string) => {
  let result: null | Order[] | Schedule[] = null;
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
    case 'schedule':
      result = [
        {
          key : 1,
          topics : "JS IS GOD",
          speakers : "DONT KNOW",
          hours :"09",
          minutes : "30",
          description : "DONT DONT KNOW",
          happening : true,
          happened : true,
        },
        {
          key : 2,
          topics : "JS IS VERY GOD",
          speakers : "JS JS JS",
          hours :"10",
          minutes : "30",
          description : "DONT DONT KNOW",
          happening : true,
          happened : false,
        },
        {
          key : 3,
          topics : "JS IS VERY GOD",
          speakers : "JS JS JS",
          hours :"10",
          minutes : "30",
          description : "DONT DONT KNOW",
          happening : false,
          happened : false,
        },
      ] as Schedule[];
      break;
    default:
      result = null;
      break;
  }
  return useCallback(
    () =>
      new Promise<Order[] | null | Schedule[]>((resolve, reject) => {
        if (result === null) reject();
        setTimeout(() => resolve(result), 500);
      }),
    []
  );
};

export default useMockApi;
