import React,{ useEffect} from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import {Schedule} from '../../interfaces/interface.schedule';
import { rootContext } from '../_app';
import useMockApi from '../../commons/hooks/hook.mock-api';

const ScheduleBox:React.FC = observer(()=>{
  const store = React.useContext(rootContext);
  const schedule = useMockApi('schedule');

  useEffect(() => {
    schedule().then(items => {
      store.scheduleStore = items;
    });
  }, []);
  return(
   
    <div>
      {toJS(store.scheduleStore).map((e:Schedule)=>
        <div key = {e.key} className={`border ${e.happening && !e.happened ? "border-orange-400" : "border-black"} bg-w-10/12 h-2/12 mt-4 rounded-lg ${e.happened  ? "opacity-50" : "opacity-100"}`}      >
          <div className="mt-2 ml-2">
            <b>{e.hours}:{e.minutes}</b> 
          </div>
          <div className="ml-2 text-yellow-500">
            {e.description}
          </div>
          <div className="flex justify-end mt-4 mr-4 ">
          By {e.speakers}
          </div>
        </div>
      )}
      
    </div>
  )
})
export default ScheduleBox;