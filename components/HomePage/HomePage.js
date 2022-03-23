import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './HomePage.module.scss';
import { Paper } from '@mui/material';


const HomePage = () => {
  const { pathname } = useRouter();
  const router = useRouter();


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
        <Paper elevation={4} className='p-10'>
          <div className='text-center space-y-6'>
            <h1 className='text-4xl font-bold'>Pig</h1>
            <button
              className='text-3xl shadow-3xl bg-gray-300 hover:bg-gray-400 p-3 rounded-2xl'
              onClick={() => router.push('/Game2')}
            >
              Click Here To Play!
            </button>
          </div>
        </Paper>
      </section>
    </div>
  );
};

export default HomePage;
