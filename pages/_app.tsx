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
import PageHeading from '../commons/components/PageHeading';
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
  const [isHiddenCSS, isAnimating, setHidden] = useFadding(400);

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
        <div className='h-screen flex flex-col font-body'>
          {routeData.hasNavbar && <PageHeading routeData={routeData} />}
          <div className='flex justify-center h-full pb-55px'>
            <AuthModal isAnimating={isAnimating} isHidden={isHiddenCSS} />
            <div className={isAnimating || !isHiddenCSS ? 'hidden' : ''}>
              <Component {...pageProps} />
            </div>
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
