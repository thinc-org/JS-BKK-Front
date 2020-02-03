import React from 'react';
import { observer } from 'mobx-react-lite';
import ScheduleBox from '../../components/schedulebox/index';
import Announcements from '../../components/announcements/Announcements';

const Schedule: React.FC = observer(() => {
 
  return (
    <div>
      <div className='text-white mx-2 font-bold text-2xl'>Conference</div>
      <div className='flex justify-center'>
        <div className='border border-yellow-dark rounded-lg py-45 px-120 bg-yellow-light ht w-10/12 h-1/12 mt-3 '>
        
          <div className='mt-2 ml-4'>
            <Announcements/>
          </div>
        </div>
      </div>
      <div className='text-white text-xl mx-2 mt-8 font-bold'>Schedule</div>
      <ScheduleBox/>
    
    </div>
  );
});
export default Schedule;
