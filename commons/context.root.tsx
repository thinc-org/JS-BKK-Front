import { createContext } from 'react';
import { UserStore } from '../interfaces/Users';

const rootContext = createContext({
  userStore: {} as UserStore
});

export default rootContext;
