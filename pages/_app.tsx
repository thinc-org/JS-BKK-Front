/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app';
import { NextPage } from 'next';
import { createContext, useEffect } from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';
import Head from 'next/head';
import Nav from '../commons/components/componnent.nav';
import createUserStore from '../commons/stores/userStores';
import useAuthGuard from '../commons/hooks/useAuthGuard';
import '../styles/index.css';
import useRouteData from '../commons/hooks/hook.route-data';
import Viewing from '../commons/components/component.viewing';
import AuthModal from '../commons/components/AuthModal';
import createAuthModalStore from '../commons/stores/authModalStores';
import { RootStore } from '../interfaces/interface.commons';
import useFadding from '../commons/hooks/useFadeOut';

export const rootContext = createContext({
  userStore: {},
  authModalStore: {}
} as RootStore);

const App: NextPage<AppProps> = observer(({ Component, pageProps }) => {
  const routeData = useRouteData();
  const rootStore = useLocalStore(
    (): RootStore => ({
      userStore: createUserStore(),
      authModalStore: createAuthModalStore()
    })
  );
  const { authModalStore } = rootStore;
  const [isHiddenCSS, isAnimating, setHidden] = useFadding(500);

  useAuthGuard(rootStore);

  useEffect(() => {
    setHidden(!authModalStore.isModalOpen);
  }, [authModalStore.isModalOpen]);
  return (
    <>
      <Head>
        <title>Bangkok JS</title>
      </Head>
      <rootContext.Provider value={rootStore}>
        <div className='h-screen flex flex-col'>
          {routeData?.hasNavbar && <Viewing routeData={routeData} />}
          <div className='relative my-4 px-4 h-full'>
            <div
              className={`absolute h-full w-screen z-50 bg-white ${
                isAnimating ? 'fade' : ''
              } ${isHiddenCSS ? 'hidden' : ''}`}
            >
              <AuthModal />
            </div>
            <Component {...pageProps} />
          </div>
          <div className='fixed z-50 bottom-0 w-full'>
            <Nav />
          </div>
        </div>
      </rootContext.Provider>
    </>
  );
});

App.propTypes = {};

export default App;
