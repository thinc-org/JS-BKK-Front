/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import { RouteData } from '../../interfaces/interface.commons';
import Button from './component.button';
import { rootContext } from '../../pages/_app';

interface PropTypes {
  routeData: RouteData;
}

const Viewing: React.FC<PropTypes> = ({ routeData }) => {
  const { userStore } = useContext(rootContext);
  return (
    <nav className='flex flex-row justify-center items-center'>
      <div className='text-4xl font-sans py-4'>{routeData.title}</div>
      {userStore.isAuthenticated() && (
        <Button type='button' onClick={() => userStore.logout()}>
          Logout
        </Button>
      )}
    </nav>
  );
};

export default Viewing;
