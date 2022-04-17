import { SessionProvider } from 'next-auth/react';
import Layout from '../components/Layout/Layout';
import { AuthProvider } from '../lib/auth';
import { supabase } from '../lib/client';

import '../styles/globals.scss';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <>
      <AuthProvider supabase={supabase}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  );
};

export default MyApp;
