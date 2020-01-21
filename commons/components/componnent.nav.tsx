import React from 'react';
import Link from 'next/link';

const Nav: React.FC<{}> = () => {
  // const router = useRouter();
  return (
    <nav className='bg-white flex flex-row items-center justify-around text-xs'>
      <Link href='/'>
        <a
          className='text-center flex flex-col items-center py-2 w-1/3'
          href='/'
        >
          <div className='w-5 h-5 bg-grey' />
          Conference
        </a>
      </Link>
      <Link href='/user/order'>
        <a
          className='text-center flex flex-col items-center py-2 w-1/3'
          href='/order'
        >
          <div className='w-5 h-5 bg-grey' />
          Food
        </a>
      </Link>
      <Link href='/user/networking/dashboard'>
        <a
          className='text-center flex flex-col items-center py-2 w-1/3'
          href='/networking/dashboard'
        >
          <div className='w-5 h-5 bg-grey' />
          Networking
        </a>
      </Link>
    </nav>
  );
};

export default Nav;
