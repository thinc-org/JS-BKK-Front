import React, { useContext } from 'react';
import Button from '../../../../commons/components/component.button';
import BadgeItem from './component.badge';
import { rootContext } from '../../../_app';
import { UserStore } from '../../../../interfaces/interface.user';

const Dashboard: React.FC = () => {
  const { userStore } = useContext<{ userStore: UserStore }>(rootContext);
  const { name, currentBadge, badges } = userStore.userInfo || {};

  return (
    <div className='px-10'>
      <span className='text-gray-500'>{name}</span>
      <div className='flex justify-center items-center my-16'>
        <div className='bg-gray-200 w-40 h-40 flex justify-center items-center'>
          QR CODE
        </div>
      </div>
      <hr />
      <div>
        <header className='flex justify-between my-6'>
          <p>Your Badge ({badges && badges.length + 1})</p>
          <Button className='font-semibold' type='button'>Open Camera</Button>
        </header>
        <div className='flex overflow-x-auto'>
          {currentBadge &&
            badges &&
            [currentBadge, ...badges].map(
              badge =>
                badge && (
                  <BadgeItem
                    key={`badge-${badge.owner}-${badge.type}`}
                    owner={badge.owner}
                    type={badge.type}
                  />
                )
            )}
        </div>
      </div>
      <div className='mt-12'>
        <span>No idea? Here are some questions!</span>
        <ul className='pl-16'>
          <li>
            <span className='block py-1'>Where do you work?</span>
          </li>
          <li>
            <span className='block py-1'>What is your slack?</span>
          </li>
          <li>
            <span className='block py-1'>...</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
