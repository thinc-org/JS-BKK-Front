import { createContext, useContext, useEffect } from 'react';
import { when } from 'mobx';
import UserStore from '../stores/store.user';

const authenticate = (): Promise<any> => {
  return new Promise(resolve => {
    setTimeout(() => resolve({ name: 'new' }), 1000);
  });
};

const userContext = createContext(new UserStore());

export default userContext;

export const useUserStore = () => {
  const user = useContext(userContext);
  useEffect(() => {
    when(
      () => {
        return !!user.token && !user.userInfo;
      },
      () => {
        authenticate().then(userInfo => {
          user.setUserInfo(userInfo);
        });
      }
    );
  }, []);
  return user;
};
