import React from 'react';
import {  useObserver } from "mobx-react";
import { observer } from 'mobx-react-lite';
import {ScheduleContext } from '../../commons/stores/schedule';
import ScheduleBox from './schedulebox';

const GetData = () =>{
  const store = React.createContext(ScheduleContext);
  return useObserver(() => <h1>{console.log(store)} </h1>);
}



const Schedule:React.FC= observer(() => {
  const store = React.useContext(ScheduleContext);

  return(<div>
    <div className="font-bold text-2xl">Conference</div>
    <div className="flex justify-center">
      <div className="border border-orange-400 rounded-lg py-45 px-120 bg-yellow-300 w-10/12 h-1/12 mt-3 ">
        <div className="mt-2  ml-4">
          <b>Announcements </b>
        </div>
        <div className="mt-2 ml-4">
              Please Dont forget to make your food selection
        </div>
      </div>
    </div>
    <div className="mt-8 font-bold">Schedule</div>
    <GetData/>
    <ScheduleBox/>
   

  </div>);
})
export default Schedule;