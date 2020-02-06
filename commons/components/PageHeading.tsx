/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
import React from 'react';
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
    <header
      className='flex flex-row items-start text-h text-white font-bold'
      data-authentication-state={authenticationStateDescription}
    >
      <div className='text-4xl pt-5 px-4 flex-auto'>{routeData.title}</div>
      <div className='px-4'>
        {isAuthenticated(authenticationState) && (
          <Button
            className='text-base border border-white rounded px-2 block mt-4'
            type='button'
            onClick={() => authenticationController.logout()}
          >
            Logout
          </Button>
        )}
      </div>
    </header>
  );
});

export default PageHeading;
