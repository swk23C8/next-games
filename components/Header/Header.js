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
              <Link href="/game1">
                <a
                  className={
                    pathname === '/game1'
                      ? `${styles.link} ${styles.active}`
                      : styles.link
                  }
                >
                  Game1
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
                  Game2
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
