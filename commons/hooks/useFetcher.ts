/* eslint-disable no-shadow */
import { useEffect, useState } from 'react';
import { FetchResult } from '../../interfaces/Commons';

const useDataPromise = <T>(fetcher: () => Promise<T>) => {
  const [state, updateState] = useState(
    (): FetchResult<T> => ({
      data: undefined,
      error: null,
      status: 'loading'
    })
  );
  useEffect(() => {
    fetcher()
      .then(data => {
        updateState(state => ({
          ...state,
          data,
          status: 'completed'
        }));
      })
      .catch(error => {
        updateState(state => ({
          ...state,
          error,
          status: 'error'
        }));
      });
  }, []);
  return state;
};

export default useDataPromise;
