/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app';
import { NextPage } from 'next';
import { useLocalStore, observer } from 'mobx-react-lite';
import Head from 'next/head';
import { useEffect } from 'react';
import ErrorBoundary from 'react-error-boundary';
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
import ErrorMessage from '../commons/components/ErrorMessage';

const App: NextPage<AppProps> = observer(({ Component, pageProps }) => {
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
        <title>Bangkok JS</title>
      </Head>
      <rootContext.Provider value={rootStore}>
        <div className='h-screen flex flex-col font-body'>
          {routeData.hasNavbar && <PageHeading routeData={routeData} />}
          <ErrorBoundary FallbackComponent={ErrorMessage}>
            <div className='flex justify-center pb-55px'>
              <AuthModal />
              <main className='flex items-start justify-center'>
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
