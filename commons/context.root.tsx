import { createContext } from 'react';
import { RootStore } from '../interfaces/Commons';

const rootContext = createContext({
  userStore: {},
  authModalStore: {}
} as RootStore);

export default rootContext;
