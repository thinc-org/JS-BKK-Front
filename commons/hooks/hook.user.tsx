import { useContext, useEffect } from 'react';
import { when } from 'mobx';
import { rootContext } from '../../pages/_app';

const authenticate = (): Promise<any> => {
  return new Promise(resolve => {
    setTimeout(() => resolve({ name: 'new' }), 1000);
  });
};

export default () => {
  const { user } = useContext(rootContext);
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
