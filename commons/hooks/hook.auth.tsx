import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { when } from 'mobx';
import { UserStore } from '../../interfaces/interface.user';
import { authenticate } from '../../helpers/util';

const useAuthGuard = (userStore: UserStore) => {
  const router = useRouter();
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      userStore.setToken(token);
    }
    setWaiting(false);

    when(
      () => {
        return !!userStore.token && !userStore.userInfo;
      },
      () => {
        setWaiting(true);
        authenticate(userStore.token)
          .then(userInfo => {
            userStore.setUserInfo(userInfo);
          })
          .catch(() => {
            userStore.setToken('');
            localStorage.removeItem('token');
          })
          .finally(() => {
            setWaiting(false);
          });
      }
    );
  }, []);

  useEffect(() => {
    const isInGuardedRoute = window.location.href.includes('/user');
    if (!waiting && isInGuardedRoute && !userStore.isAuthenticated()) {
      router.push('/');
    }
  }, [typeof window !== 'undefined' && window.location.href, waiting]);
};

export default useAuthGuard;
