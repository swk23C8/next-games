import Link from 'next/link';
import { useRouter } from 'next/router';

import { signIn, signOut, useSession } from 'next-auth/react';
// import prisma from '../../lib/prisma';

import Container from '../Container/Container';
import styles from './Header.module.scss';

const Header = () => {

  const { pathname } = useRouter();

  return (
    <header className={styles.header}>
      <Container>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <Link href="/">
                <a
                  className={
                    pathname === '/'
                      ? `${styles.link} ${styles.active}`
                      : styles.link
                  }
                >
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link href="/game1">
                <a
                  className={
                    pathname === '/game1'
                      ? `${styles.link} ${styles.active}`
                      : styles.link
                  }
                >
                  Head&apos;s and Tails
                </a>
              </Link>
            </li>
            <li>
              <Link href="/game2">
                <a
                  className={
                    pathname === '/game2'
                      ? `${styles.link} ${styles.active}`
                      : styles.link
                  }
                >
                  Cee-Lo
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};
export default Header;
