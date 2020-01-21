import React from 'react';

const Card: React.FC = ({ children }) => {
  return (
    <div className='flex flex-col items-center bg-white rounded-lg p-4'>
      {children}
    </div>
  );
};

export default Card;
