import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { rootContext } from '../../../_app';
import { UserStore } from '../../../../interfaces/interface.user';

const UserProfile: React.FC = observer(() => {
  const { userStore } = useContext<{ userStore: UserStore }>(rootContext);

  return (
    <div className='h-full flex flex-col'>
      <div className='text-sm'>
        Ordering as{' '}
        <span className='font-bold'>{userStore.userInfo?.username}</span>
      </div>
      <div className='h-full text-center w-full flex flex-col items-center justify-center'>
        <div className='max-w-small'>
          <div className='mb-5 text-2xl font-bold text-center'>
            Congratulations! You are the winner.
          </div>
          <div className='text-center'>
            Please <span className='font-bold'>claim your reward</span>
            at the information desk.
          </div>
        </div>
      </div>
    </div>
  );
});

export default UserProfile;
