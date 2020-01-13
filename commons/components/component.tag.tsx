import React from 'react';

const Tag: React.FC<{ title: string }> = ({ title }) => {
  return <div className='p-1 border border-black text-xs'>{title}</div>;
};

export default Tag;
