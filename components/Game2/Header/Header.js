import Link from 'next/link';
import { useRouter } from 'next/router';

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
              <Link href="/game">
                <a
                  className={
                    pathname === '/game'
                      ? `${styles.link} ${styles.active}`
                      : styles.link
                  }
                >
                  Game
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
