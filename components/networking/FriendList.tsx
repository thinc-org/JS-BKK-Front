/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { Network } from '../../interfaces/Users';
import BadgeList from './BadgeList';

interface Props {
  openModal: (profile: Network) => void;
  networks: Network[] | any;
}

const FriendList: React.FC<Props> = ({ networks, openModal }) => {
  return networks
    ? networks.map((network: Network, index: number) => {
        return (
          <div
            onClick={() => openModal(network)}
            onKeyPress={() => openModal(network)}
            role='button'
            key={network.uid}
            className='px-3 cursor-pointer'
            tabIndex={0}
          >
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
      })
    : null;
};

export default FriendList;
