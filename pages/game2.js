import Head from 'next/head';

import GamePage from '../components/Game2/GamePage/GamePage';

const Game = () => {
  return (
    <>
      <Head>
        <title>Pig's Double Dice | Game</title>
        <meta name="description" content="Game page" />
      </Head>
      <GamePage />
    </>
  );
};

export default Game;
