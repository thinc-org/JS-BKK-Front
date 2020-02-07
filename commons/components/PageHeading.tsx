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
  isAuthenticated,
  ProfileData
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
  const getName = (profile: ProfileData) =>
    `${profile.firstname} ${profile.lastname}`;
  return (
    <header
      className='text-h text-white font-bold relative'
      data-authentication-state={authenticationStateDescription}
    >
      <div className='text-4xl pt-10 px-4 flex-auto'>{routeData.title}</div>
      <div className='px-4 right-0 top-0 absolute'>
        {isAuthenticated(authenticationState) && (
          <Button
            className='text-base border border-white rounded px-2 block mt-4'
            type='button'
            onClick={() => authenticationController.logout()}
          >
            Logout ({getName(authenticationState.data.profile)})
          </Button>
        )}
      </div>
    </header>
  );
});

export default PageHeading;
