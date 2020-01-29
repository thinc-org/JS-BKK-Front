import React from 'react';
import { Badge } from '../../../../interfaces/Badge';

interface Props extends Badge {}

const BadgeItem: React.FC<Props> = ({ type, owner }) => {
  return (
    <div className='text-center mr-2'>
      <div className='bg-gray-200 w-20 h-20 flex justify-center items-center'>
        {type}
      </div>
      <span>{owner}</span>
    </div>
  );
};

export default BadgeItem;
