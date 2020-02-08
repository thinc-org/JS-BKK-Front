import React, { useState } from 'react';
import { useLocalStore } from 'mobx-react-lite';
import Announcements from '../../components/announcements/Announcements';
import ScheduleBox from '../../components/conference';
import { Schedule } from '../../interfaces/Schedule';
import Staff from '../../components/conference/Staff';
import createModalStore from '../../commons/stores/authModalStores';
import useSchedule from '../../commons/hooks/scheduleHook';

const Home: React.FC = () => {
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule>();
  const schedules = useSchedule();
  const modalStore = useLocalStore(() => createModalStore(400, false));

  const openScheduleModal = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    modalStore.setModalOpen(true);
  };

  return (
    <>
      <Staff modalStore={modalStore} schedule={selectedSchedule} />
      <div className='m-4'>
        <div className='p-4 border-2 border-yellow-dark rounded-lg bg-yellow-light'>
          <Announcements />
        </div>
        <a
          href='https://javascriptbangkok.com/#schedule'
          target='_blank'
          rel='noopener noreferrer'
          data-testid='tweet-button'
          className='block font-bold mt-4 py-3 px-4 text-center font-bg bg-yellow-dark text-black rounded'
        >
          View conference schedule
        </a>
        <TweetButton />
      </div>
    </>
  );
};

const TweetButton: React.FC = () => {
  return (
    <a
      href='https://twitter.com/intent/tweet?hashtags=jsbangkok'
      target='_blank'
      rel='noopener noreferrer'
      data-testid='tweet-button'
      className='block mt-4 py-3 px-4 text-center font-bg bg-yellow-dark text-black rounded'
    >
      Tweet #jsbangkok
    </a>
  );
};

export default Home;
