import { useEffect, useState, useReducer, useCallback } from 'react';

import Container from '../Container/Container';
import Coin from '../Coin/Coin';
import RoundStatistic from '../RoundStatistic/RoundStatistic';
import { coinToss } from '../../../utils/coinToss';
import { COIN_SIDES, MAX_COIN_TOSS_COUNT } from '../../../utils/gameConstants';
import CoinSideSelector from '../CoinSideSelector/CoinSideSelector';

import styles from './Round.module.scss';

const Round = ({ setIsGameStarted }) => {
	const [isRoundStarted, setIsRoundStarted] = useState(true);
	const [roundCount, setRoundCount] = useState(1);
	const [coinTossCount, setCoinTossCount] = useState(0);
	const [coinFlipped, setCoinFlipped] = useState(false);
	const [showCoinTossChoiceButtons, setShowCoinTossChoiceButtons] =
		useState(true);
	const [showCoinSideChoiceButtons, setShowCoinSideChoiceButtons] =
		useState(false);
	const [coinSideSelection, setCoinSideSelection] = useState(null);
	const [coinTossResult, setCoinTossResult] = useState(null);
	const [playerWinsCount, setPlayerWinsCount] = useState(0);
	const [roundsStatistic, setRoundsStatistic] = useState([]);
	const [showRoundStatistic, setShowRoundStatistic] = useState(false);

	const startRound = () => {
		setShowRoundStatistic(false);
		setIsRoundStarted(true);
		setRoundCount((roundCount += 1));
		setCoinTossCount(0);
		setPlayerWinsCount(0);
		setCoinSideSelection(null);
		setShowCoinTossChoiceButtons(true);
		setShowCoinSideChoiceButtons(false);
	};

	const getCoinSpin = () => setCoinFlipped((state) => !state);

	const makeCoinToss = () => {
		getCoinSpin();
		setCoinTossCount((coinTossCount += 1));
		if (coinSideSelection) setCoinSideSelection(null);
		setCoinTossResult(coinToss());
	};

	const finishRound = () => {
		if (coinTossCount === 0 || showRoundStatistic) setIsGameStarted(false);

		const newRoundStatistic = {
			roundNumber: roundCount,
			coinTossNumber: coinTossCount,
			playerWinsCount,
		};

		setRoundsStatistic((prevRoundStatistic) => [
			...prevRoundStatistic,
			newRoundStatistic,
		]);
		setIsRoundStarted(false);
		setShowRoundStatistic(true);
	};

	useEffect(() => {
		if (coinTossCount === MAX_COIN_TOSS_COUNT) finishRound();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [coinTossCount]);

	const isPlayerGuessed = coinSideSelection === coinTossResult;

	const selectCoinSide = (e) => {
		setCoinSideSelection(e.target.value);
		if (e.target.value === coinTossResult)
			setPlayerWinsCount((playerWinsCount += 1));

		setShowCoinTossChoiceButtons(true);
		setShowCoinSideChoiceButtons(false);
	};

	console.log('coinSideSelection', coinSideSelection);

	return (
		<Container>
			{showRoundStatistic && (
				<RoundStatistic data={roundsStatistic} roundCount={roundCount} />
			)}
			<section className={styles.round}>
				{isRoundStarted ? (
					<>
						<Coin
							coinFlipped={coinFlipped}
							coinTossResult={coinTossResult}
							coinSideSelection={coinSideSelection}
							setShowCoinTossChoiceButtons={setShowCoinTossChoiceButtons}
							setShowCoinSideChoiceButtons={setShowCoinSideChoiceButtons}
						/>
						<h2 className={styles.title}>Round {roundCount}</h2>

						{coinSideSelection && (
							<p className={styles.message}>
								{isPlayerGuessed ? (
									<span className={styles.success}>You won !</span>
								) : (
									<span className={styles.error}>Casino won !</span>
								)}
							</p>
						)}
						{showCoinTossChoiceButtons && (
							<>
								<p className={styles.question}>Are you ready to rumble ?</p>
								<button type="button" onClick={makeCoinToss}>
									Yes
								</button>
								<button type="button" onClick={finishRound}>
									No
								</button>
							</>
						)}
						{showCoinSideChoiceButtons && (
							<CoinSideSelector
								selectCoinSide={selectCoinSide}
								coinSideSelection={coinSideSelection}
							/>
						)}
					</>
				) : (
					<>
						<p className={styles.question}>Another round ?</p>
						<button type="button" onClick={startRound}>
							Yes
						</button>
						<button type="button" onClick={finishRound}>
							No
						</button>
					</>
				)}
			</section>
		</Container>
	);
};

export default Round;
