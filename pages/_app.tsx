/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app';
import { NextPage } from 'next';
import { useLocalStore, observer } from 'mobx-react-lite';
import Head from 'next/head';
import { useEffect, useLayoutEffect } from 'react';
import ErrorBoundary from 'react-error-boundary';
import * as Sentry from '@sentry/browser';
import Nav from '../commons/components/Nav';
import createUserStore from '../commons/stores/userStores';
import '../styles/index.css';
import useRouteData from '../commons/hooks/useRouteData';
import PageHeading from '../commons/components/PageHeading';
import AuthModal from '../commons/components/AuthModal';
import { RootStore } from '../interfaces/Commons';
import createModalStore from '../commons/stores/authModalStores';
import rootContext from '../commons/context.root';
import {
  useAuthenticationState,
  isAuthenticated
} from '../components/authentication';
import { BadgeType, Badge } from '../interfaces/Badge';
import ErrorMessage from '../commons/components/ErrorMessage';

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
      const name = [
        authenticatedState.profile.firstname,
        authenticatedState.profile.lastname
      ].join(' ');

      // TODO: Subscribe to actual data instead of mocked data.
      rootStore.userStore.setUserInfo({
        name,
        username: 'new5558',
        points: 10,
        currentBadge: { type: BadgeType.B1, owner: 'new' } as Badge,
        badges: [
          { type: BadgeType.B1, owner: 'Jotaro' },
          { type: BadgeType.B2, owner: 'Dio' },
          { type: BadgeType.B3, owner: 'Joruno' },
          { type: BadgeType.B4, owner: 'Bucharate' }
        ] as Badge[]
      });
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
              <main>
                <Component {...pageProps} />
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
