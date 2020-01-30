import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { RouteData } from '../../interfaces/Commons';
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
  return (
    <nav className='flex flex-row items-center text-h text-white'>
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
