import React from 'react';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { Schedule } from '../../interfaces/Schedule';

const ScheduleBox: React.FC<{ schedules: Schedule[] }> = observer(
  ({ schedules }) => {
    return (
      <div>
        {schedules?.map((e: Schedule) => (
          <Link key={e.key} href='/schedule/[key]' as={`/schedule/${e.key}`}>
            <div
              className={`bg-white font-bold mx-4 ${
                e.happening ? 'border-2 border-yellow-dark' : ''
              } mt-4 p-4 rounded-lg 
              ${e.happened && !e.happening ? 'opacity-50' : 'opacity-100'}`}
            >
              <div className='text-bg text-bkk-grey'>
                {e.hours}:{e.minutes}
              </div>
              <div className='text-yellow-dark text-base'>{e.title}</div>
              {e.speaker && (
                <div className=' text-right text-sm text-bkk-grey mt-3 mr-4'>
                  By {e.speaker}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    );
  }
);
export default ScheduleBox;
