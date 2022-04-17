import Link from 'next/link';
import { useRouter } from 'next/router';

import { signIn, signOut, useSession } from 'next-auth/react';

import Container from '../Container/Container';
import styles from './Header.module.scss';

const Header = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading"


  if (session) {
    console.log(session);
  }

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
            <div className={styles.signedInStatus}>
              <p
                className={`nojs-show ${!session && loading ? styles.loading : styles.loaded
                  }`}
              >
                {!session && (
                  <>
                    <span className={styles.notSignedInText}>
                      You are not signed in{" "}
                    </span>
                    <a
                      href={`/api/auth/signin`}
                      className={styles.buttonPrimary}
                      onClick={(e) => {
                        e.preventDefault()
                        signIn()
                      }}
                    >
                      <b>Sign in</b>
                    </a>
                  </>
                )}
                {session?.user && (
                  <>
                    {session.user.image && (
                      <span
                        style={{ backgroundImage: `url('${session.user.image}')` }}
                        className={styles.avatar}
                      />
                    )}
                    <span className={styles.signedInText}>
                      <small>Signed in as</small>
                      <br />
                      <strong>{session.user.email ?? session.user.name}</strong>
                    </span>
                    <a
                      href={`/api/auth/signout`}
                      className={styles.button}
                      onClick={(e) => {
                        e.preventDefault()
                        signOut()
                      }}
                    >
                      Sign out
                    </a>
                  </>
                )}
              </p>
            </div>
          </ul>
        </nav>
      </Container>
    </header>
  );
};
export default Header;
