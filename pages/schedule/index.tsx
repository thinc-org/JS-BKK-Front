import React from 'react';
import { observer } from 'mobx-react-lite';

import Link from 'next/link';

import renderAgenda from './agenda';

const Schedule: React.FC = observer(() => {
  const d = new Date();
  const task = [
    {
      id: 1,
      hours: '08',
      minutes: '00',
      name: 'Registration',
      checkTime: false
    },
    {
      id: 2,
      hours: '09',
      minutes: '00',
      name: 'Agenda A',
      checkTime: false
    },
    {
      id: 3,
      hours: '10',
      minutes: '00',
      name: 'Agenda B',
      checkTime: false
    },
    {
      id: 4,
      hours: '11',
      minutes: '00',
      name: 'Agenda C',
      checkTime: false
    },
    {
      id: 5,
      hours: '23',
      minutes: '00',
      name: 'Agenda D',
      checkTime: false
    }
  ];
  return (
    <div>
      <div className='flex ml-40px'>
        <Link href='/portal'>
          <div className='flex ml-5 text-4xl'>Schedule</div>
        </Link>
        <div className='ml-auto mr-40px text-4xl'>
          {d.getHours()}:{d.getMinutes()}
        </div>
      </div>

      <div className='mt-40px'>{renderAgenda(task)}</div>
    </div>
  );
});
export default Schedule;
