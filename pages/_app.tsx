/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app';
import { NextPage } from 'next';
import { createContext } from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';
import Head from 'next/head';
import Nav from '../commons/components/componnent.nav';
import createUserStore from '../commons/stores/userStores';
import useAuthGuard from '../commons/hooks/useAuthGuard';
import '../styles/index.css';
import useRouteData from '../commons/hooks/hook.route-data';
import Viewing from '../commons/components/component.viewing';
// eslint-disable-next-line import/no-cycle
import AuthModal from '../commons/components/AuthModal';
import createAuthModalStore from '../commons/stores/authModalStores';
import { RootStore } from '../interfaces/interface.commons';

export const rootContext = createContext({
  userStore: {},
  authModalStore: {}
} as RootStore);

const App: NextPage<AppProps> = observer(({ Component, pageProps }) => {
  const rootStore = useLocalStore(
    (): RootStore => ({
      userStore: createUserStore(),
      authModalStore: createAuthModalStore()
    })
  );
  const routeData = useRouteData();
  const { authModalStore } = rootStore;
  useAuthGuard(rootStore);
  return (
    <>
      <Head>
        <title>Bangkok JS</title>
      </Head>
      <rootContext.Provider value={rootStore}>
        <div className='h-screen flex flex-col'>
          {routeData?.hasNavbar && (
            <div>
              <Viewing routeData={routeData} />
            </div>
          )}
          {authModalStore.isModalOpen && <AuthModal />}
          <div className='mt-8 mb-24 px-4 h-full'>
            <Component {...pageProps} />
          </div>
          <div className='fixed bottom-0 w-full'>
            <Nav />
          </div>
        </div>
      </rootContext.Provider>
    </>
  );
});

App.propTypes = {};

export default App;
