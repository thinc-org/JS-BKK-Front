import React from 'react';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import Box from './box';

const Portal: React.FC = observer(() => {
  return (
    <div>
      <div className='w-screen flex justify-center'>
        <Box name='Logo' />
      </div>
      <div className='flex justify-center mt-100px'>
        <Link href='/schedule'>
          <div>
            <Box name='Schedule' />
          </div>
        </Link>
        <div className='ml-20px'>
          <Link href='/user/order'>
            <div>
              <Box name='Order Food' />
            </div>
          </Link>
        </div>
      </div>
      <div className='flex justify-center mt-26px'>
        <div>
          <Link href='/user/networking/dashboard'>
            <div>
              <Box name='Networking' />
            </div>
          </Link>
        </div>
        <div className='ml-20px'>
          <Box name='Log out' />
        </div>
      </div>
    </div>
  );
});
export default Portal;
