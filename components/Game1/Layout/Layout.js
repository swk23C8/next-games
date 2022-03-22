import Head from 'next/head';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Layout.module.scss';

const Layout = ({ children }) => {
  return (
    <div className={styles.page}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
