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
        <p className='leading-none text-lg sm:text-xl'>
          📅
        </p>
        Conference
      </MyLink>
      <MyLink
        prefetch
        href='/user/order'
        className='text-center flex flex-col items-center py-2 w-1/3'
      >
        <p className='leading-none text-xl sm:text-2xl'>
          🍛
        </p>
        Food
      </MyLink>
      <MyLink
        prefetch
        href='/user/networking/dashboard'
        className='text-center flex flex-col items-center py-2 w-1/3'
      >
        <p className='leading-none text-lg sm:text-xl'>
          💬
        </p>
        Networking
      </MyLink>
    </nav>
  );
};

export default Nav;
