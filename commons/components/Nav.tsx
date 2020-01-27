import React from 'react';
import Router from 'next/router';

const Nav: React.FC<{}> = () => {
  return (
    <nav className='bg-white flex flex-row items-center justify-around text-xs'>
      <div
        role='button'
        tabIndex={0}
        onKeyPress={() => Router.push('/')}
        onClick={() => Router.push('/')}
        className='focus:outline-none text-center flex flex-col items-center py-2 w-1/3'
      >
        <div className='w-5 h-5 bg-grey' />
        Conference
      </div>
      <div
        role='button'
        tabIndex={0}
        onKeyPress={() => Router.push('/')}
        onClick={() => Router.push('/user/order')}
        className='focus:outline-none text-center flex flex-col items-center py-2 w-1/3'
      >
        <div className='w-5 h-5 bg-grey' />
        Food
      </div>
      <div
        role='button'
        tabIndex={0}
        onKeyPress={() => Router.push('/')}
        onClick={() => Router.push('/user/networking/dashboard')}
        className='focus:outline-none text-center flex flex-col items-center py-2 w-1/3'
      >
        <div className='w-5 h-5 bg-grey' />
        Networking
      </div>
    </nav>
  );
};

export default Nav;
