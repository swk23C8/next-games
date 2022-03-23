import Head from 'next/head';
import Image from 'next/image';
import HomePage from '../components/HomePage/HomePage';
import { Paper } from '@mui/material';
import { useRouter } from 'next/router';



const Home = () => {
  return (
    <>
      <Head>
        <title>Head and Tails | Home</title>
        <meta name="description" content="Home page" />
      </Head>
      <HomePage />
    </>
  );
};

export default Home;
