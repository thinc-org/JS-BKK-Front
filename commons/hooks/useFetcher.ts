import { useLocalStore } from 'mobx-react-lite';
import { useEffect } from 'react';

const useDataPromise = <T>(fetcher: () => Promise<T>) => {
  const dataStore = useLocalStore(() => ({
    data: null as T | null,
    error: null
  }));
  useEffect(() => {
    fetcher()
      .then(data => {
        dataStore.data = data;
      })
      .catch(error => {
        dataStore.error = error;
      });
  }, []);
  return dataStore;
};

export default useDataPromise;
