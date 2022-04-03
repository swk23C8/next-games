import { useEffect, useState, useReducer, useCallback, Component } from 'react';
import Dice from "react-dice-roll";
import styles from './Round.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// return roll combination of dice
// INSTANT WIN
// triple: All 3 dice are the same, 6-6-6 is the highest roll and 5-5-5 is the next highest and so on
// 4-5-6: Rolling 4-5-6 is an instant win
// x-x-6: Rolling a pair plus 6 is an instant win
// POINTS
// x-x-y: Rolling a pair plus any other value is a point where the odd die is the point value
// INSTANT LOSS
// x-x-1: Rolling a pair plus 1 is an instant loss
// 1-2-3: Rolling 1-2-3 is an instant loss
// INDETERMINATE
// x-y-z: Any combination that does not result in cases above is an intermediate outcome and requires a re-roll

const submitContact1 = async (event) => {
	event.preventDefault();
	const name = event.target.name.value;
	const res = await fetch(`https://api.agify.io/?name=${name}`);
	const result = await res.json();
	alert(`Hi ${name} your age is most likely: ${result.age}`);
};

const submitContact2 = async (event) => {
	event.preventDefault();
	const name = event.target.name.value;
	const res = await fetch('/api/apiLearn', {
		body: JSON.stringify({
			name: name,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'POST',
	});
	const result = await res.json();
	alert(`Is this your full name: ${result.name}`);
};

const submitBetTest = async (event) => {
	event.preventDefault();
	const bet = event.target.bet.value;
	const res = await fetch('/api/makeBet', {
		body: JSON.stringify({
			bet: bet,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'POST',
	});
	const result = await res.json();
	alert(`You bet: ${result.bet}`);
};


const Round = () => {
	// Banker useStates
	const [bDie_1, setBDie_1] = useState(null);
	const [bDie_2, setBDie_2] = useState(null);
	const [bDie_3, setBDie_3] = useState(null);
	const [bScore, setBScore] = useState(null);
	const [bRoll, setBRoll] = useState(false);
	const [bMoney, setBMoney] = useState(1000);
	const [bBet, setBBet] = useState(0);

	// Player useStates
	const [pDie_1, setPDie_1] = useState(null);
	const [pDie_2, setPDie_2] = useState(null);
	const [pDie_3, setPDie_3] = useState(null);
	const [pScore, setPScore] = useState(null);
	const [pRoll, setPRoll] = useState(false);
	const [pMoney, setPMoney] = useState(1000);
	const [pBet, setPBet] = useState(0);

	// game result useStates
	const [result, setResult] = useState(null);

	// testing react-toastify
	const notify = () => toast(result);

	const submitBet = async (event) => {
		event.preventDefault();
		const bet = event.target.bet.value;
		const res = await fetch('/api/makeBet', {
			body: JSON.stringify({
				bet: bet,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		});
		const result = await res.json();
		setPBet(bet);
		// setBMoney(result.money);
	};

	// const endRound = async () => {
	// 	const res = await fetch('/api/endRound', {
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		method: 'POST',
	// 	});
	// 	const result = await res.json();
	// 	setBMoney(result.bankerMoney);
	// 	setPMoney(result.playerMoney);
	// 	setBBet(0);
	// 	setPBet(0);
	// 	setBRoll(false);
	// 	setPRoll(false);
	// 	setBScore(null);
	// 	setPScore(null);
	// 	setBDie_1(null);
	// 	setBDie_2(null);
	// 	setBDie_3(null);
	// 	setPDie_1(null);
	// 	setPDie_2(null);
	// 	setPDie_3(null);
	// };

	// const rollDice = async (currentPlayer) => {
	// 	const res = await fetch('/api/rollDice', {
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		method: 'POST',
	// 	});
	// 	const result = await res.json();
	// 	if (currentPlayer === "banker") {
	// 		setBDie_1(result.dice[0]);
	// 		setBDie_2(result.dice[1]);
	// 		setBDie_3(result.dice[2]);
	// 		setBScore(result.score);
	// 		setBRoll(true);
	// 	} else {
	// 		setPDie_1(result.dice[0]);
	// 		setPDie_2(result.dice[1]);
	// 		setPDie_3(result.dice[2]);
	// 		setPScore(result.score);
	// 		setPRoll(true);
	// 	}
	// };

	// const bankerRoll = () => {
	// 	rollDice("banker");
	// };

	// const playerRoll = () => {
	// 	rollDice("player");
	// };

	// const bankerBet = () => {
	// 	submitBetTest();
	// };

	// const playerBet = () => {
	// 	submitBetTest();
	// };

	// const bankerEndRound = () => {
	// 	endRound();
	// };

	// const playerEndRound = () => {
	// 	endRound();
	// };

	const score = (dice) => {
		dice.sort();
		// check if die values are null
		if (dice[0] === null || dice[1] === null || dice[2] === null) {
			return -2;
		}
		if (dice[0] === dice[1] && dice[1] === dice[2]) return 10;
		if (dice.join() === "4,5,6") return 10;
		if (dice.join() === "1,2,3") return -1;
		if (dice[0] !== dice[1] && dice[1] !== dice[2] && dice[1] !== dice[3]) return 0;
		if (dice[0] === dice[1] || dice[1] === dice[2] || dice[1] === dice[3]) {
			const pointDie = dice[0] === dice[1] ? dice[2] : dice[0];
			return pointDie === 1 ? -1 : pointDie === 6 ? 10 : pointDie;
		}
	}

	const pointChecker = (score, currentPlayer) => {
		// check if die values are null
		if (score === -2) {
			return "Roll " + currentPlayer + "'s dice";
		}
		if (score === 10) {
			return "INSTANT WIN";
		}
		if (score === -1) {
			return "INSTANT LOSS";
		}
		if (score === 0) {
			return "INDETERMINATE: ROLL AGAIN!";
		}
		return "score: " + score;

	}

	// game result finder
	const gameResult = (bankerScore, playerScore) => {
		if (bankerScore === playerScore) {
			setResult("PUSH");
			return "TIE";
		}
		if (bankerScore > playerScore) {
			setResult("BANKER WINS");
			return "BANKER WINS";
		}
		if (bankerScore < playerScore) {
			setResult("PLAYER WINS");
			return "PLAYER WINS";
		}
	}

	useEffect(() => {
		if (bScore === 0) {
			setBDie_1(null);
			setBDie_2(null);
			setBDie_3(null);
		}
		if (pScore === 0) {
			setPDie_1(null);
			setPDie_2(null);
			setPDie_3(null);
		}
		gameResult(bScore, pScore);
		setPScore(score([pDie_1, pDie_2, pDie_3]))
		setBScore(score([bDie_1, bDie_2, bDie_3]))
	}, [bDie_1, bDie_2, bDie_3, bScore, pDie_1, pDie_2, pDie_3, pScore]);

	return (

		<div className={styles.round}>
			<button onClick={notify}>Notify!</button>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={true}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>

			{console.log("")}
			{console.log("1-2-3 instant loss: " + score([1, 2, 3]))}
			{console.log("1-1-1 instant win: " + score([1, 1, 1]))}
			{console.log("4-5-6 instant win: " + score([4, 5, 6]))}
			{console.log("5-5-1 instant loss: " + score([5, 5, 1]))}
			{console.log("2-2-1 instant loss: " + score([2, 2, 1]))}
			<h1 className={styles.title}> Cee-Lo: New Yorker&apos;s favorite dice game</h1>

			{/* <button onClick={() => setBRoll(true)}>Roll Banker</button>
			<button onClick={() => setPRoll(true)}>Roll Player</button> */}

			<h2> Banker</h2>
			<Dice
				onRoll={(value) => setBDie_1(value)}
				size={80}
				disabled={bDie_1 !== null} />
			<Dice
				onRoll={(value) => setBDie_2(value)}
				size={80}
				disabled={bDie_2 !== null} />
			<Dice
				onRoll={(value) => setBDie_3(value)}
				size={80}
				disabled={bDie_3 !== null} />
			{console.log("banker dice:", bDie_1, bDie_2, bDie_3)}
			{console.log("score:", bScore)}
			<h3>{bScore === -2 ? "Roll Banker's dice" : pointChecker(bScore, "Banker")}</h3>
			<h3>{(bRoll === true && bScore === -2) ? "Roll Again" : ""}</h3>
			{/* {console.log(bRoll)} */}


			{/* <h3>{pointChecker(bScore, "Banker")}</h3> */}


			<h2>Player</h2>
			<Dice
				onRoll={(value) => setPDie_1(value)}
				size={80}
				disabled={pDie_1 !== null} />
			<Dice
				onRoll={(value) => setPDie_2(value)}
				size={80}
				disabled={pDie_2 !== null} />
			<Dice
				onRoll={(value) => setPDie_3(value)}
				size={80}
				disabled={pDie_3 !== null} />
			{console.log("player dice:", pDie_1, pDie_2, pDie_3)}
			{console.log("score:", pScore)}
			{/* <h3>{pScore == -2 ? "Roll Player's dice" : "score: " + pScore}</h3> */}
			<h3>{pointChecker(pScore, "Player")}</h3>



			{/* form for the player to place bets */}
			<form onSubmit={submitBet}>
				<label>
					Bet:
					<input type="number" name="bet" />
				</label>
				<input type="submit" value="Submit Bet" />
			</form>
			{console.log("player bet:", pBet)}



			{/* <button onClick={() => setBRoll(true)}>Roll Banker</button> */}

			{/* display money */}
			<h2>Banker Money: ${bMoney}</h2>
			<h2>Player Money: ${pMoney}</h2>

			{/* display game result */}
			<h2>Game Result: {result}</h2>

			{/* button to clear dice value */}
			<button
				onClick={() => {
					setBDie_1(null);
					setBDie_2(null);
					setBDie_3(null);
					setBRoll(false);
				}}>
				Clear Banker Dice
			</button>
			<button
				onClick={() => {
					setPDie_1(null);
					setPDie_2(null);
					setPDie_3(null);
					setPRoll(false);
				}}>
				Clear Player Dice
			</button>
			<button
				onClick={() => {
					setBDie_1(null);
					setBDie_2(null);
					setBDie_3(null);
					setPDie_1(null);
					setPDie_2(null);
					setPDie_3(null);
					setBRoll(false);
					setPRoll(false);
				}}>
				Clear All Dice
			</button>
		</div>
	);
}

export default Round;