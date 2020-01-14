import React from 'react';
import compareAsc from 'date-fns/compareAsc';

interface Agenda {
  hours: String;
  minutes: String;
  name: String;
}

function renderAgenda(tasks: Agenda[]) {
  const d = new Date();

  const t = tasks.map(task => {
    //   console.log(Date.parse("13 Jan 2020 "+task.hours+":"+task.minutes))
    if (
      Date.parse(`13/01/2020${task.hours}:${task.minutes}`) <
      Date.parse(`13/01/2020${d.getHours()}:${d.getMinutes()}`)
    ) {
      return (
        <div className='mt-40px ml-40px text-4xl'>
          <div>
            {task.hours}.{task.minutes} - {task.name}
          </div>
          <hr className='mt-20px' />
        </div>
      );
    }
    return (
      <div className='mt-40px ml-40px text-4xl'>
        <div className='text-gray-600'>
          {task.hours}.{task.minutes} - {task.name}
        </div>
        <hr className='mt-20px' />
      </div>
    );
  });
  return t;
}
export default renderAgenda;
