import React,{ useEffect} from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import Link from 'next/link';
import {Schedule} from '../../interfaces/Schedule';
import  rootContext  from '../../commons/context.root';
import useMockApi from '../../commons/hooks/useMockApi';

const ScheduleBox:React.FC = observer(()=>{
  const store = React.useContext(rootContext);
  const schedule = useMockApi('schedule');

  useEffect(() => {
    schedule().then(items => {
      console.log(items);
      store.scheduleStore = items
    });
  }, []);
 
  return(
   
    <div>
      {toJS(store.scheduleStore).map((e:Schedule)=>
        <div key={e.key} className="bg-white mx-4">
          <Link  href="/schedule/[key]" as={`/schedule/${e.key}`}>
          
            <div className={`border ${e.happening && e.happened ? "border-yellow-dark" : "border-black"}  bg-w-10/12 h-2/12 mt-4 rounded-lg 
              ${e.happened && !e.happening  ? "opacity-50" : "opacity-100"}`}      >
              <div className="mt-2 ml-2">
                <b>{e.hours}:{e.minutes}</b> 
              </div>
              <div className="ml-2 text-yellow-dark">
                {e.topics}
              </div>
              <div className="flex justify-end mt-4 mr-4 ">
                {e.speakers && `By ${e.speakers}`}
              </div> 
            </div>
         
          </Link>
        </div>
      )}
    
    </div>
  )
})
export default ScheduleBox;