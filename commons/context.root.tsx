import { createContext } from 'react';
import { RootStore } from '../interfaces/Commons';


const rootContext = createContext({
  userStore: {},
  authModalStore: {},
  scheduleStore: [] as any,

} as RootStore);

export default rootContext;
