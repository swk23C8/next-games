import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const { pathname } = useRouter();

  return (
    <div className={styles.container}>
      <section className={styles.main}>
        <h1 className={styles.title}>Hello everyone!</h1>

        <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste corporis
          ipsam nostrum voluptatem dolores sint ducimus sunt quidem placeat
          accusantium nemo aut magni voluptatum aliquam, iusto reprehenderit
          quam nulla maxime.
        </p>
        <Link href="/game">
          <a>Go to game</a>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
