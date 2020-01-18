import React from 'react';
import compareAsc from 'date-fns/compareAsc';

interface AgendaItem {
  id: number;
  hours: String;
  minutes: String;
  name: String;
  checkTime: boolean;
}

const renderAgenda = (tasks: AgendaItem[]) => {
  return Object.values(tasks).map(task => {
    // eslint-disable-next-line no-param-reassign
    task.checkTime = !(
      compareAsc(
        new Date(),
        new Date(`2020-01-14T${task.hours}:${task.minutes}:00+07:00`)
      ) === 1
    );
    return (
      <div key={task.id} className='mt-40px ml-40px text-4xl'>
        <div className={task.checkTime ? 'text-gray-600' : ''}>
          {task.hours}.{task.minutes} - {task.name}
        </div>
        <hr className='mt-20px' />
      </div>
    );
  });
};
export default renderAgenda;
