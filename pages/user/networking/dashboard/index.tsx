import React, { useContext, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import QRCode from 'qrcode.react';
import { rootContext } from '../../../_app';

import BadgeItem from './component.badge';
import Button from '../../../../commons/components/component.button';
import { RootStore } from '../../../../interfaces/interface.commons';

const Loading: React.FC<{}> = () => <div>...Loading</div>;

const Dashboard: React.FC = observer(() => {
  const { userStore } = useContext<RootStore>(rootContext);
  const { name, currentBadge, badges } = userStore.userInfo || {};

  const BadgeItems = useMemo(
    () => (
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
    ),
    [currentBadge, badges]
  );

  return (
    <div className='px-10'>
      <span className='text-gray-500'>{name}</span>
      <div className='flex justify-center items-center my-16'>
        <div className='bg-gray-200 w-40 h-40 flex justify-center items-center'>
          {useMemo(
            () =>
              currentBadge && currentBadge.type ? (
                <QRCode
                  className='w-full h-full'
                  renderAs='svg'
                  value={currentBadge.type as string}
                />
              ) : (
                <Loading />
              ),
            [currentBadge]
          )}
        </div>
      </div>
      <hr />
      <div>
        <div className='flex justify-between my-6'>
          <p>Your Badge ({badges && badges.length + 1})</p>
          <Button className='font-semibold' type='button'>
            Open Camera
          </Button>
        </div>
        {BadgeItems}
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
});

export default Dashboard;
