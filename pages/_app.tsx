/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app';
import { NextPage } from 'next';
import Nav from '../components/nav';

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <>
    <Nav />
    <Component {...pageProps} />
  </>
);

App.propTypes = {};

export default App;
