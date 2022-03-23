import Head from 'next/head';

import { useContext } from 'react';
import GameBoard from '../components/Game2/GameBoard/GameBoard';
import PlayerCreation from '../components/Game2/PlayerCreation/PlayerCreation';
import { Context } from '../components/Context';

export default function Game2() {
  const { gameStarted } = useContext(Context);

  return !gameStarted ? (
    <>
      <Head>
        <title>Dice Rolling | Game</title>
        <meta name="description" content="Game page" />
      </Head>
      <div className='grid place-items-center h-screen bg-red-400'>
        <PlayerCreation />
      </div>
    </>
  ) : (
    <>
      <Head>
        <title>Dice Rolling | Game</title>
        <meta name="description" content="Game page" />
      </Head>
      <div className='grid place-items-center h-screen bg-red-400'>
        <GameBoard />
      </div>
    </>
  );
}


// export default function Game2() {
//   const { gameStarted } = useContext(Context);

//   return !gameStarted ? (
//     <div className='grid place-items-center h-screen bg-red-400'>
//       <PlayerCreation />
//     </div>
//   ) : (
//     <div className='grid place-items-center h-screen bg-red-400'>
//       <GameBoard />
//     </div>
//   );
// }