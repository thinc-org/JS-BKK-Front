/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app';
import { NextPage } from 'next';
import { createContext, useMemo } from 'react';
import { useLocalStore } from 'mobx-react-lite';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Nav from '../commons/components/componnent.nav';
import createUserStore from '../commons/stores/store.user';
import { UserStore } from '../interfaces/interface.user';
import useAuthGuard from '../commons/hooks/hook.auth';
import '../styles/index.css';
import allRoutesData from '../utils/data.route.json';
import { RouteData, NestedRouteData } from '../interfaces/interface.commons';

export const rootContext = createContext({
  userStore: {} as UserStore
});

const getRouteData = (
  routeDataObj: NestedRouteData,
  names: string[]
): RouteData => {
  const name = names[0];
  if (!name) return routeDataObj as RouteData;
  const trimmedName = names.slice(1);
  return getRouteData(routeDataObj[name], trimmedName);
};

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const rootStore = useLocalStore(() => ({ userStore: createUserStore() }));
  const router = useRouter();

  useAuthGuard(rootStore.userStore);

  const routeData = useMemo(() => {
    const path = router.pathname;
    if (!path) return null;
    const paths = path.substring(1, path.length).split('/');
    return getRouteData(allRoutesData, paths);
  }, [router.pathname]);

  return (
    <>
      <Head>
        <title>Bangkok JS</title>
      </Head>
      <rootContext.Provider value={rootStore}>
        {routeData?.hasNavbar && (
          <div className='fixed pin-t pin-l'>
            <Nav routeData={routeData} />
          </div>
        )}
        <div className='pt-5'>
          <Component {...pageProps} />
        </div>
      </rootContext.Provider>
    </>
  );
};

App.propTypes = {};

export default App;
