import React, { useContext, useCallback } from 'react';
import { useRouter } from 'next/router';
import { rootContext } from '../../_app';
import { UserInfo } from '../../../interfaces/interface.user';

const UserProfile: React.FC = () => {
  const { userStore } = useContext(rootContext);
  const router = useRouter();

  const Info =
    userStore.userInfo &&
    Object.entries(userStore.userInfo as UserInfo).map(([key, value]) => {
      return (
        <div key={key}>
          {key}: <div>{value}</div>
        </div>
      );
    });

  const logout = useCallback(() => {
    userStore.setToken('');
    userStore.setUserInfo(undefined);
    router.push('/login');
  }, []);

  return (
    <div>
      Profile
      {Info}
      <button type='button' onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
