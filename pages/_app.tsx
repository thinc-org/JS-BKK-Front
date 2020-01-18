/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app';
import { NextPage } from 'next';
import { createContext } from 'react';
import { useLocalStore } from 'mobx-react-lite';
import Head from 'next/head';
import Nav from '../commons/components/componnent.nav';
import createUserStore from '../commons/stores/store.user';
import { UserStore } from '../interfaces/interface.user';
import useAuthGuard from '../commons/hooks/hook.auth';
import '../styles/index.css';
import useRouteData from '../commons/hooks/hook.route-data';

export const rootContext = createContext({
  userStore: {} as UserStore
});

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const rootStore = useLocalStore(() => ({ userStore: createUserStore() }));
  const routeData = useRouteData();

  useAuthGuard(rootStore.userStore);

  return (
    <>
      <Head>
        <title>Bangkok JS</title>
      </Head>
      <rootContext.Provider value={rootStore}>
        <div className='h-screen flex flex-col'>
          {routeData.hasNavbar && (
            <div className='sticky pin-t pin-l mx-10 mt-12 '>
              <Nav routeData={routeData} />
            </div>
          )}
          <div className='mt-8 h-full'>
            <Component {...pageProps} />
          </div>
        </div>
      </rootContext.Provider>
    </>
  );
};

App.propTypes = {};

export default App;
