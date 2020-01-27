/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app';
import { NextPage } from 'next';
import { useLocalStore, observer } from 'mobx-react-lite';
import Head from 'next/head';
import Nav from '../commons/components/Nav';
import createUserStore from '../commons/stores/userStores';
import useAuthGuard from '../commons/hooks/useAuthGuard';
import '../styles/index.css';
import useRouteData from '../commons/hooks/useRouteData';
import PageHeading from '../commons/components/PageHeading';
import AuthModal from '../commons/components/AuthModal';
import { RootStore } from '../interfaces/Commons';
import createModalStore from '../commons/stores/authModalStores';
import rootContext from '../commons/context.root';

const App: NextPage<AppProps> = observer(({ Component, pageProps }) => {
  const routeData = useRouteData();
  const rootStore = useLocalStore(
    (): RootStore => ({
      userStore: createUserStore(),
      authModalStore: createModalStore(400)
    })
  );
  const {
    authModalStore: { isAnimating, isHidden, isModalOpen }
  } = rootStore;

  useAuthGuard(rootStore);

  return (
    <>
      <Head>
        <title>Bangkok JS</title>
      </Head>
      <rootContext.Provider value={rootStore}>
        <div className='h-screen flex flex-col font-body'>
          {routeData.hasNavbar && <PageHeading routeData={routeData} />}
          <div className='flex justify-center pb-55px'>
            <AuthModal />
            <div
              className={
                isAnimating || !isHidden || isModalOpen ? 'hidden' : ''
              }
            >
              <Component {...pageProps} />
            </div>
            <div className='fixed z-50 bottom-0 left-0 w-full'>
              <Nav />
            </div>
          </div>
        </div>
      </rootContext.Provider>
    </>
  );
});

App.propTypes = {};

export default App;
