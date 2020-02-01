import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import {
  RouteData,
  isFetchingFailed,
  isFetchingCompleted
} from '../../interfaces/Commons';
import Button from './Button';
import {
  useAuthenticationState,
  useAuthenticationController,
  isAuthenticated
} from '../../components/authentication';

interface PropTypes {
  routeData: RouteData;
}

const PageHeading: React.FC<PropTypes> = observer(({ routeData }) => {
  const authenticationState = useAuthenticationState();
  const authenticationController = useAuthenticationController();
  const authenticationStateDescription = isFetchingFailed(authenticationState)
    ? 'checking-failed'
    : !isFetchingCompleted(authenticationState)
    ? 'checking'
    : isAuthenticated(authenticationState)
    ? 'authenticated'
    : 'unauthenticated';
  return (
    <nav
      className='flex flex-row items-center text-h text-white'
      data-authentication-state={authenticationStateDescription}
    >
      <div className='text-4xl pt-5 px-4'>{routeData.title}</div>
      {isAuthenticated(authenticationState) && (
        <Button type='button' onClick={() => authenticationController.logout()}>
          Logout
        </Button>
      )}
    </nav>
  );
});

export default PageHeading;
