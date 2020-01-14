import React from 'react';

interface Agenda {
  id: number;
  hours: String;
  minutes: String;
  name: String;
}

function renderAgenda(tasks: Agenda[]) {
  const checkTime = false;

  const t = tasks.map(task => {
    return (
      <div key={task.id} className='mt-40px ml-40px text-4xl'>
        <div className={checkTime ? 'text-gray-600' : ''}>
          {task.hours}.{task.minutes} - {task.name}
        </div>
        <hr className='mt-20px' />
      </div>
    );
  });
  return t;
}
export default renderAgenda;
