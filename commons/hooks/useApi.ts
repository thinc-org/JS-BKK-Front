import axios from 'axios';
import { useMemo } from 'react';

let baseURL = 'https://jsonplaceholder.typicode.com';
if (process.env.NODE_ENV === 'production') {
  baseURL = 'PRODUCTION URL';
}

const useApi = () => {
  const apiService = useMemo(
    () => ({
      client: axios.create({ baseURL })
    }),
    []
  );
  return apiService;
};

export default useApi;
