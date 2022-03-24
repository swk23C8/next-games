import { useEffect, useState, useReducer, useCallback } from 'react';


const Round = ({ setIsGameStarted }) => {
	const [isRoundStarted, setIsRoundStarted] = useState(true);
	const [roundCount, setRoundCount] = useState(1);
	const [playerOne, setPlayerOne] = useState('');
	const [playerTwo, setPlayerTwo] = useState('');
	const [playerOneScore, setPlayerOneScore] = useState(0);
	const [playerTwoScore, setPlayerTwoScore] = useState(0);
	const [activeUser, setActiveUser] = useState(playerOne);
	const [winner, setWinner] = useState(false);
	const [diceOne, setDiceOne] = useState(null);
	const [diceTwo, setDiceTwo] = useState(null);

	const startRound = () => {
		setIsRoundStarted(true);
		setRoundCount((roundCount += 1));
		setPlayerOneScore(0);
		setPlayerTwoScore(0);
		setActiveUser(playerOne);
		setWinner(false);
	};

	const getDice = () => {
		setDiceOne(Math.floor(Math.random() * 6) + 1);
		setDiceTwo(Math.floor(Math.random() * 6) + 1);
	};

	const makeDiceToss = () => {
		getDice();
		if (diceOne > diceTwo) {
			setActiveUser(playerTwo);
			setPlayerTwoScore((playerTwoScore += 1));
		} else if (diceOne < diceTwo) {
			setActiveUser(playerOne);
			setPlayerOneScore((playerOneScore += 1));
		} else {
			setActiveUser(playerOne);
			setPlayerOneScore((playerOneScore += 1));
			setPlayerTwoScore((playerTwoScore += 1));
		}
	};

	const finishRound = () => {
		if (playerOneScore === 10 || playerTwoScore === 10) {
			setWinner(true);
			setIsGameStarted(false);
		}
	};

	useEffect(() => {
		if (playerOneScore === 10 || playerTwoScore === 10) {
			finishRound();
		}
	}
	);

	return (
		<div className="round">
			<div className="round__header">
				<h2>Round {roundCount}</h2>
				<div className="round__header__players">
					<div className="round__header__players__player">
						<h3>player one: {playerOne}</h3>
						<h3>player one score: {playerOneScore}</h3>
					</div>
					<div className="round__header__players__player">
						<h3>player two: {playerTwo}</h3>
						<h3>player two score: {playerTwoScore}</h3>
					</div>
				</div>
			</div>
			<div className="round__dice">
				<div className="round__dice__dice-one">
					<h3>player one dice: {diceOne}</h3>
				</div>
				<div className="round__dice__dice-two">
					<h3>player two dice: {diceTwo}</h3>
				</div>
			</div>
			<div className="round__button">
				<button type="button" onClick={makeDiceToss}>
					Toss
				</button>
			</div>
			<div className="round__winner">
				{winner ? (
					<h2>{activeUser} is the winner!</h2>
				) : (
					<h2>{activeUser} is the active user</h2>
				)}
			</div>
			<div className="round__button">
				<button type="button" onClick={startRound}>
					Next Round
				</button>
			</div>
		</div>
	);
};

export default Round;