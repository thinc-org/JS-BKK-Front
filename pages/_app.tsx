/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app';
import { NextPage } from 'next';
import { createContext } from 'react';
import { useLocalStore } from 'mobx-react-lite';
import Nav from '../components/nav';
import createUserStore from '../stores/store.user';
import { UserStore } from '../interfaces/interface.user';

export const rootContext = createContext({
  user: {} as UserStore
});

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const userStore = useLocalStore(() => ({ user: createUserStore() }));
  return (
    <>
      <rootContext.Provider value={userStore}>
        <Nav />
        <Component {...pageProps} />
      </rootContext.Provider>
    </>
  );
};

App.propTypes = {};

export default App;
