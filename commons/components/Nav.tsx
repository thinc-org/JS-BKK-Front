import React, { useContext, useCallback } from 'react';
import { RootStore } from '../../interfaces/Commons';
import rootContext from '../context.root';
import MyLink from './MyLink';

const Nav: React.FC<{}> = () => {
  const { authModalStore, userStore } = useContext<RootStore>(rootContext);

  const handleModalOpen = useCallback(() => {
    if (!userStore.isAuthenticated()) {
      authModalStore.setModalOpen(true);
    }
  }, [userStore]);

  const handleModalClose = useCallback(() => {
    if (!userStore.isAuthenticated()) {
      authModalStore.setModalOpen(false);
      authModalStore.isHidden = true;
      authModalStore.isAnimating = false;
    }
  }, [userStore]);

  return (
    <nav className='bg-white flex flex-row items-center justify-around text-xs'>
      <MyLink
        onClick={handleModalClose}
        prefetch
        href='/'
        className='focus:outline-none text-center flex flex-col items-center py-2 w-1/3'
      >
        <div className='w-5 h-5 bg-grey' />
        Conference
      </MyLink>
      <MyLink
        onClick={handleModalOpen}
        prefetch
        href='/user/order'
        className='focus:outline-none text-center flex flex-col items-center py-2 w-1/3'
      >
        <div className='w-5 h-5 bg-grey' />
        Food
      </MyLink>
      <MyLink
        onClick={handleModalOpen}
        prefetch
        href='/user/networking/dashboard'
        className='focus:outline-none text-center flex flex-col items-center py-2 w-1/3'
      >
        <div className='w-5 h-5 bg-grey' />
        Networking
      </MyLink>
    </nav>
  );
};

export default Nav;
