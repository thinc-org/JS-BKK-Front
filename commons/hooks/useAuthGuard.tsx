import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { when } from 'mobx';
import { authenticate } from '../../helpers/util';
import { RootStore } from '../../interfaces/interface.commons';

const useAuthGuard = (
  rootStore: RootStore
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [waiting, setWaiting] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const { userStore, authModalStore } = rootStore;

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
      authModalStore.setModalOpen(true);
    } else {
      authModalStore.setModalOpen(false);
    }
  }, [typeof window !== 'undefined' && window.location.href, waiting]);

  return [isModalOpen, setModalOpen];
};

export default useAuthGuard;
