import axios, { AxiosRequestConfig } from 'axios';
import { useContext, useMemo } from 'react';
import { UserStore } from '../../interfaces/interface.user';
import { rootContext } from '../../pages/_app';
import { RootStore } from '../../interfaces/interface.commons';

let baseURL = 'https://jsonplaceholder.typicode.com';
if (process.env.NODE_ENV === 'production') {
  baseURL = 'PRODUCTION URL';
}

const createRequestHandler = (userStore: UserStore) => (
  request: AxiosRequestConfig
) => {
  request.headers.authorization = `Bearer ${userStore.token}`;
  return request;
};

const useApi = () => {
  const { userStore } = useContext<RootStore>(rootContext);
  const apiService = useMemo(
    () => ({
      client: axios
        .create({
          baseURL
        })
        .interceptors.request.use(createRequestHandler(userStore), error => {
          return Promise.reject(error);
        })
    }),
    [userStore.token]
  );
  return apiService;
};

export default useApi;
