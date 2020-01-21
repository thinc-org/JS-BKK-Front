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
    <nav className='flex flex-row items-center text-h text-white'>
      <div className='text-4xl font-sans py-5 px-4'>{routeData.title}</div>
      {userStore.isAuthenticated() && (
        <Button type='button' onClick={() => userStore.logout()}>
          Logout
        </Button>
      )}
    </nav>
  );
};

export default Viewing;
