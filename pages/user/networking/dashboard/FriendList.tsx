import React from 'react';
import { Network } from '../../../../interfaces/Users';

interface Props {
  networks: Network[];
}

const FriendList: React.FC<Props> = ({ networks }) => {
  return networks?.map(network => {
    return (
      <div key={group.title} className='my-3 mx-4'>
        <h2 className='text-white text-lg mb-4'>{group.title}</h2>
        <RestaurantList restaurants={group.choices} />
      </div>
    );
  });
};

export default FriendList;
