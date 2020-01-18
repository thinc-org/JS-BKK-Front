import React from 'react';
import Link from 'next/link';

const Nav: React.FC<{}> = () => {
  // const router = useRouter();
  return (
    <nav className='bg-gray-400 flex flex-row items-center justify-around'>
      <Link href='/'>
        <a className='text-center text-md font-semibold flex-grow py-5' href='/'>Conference</a>
      </Link>
      <Link href='/user/order'>
        <a className='text-center text-md font-semibold flex-grow py-5' href='/order'>Food</a>
      </Link>
      <Link href='/user/networking/dashboard'>
        <a className='text-center text-md font-semibold flex-grow py-5' href='/networking/dashboard'>Networking</a>
      </Link>
    </nav>
  );
};

export default Nav;
