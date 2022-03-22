import Head from 'next/head';

import GamePage from '../components/Game1/GamePage/GamePage';

const Game = () => {
  return (
    <>
      <Head>
        <title>Head and Tails | Game</title>
        <meta name="description" content="Game page" />
      </Head>
      <GamePage />
    </>
  );
};

export default Game;
