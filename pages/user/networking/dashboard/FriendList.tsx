/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { Network } from '../../../../interfaces/Users';
import BadgeList from '../../../../commons/components/BadgeList';

interface Props {
  networks: Network[] | any;
}

const FriendList: React.FC<Props> = ({ networks }) => {
  return networks
    ? networks.map((network: { badge: number; name: string }, index: number) => {
        return (
          <div key={network.badge} className={(index < networks.length - 1) ? 'flex flex-row items-center border-b border-gray-400 p-3' : 'flex flex-row items-center p-3' }>
            <BadgeList id={network.badge} className='h-8 mr-4' />
            <p>{network.name} {networks.length}</p>
          </div>
        );
      })
    : null;
};

export default FriendList;
