import { createContext } from 'react';
import { UserStore } from '../interfaces/interface.user';

const rootContext = createContext({
  userStore: {} as UserStore
});

export default rootContext;
