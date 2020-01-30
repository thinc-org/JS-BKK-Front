import React from 'react';
import MyLink from './MyLink';

const Nav: React.FC<{}> = () => {
  return (
    <nav className='bg-white flex flex-row items-center justify-around text-xs'>
      <MyLink
        prefetch={false}
        href='/'
        className='focus:outline-none text-center flex flex-col items-center py-2 w-1/3'
      >
        <div className='w-5 h-5 bg-grey' />
        Conference
      </MyLink>
      <MyLink
        prefetch
        href='/user/order'
        className='focus:outline-none text-center flex flex-col items-center py-2 w-1/3'
      >
        <div className='w-5 h-5 bg-grey' />
        Food
      </MyLink>
      <MyLink
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
