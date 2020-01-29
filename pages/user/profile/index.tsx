import React, { useCallback } from 'react';
import {
  useAuthenticationController,
  withRequiredAuthentication
} from '../../../components/authentication';

const UserProfile: React.FC = () => {
  const controller = useAuthenticationController();

  const logout = useCallback(() => {
    controller.logout();
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

export default withRequiredAuthentication(UserProfile);
