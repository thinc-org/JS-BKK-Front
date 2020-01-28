import React from 'react';
import Announcements from '../../components/announcements/Announcements';

const Home: React.FC = () => {
  return (
    <div>
      <Announcements />
      <TweetButton />
      <div className='text-red-600'>Home works</div>
    </div>
  );
};

const TweetButton: React.FC = () => {
  return (
    <a
      href='https://twitter.com/intent/tweet?hashtags=jsbangkok'
      target='_blank'
      rel='noopener noreferrer'
      className='block mt-12 py-3 text-center font-bg bg-yellow-dark text-black rounded'
    >
      Tweet #jsbangkok
    </a>
  );
};

export default Home;
