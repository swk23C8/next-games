import { useState,  } from 'react';

import styles from './GamePage.module.scss';

import Round from '../Round/Round';
import Container from '../../Container/Container';

const GamePage = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  
  const startGame = () => {
    setIsGameStarted(true);
  };

  return isGameStarted ? (
    <Round setIsGameStarted={setIsGameStarted} />
  ) : (
    <Container>
      <h1>Game</h1>
      <p>Let{"'"}s play?</p>
      <button type="button" onClick={startGame}>
        Start
      </button>
    </Container>
  );
};

export default GamePage;
