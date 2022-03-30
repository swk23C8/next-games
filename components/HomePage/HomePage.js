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
        <h1 className={styles.title}>Check this out beans</h1>

        <p className={styles.description}>
          Ayo this is a nextjs project.
        </p>
        <Link href="/game2">
          <a>Go to game</a>
        </Link>
        <Paper elevation={4} className='p-10'>
          <div className='text-center space-y-6'>
            <h1 className='text-4xl font-bold'>Hooman Shrek</h1>
            <button
              className='text-3xl shadow-3xl bg-gray-300 hover:bg-gray-400 p-3 rounded-2xl'
              onClick={() => router.push('/game2')}
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
