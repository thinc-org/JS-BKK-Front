import React, { useMemo } from 'react';
import Announcements from '../../components/announcements/Announcements';
import ScheduleBox from '../../components/conference';
import getSchedules from '../../utils/schedules';

const Home: React.FC = () => {
  const schedules = useMemo(() => {
    return getSchedules();
  }, []);
  return (
    <div>
      <div className='flex justify-center'>
        <div className='border-2 border-yellow-dark rounded-lg bg-yellow-light p-4 m-4'>
          <Announcements />
        </div>
      </div>
      <div className='text-white text-1xl mx-4 mt-4 font-bold'>Schedule</div>
      <ScheduleBox schedules={schedules} />
      <TweetButton />
    </div>
  );
};

const TweetButton: React.FC = () => {
  return (
    <a
      href='https://twitter.com/intent/tweet?hashtags=jsbangkok'
      target='_blank'
      rel='noopener noreferrer'
      data-testid='tweet-button'
      className='block mt-12 py-3 text-center font-bg bg-yellow-dark text-black rounded'
    >
      Tweet #jsbangkok
    </a>
  );
};

export default Home;
