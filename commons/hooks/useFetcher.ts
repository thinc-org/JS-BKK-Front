import { useLocalStore } from 'mobx-react-lite';
import { useEffect } from 'react';
import { FetchResult } from '../../interfaces/Commons';

const useDataPromise = <T>(fetcher: () => Promise<T>) => {
  const dataStore = useLocalStore(
    (): FetchResult<T> => ({
      data: undefined,
      error: null,
      status: 'loading'
    })
  );
  useEffect(() => {
    fetcher()
      .then(data => {
        dataStore.data = data;
        dataStore.status = 'completed';
      })
      .catch(error => {
        dataStore.error = error;
        dataStore.status = 'error';
      });
  }, []);
  return dataStore;
};

export default useDataPromise;
