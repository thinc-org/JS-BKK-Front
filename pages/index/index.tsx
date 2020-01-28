import React from 'react';
import Announcements from '../../components/announcements/Announcements';

const Home: React.FC = () => {
  return (
    <div>
      <Announcements />
      <div className='text-red-600'>Home works</div>
    </div>
  );
};

export default Home;
