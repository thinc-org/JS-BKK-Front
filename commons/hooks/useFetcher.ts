import { useState } from 'react';
import { FetchResult } from '../../interfaces/Commons';

const useFetcher = <T>(fetcher: () => Promise<T>): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(null);
  fetcher()
    .then(result => {
      setData(result);
    })
    .catch(err => {
      setError(err);
    });
  return { data, error };
};

export default useFetcher;
