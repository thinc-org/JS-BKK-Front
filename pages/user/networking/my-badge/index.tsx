import React, { useContext } from 'react';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';

import Button from '../../../../commons/components/Button';
import { RootStore } from '../../../../interfaces/Commons';
import rootContext from '../../../../commons/context.root';

const MyBadge: React.FC = observer(() => {
  const { userStore } = useContext<RootStore>(rootContext);
  return (
    <div className='h-full px-12'>
      <div id='content' className='flex flex-col justify-center items-center'>
        <h3>You badge is</h3>
        <div className='bg-red-300 w-40 h-40 flex justify-center items-center m-6'>
          {userStore.userInfo?.currentBadge.type}
        </div>
        <p className='text-center'>
          There are 7 total badges. Please talk to other people and scan their
          QR code to obtain other 6 badges! The first 3 people will get the
          reward!
        </p>
      </div>
      <div className='flex justify-center'>
        <Link href='/user/networking/dashboard'>
          <a href='test'>
            <Button
              className='mx-auto mb-16 px-20 py-4 bg-black text-white'
              type='button'
            >
              Continue
            </Button>
          </a>
        </Link>
      </div>
    </div>
  );
});

export default MyBadge;
