import React from 'react';

interface Agenda {
  hours: string;
  minutes:string;
  name: string;
}
function renderAgenda(tasks:Agenda[]) {
  const d = new Date();
  const t = tasks && tasks.map(task => {
    //   console.log(Date.parse("13 Jan 2020 "+task.hours+":"+task.minutes))
    if (
      Date.parse(`13/01/2020${task.hours}:${task.minutes}`) <
      Date.parse(`13/01/2020${d.getHours()}:${d.getMinutes()}`)
    ) {
      return (
        <div key={task.name} className='mt-40px ml-40px text-4xl'>
          <div>
            {task.hours}.{task.minutes} - {task.name}
          </div>
          <hr className='mt-20px' />
        </div>
      );
    }
    return (
      <div key={task.name} className='mt-40px ml-40px text-4xl'>
        <div className='text-gray-600'>
          {task.hours}.{task.minutes} - {task.name}
        </div>
        <hr className='mt-20px' />
      </div>
    );
  });
  return t 
}
export default renderAgenda;