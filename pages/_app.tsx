/* eslint-disable react/jsx-props-no-spreading */
import * as Sentry from '@sentry/browser';
import { observer, useLocalStore } from 'mobx-react-lite';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import ErrorBoundary from 'react-error-boundary';
import AuthModal from '../commons/components/AuthModal';
import ErrorMessage from '../commons/components/ErrorMessage';
import Nav from '../commons/components/Nav';
import PageHeading from '../commons/components/PageHeading';
import rootContext from '../commons/context.root';
import useRouteData from '../commons/hooks/useRouteData';
import createModalStore from '../commons/stores/authModalStores';
import createUserStore from '../commons/stores/userStores';
import {
  isAuthenticated,
  useAuthenticationState
} from '../components/authentication';
import { RootStore } from '../interfaces/Commons';
import '../styles/index.css';

const App: NextPage<AppProps> = observer(({ Component, pageProps }) => {
  useEffect(() => {
    Sentry.init({
      dsn: 'https://881d1cb8969940678bdc4bda4394207d@sentry.io/2292751'
    });
  }, []);
  const routeData = useRouteData();
  const rootStore = useLocalStore(
    (): RootStore => ({
      userStore: createUserStore(),
      authModalStore: createModalStore(140)
    })
  );
  const authenticationState = useAuthenticationState();
  useEffect(() => {
    if (isAuthenticated(authenticationState)) {
      const authenticatedState = authenticationState.data;
      rootStore.userStore.setUserInfo(authenticatedState.profile);
    }
  }, [authenticationState]);

  return (
    <>
      <Head>
        <title>JavaScript Bangkok 1.0.0</title>
      </Head>
      <rootContext.Provider value={rootStore}>
        <div className='font-body mx-auto' style={{ maxWidth: '640px' }}>
          {routeData.hasNavbar && <PageHeading routeData={routeData} />}
          <ErrorBoundary FallbackComponent={ErrorMessage}>
            <div className='pb-55px'>
              <AuthModal />
              <main className='flex items-start justify-center w-full'>
                <div>
                  <Component {...pageProps} />
                  <div className='my-6 w-full flex'></div>
                </div>
              </main>
              <div className='fixed z-40 bottom-0 left-0 w-full'>
                <Nav />
              </div>
            </div>
          </ErrorBoundary>
        </div>
      </rootContext.Provider>
    </>
  );
});

export default App;
