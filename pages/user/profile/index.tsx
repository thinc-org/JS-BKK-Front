import React, { useMemo, useContext, useCallback } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { rootContext } from '../../_app';
import { UserInfo } from '../../../interfaces/interface.user';

const UserProfile: React.FC = () => {
  const { userStore } = useContext(rootContext);
  const router = useRouter();

  const basicStyles = useMemo(
    () => css`
      color: green;
    `,
    []
  );

  const Basic = useMemo(
    () => styled.div`
      ${basicStyles};
    `,
    []
  );

  const Info =
    userStore.userInfo &&
    Object.entries(userStore.userInfo as UserInfo).map(([key, value]) => {
      return (
        <div key={key}>
          {key}: <Basic>{value}</Basic>
        </div>
      );
    });

  const logout = useCallback(() => {
    userStore.setToken('');
    userStore.setUserInfo(undefined);
    router.push('/login');
  }, []);

  return (
    <div css={basicStyles}>
      Profile
      {Info}
      <button type='button' onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
