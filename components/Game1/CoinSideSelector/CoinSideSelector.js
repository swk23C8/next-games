import { COIN_SIDES } from '../../../utils/gameConstants';

import styles from './CoinSideSelector.module.scss';

const CoinSideSelector = ({ selectCoinSide, coinSideSelection }) => (
  <form>
    <label className={styles.label}>
      <span>Heads</span>
      <input
        type="radio"
        name="coin-side"
        value={COIN_SIDES.heads}
        onChange={selectCoinSide}
        checked={coinSideSelection === COIN_SIDES.heads}
        disabled={coinSideSelection}
        className="visuallyHidden"
      />
    </label>
    <span className={styles.separator}>or </span>
    <label className={styles.label}>
      <span>Tails</span>
      <input
        type="radio"
        name="coin-side"
        value={COIN_SIDES.tails}
        onChange={selectCoinSide}
        checked={coinSideSelection === COIN_SIDES.tails}
        disabled={coinSideSelection}
        className="visuallyHidden"
      />
    </label>
  </form>
);

export default CoinSideSelector;
