import React from "react";
import { useLocalStore } from "mobx-react";
import useMockApi from "../hooks/hook.mock-api";

export const ScheduleContext = React.createContext(null);
export const scheduleProvider = ({children}) => {
  const store = useLocalStore(()=>({
    schedule: useMockApi('schedule'),
  }));
  return <ScheduleContext.Provider value={store}>{children}</ScheduleContext.Provider>
}
