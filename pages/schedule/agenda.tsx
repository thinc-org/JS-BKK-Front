import React from 'react';
interface Agenda {
  hours:String;
  minutes:String;
  name:String;
}
function renderAgenda(tasks:Agenda[]) {
  const d = new Date();
  const t = tasks.map((task) => {
      if(Date.parse("13/01/2563"+task.hours+task.minutes)<Date.parse("13/01/2563"+d.getHours()+d.getMinutes())){
          return (
              <div className="mt-40px ml-40px text-4xl">
                  <div>
                      {task.hours}.{task.minutes} - {task.name}
                  </div>
                  <hr className="mt-20px"></hr>
              </div>
          );
      }else{
          return (
              <div className="mt-40px ml-40px text-4xl">
                  <div className="text-gray-600">
                      {task.hours}.{task.minutes} - {task.name}
                  </div>
                  <hr className="mt-20px"></hr>
              </div>
          );
      }
     
  })
    return t 
}
export default renderAgenda;