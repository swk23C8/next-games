import Layout from '../components/Layout/Layout';
import { SessionProvider } from 'next-auth/react';

import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  );
};

export default MyApp;
