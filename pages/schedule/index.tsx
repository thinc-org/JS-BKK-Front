import React from 'react';
import {  useObserver } from "mobx-react";
import { observer } from 'mobx-react-lite';
import {ScheduleContext } from '../../commons/stores/schedule';

const GetData = () =>{
  const store = React.createContext(ScheduleContext);
  return useObserver(() => <h1>{console.log(store)} </h1>);
}
const Schedule:React.FC= observer(() => {
  const store = React.useContext(ScheduleContext);

  return(<div>
    <div className="font-bold text-2xl">Conference</div>
    <div className="w-8/12 h-1/12 mt-3">
      <div className="mt-16">
            Announcements 
      </div>
      <div className="mt-2">
            Please Dont forget to make your food selection
      </div>
    </div>
    <div className="mt-16 font-bold">Schedule</div>
    <GetData/>

  </div>);
})
export default Schedule;