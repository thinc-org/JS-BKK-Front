import React from 'react';
import MyLink from './MyLink';

const Nav: React.FC<{}> = () => {
  return (
    <nav className='bg-white flex flex-row items-center justify-around text-xs'>
      <MyLink
        prefetch={false}
        href='/'
        className='text-center flex flex-col items-center py-2 w-1/3'
      >
        <img
          className='w-5 h-5'
          src='/icons/navbar/tabschedule.svg'
          alt='schedule'
        />
        Schedule
      </MyLink>
      <MyLink
        prefetch
        href='/user/order'
        className='text-center flex flex-col items-center py-2 w-1/3'
      >
        <img
          className='w-5 h-5'
          src='/icons/navbar/tabfood.svg'
          alt='schedule'
        />
        Food
      </MyLink>
      <MyLink
        prefetch
        href='/user/networking/dashboard'
        className='text-center flex flex-col items-center py-2 w-1/3'
      >
        <img
          className='w-5 h-5'
          src='/icons/navbar/tabnetworking.svg'
          alt='schedule'
        />
        Networking
      </MyLink>
    </nav>
  );
};

export default Nav;
