/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app';
import { NextPage } from 'next';
import { createContext } from 'react';
import { useLocalStore } from 'mobx-react-lite';
import { Global, css } from '@emotion/core';
import normalize from 'normalize.css/normalize.css';
import Nav from '../commons/components/componnent.nav';
import createUserStore from '../commons/stores/store.user';
import { UserStore } from '../interfaces/interface.user';
import useAuthGuard from '../commons/hooks/hook.auth';

export const rootContext = createContext({
  userStore: {} as UserStore
});

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const rootStore = useLocalStore(() => ({ userStore: createUserStore() }));
  useAuthGuard(rootStore.userStore);

  return (
    <>
      <Global
        styles={css`
          ${normalize}
        `}
      />
      <rootContext.Provider value={rootStore}>
        <Nav />
        <Component {...pageProps} />
      </rootContext.Provider>
    </>
  );
};

App.propTypes = {};

export default App;
