import { useState } from 'react';
import { useSpring, a } from '@react-spring/web';

import styles from './Coin.module.scss';

const Coin = ({
  coinFlipped,
  coinTossResult,
  coinSideSelection,
  setShowCoinSideChoiceButtons,
  setShowCoinTossChoiceButtons,
}) => {
  const { transform, opacity } = useSpring({
    opacity: coinFlipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${coinFlipped ? 1800 : 0}deg)`,
    config: { mass: 50, tension: 50, friction: 80 },
    onStart: () => setShowCoinTossChoiceButtons(false),

    onRest: () => setShowCoinSideChoiceButtons(true),
  });

  const coinSide = coinSideSelection ? coinTossResult : 'unknown';

  return (
    <div className={styles.container}>
      <a.div
        className={`${styles.coin} ${styles[coinSide]}`}
        style={{ opacity: opacity.to((o) => 1 - o), transform }}
      />
      <a.div
        className={`${styles.coin} ${styles[coinSide]}`}
        style={{
          opacity,
          transform,
          rotateX: '1800deg',
        }}
      />
      <p>
        test
      </p>
    </div>
  );
};

export default Coin;
