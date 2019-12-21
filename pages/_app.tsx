/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app';
import { NextPage } from 'next';
import Nav from '../components/nav';
import userContext from '../contexts/context.user';
import UserStore from '../stores/store.user';

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <userContext.Provider value={new UserStore()}>
        <Nav />
        <Component {...pageProps} />
      </userContext.Provider>
    </>
  );
};

App.propTypes = {};

export default App;
