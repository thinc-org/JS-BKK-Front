import { useLocalStore } from 'mobx-react-lite';

const useDataPromise = <T>(fetcher: () => Promise<T>) => {
  const dataStore = useLocalStore(() => ({
    data: null as T | null,
    error: null
  }));
  fetcher()
    .then(data => {
      dataStore.data = data;
    })
    .catch(error => {
      dataStore.error = error;
    });
  return dataStore;
};

export default useDataPromise;
