import React from 'react';
import { Network } from '../../../../interfaces/Users';
import BadgeList from '../../../../commons/components/BadgeList';

interface Props {
  networks: Network[] | any;
}

const FriendList: React.FC<Props> = ({ networks }) => {
  return networks?.map((network: { badge: number; name: string }) => {
    return (
      <div className='flex flex-row items-center'>
        <BadgeList id={network.badge} className='h-8 mr-4' />
        <p>{network.name}</p>
      </div>
    );
  });
};

export default FriendList;
