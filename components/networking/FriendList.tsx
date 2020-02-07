/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { Network } from '../../interfaces/Users';
import BadgeList from './BadgeList';

interface Props {
  networks: Network[] | any;
}

const FriendList: React.FC<Props> = ({ networks }) => {
  return networks
    ? networks.map(
        (network: { badge: number; name: string }, index: number) => {
          return (
            <div key={network.badge} className='px-3'>
              <div
                className={`py-3 flex flex-row justify-between items-center ${
                  index < networks.length - 1 ? 'border-b border-gray-400' : ''
                }`}
              >
                <div className='flex flex-row items-center'>
                  <BadgeList id={network.badge} className='h-8 mr-4' />
                  <p className='font-bold'>{network.name}</p>
                </div>
                <img src='/icons/arrow2.svg' alt='arrow' />
              </div>
            </div>
          );
        }
      )
    : null;
};

export default FriendList;
