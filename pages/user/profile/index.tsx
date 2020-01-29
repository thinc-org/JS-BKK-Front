import React, { useContext, useCallback } from 'react';
import { useRouter } from 'next/router';
import { RootStore } from '../../../interfaces/Commons';
import rootContext from '../../../commons/context.root';

const UserProfile: React.FC = () => {
  const { userStore } = useContext<RootStore>(rootContext);
  const router = useRouter();

  const logout = useCallback(() => {
    userStore.setToken('');
    userStore.setUserInfo(undefined);
    router.push('/login');
  }, []);

  return (
    <div>
      Profile
      <button type='button' onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
