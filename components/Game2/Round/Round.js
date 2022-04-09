// chat with list
// history with table

import { useEffect, useState, useReducer, useCallback, Component, useRef } from 'react';
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

	// Player useStates
	const [pDie_1, setPDie_1] = useState(null);
	const [pDie_2, setPDie_2] = useState(null);
	const [pDie_3, setPDie_3] = useState(null);
	const [pScore, setPScore] = useState(null);
	const [pRoll, setPRoll] = useState(false);
	const [pMoney, setPMoney] = useState(1000);
	const [pBet, setPBet] = useState(0);

	// game useStates
	const [result, setResult] = useState(null);
	const [isRoundStarted, setIsRoundStarted] = useState(true)
	const [roundCount, setRoundCount] = useState(1)
	const [roundsStatistic, setRoundsStatistic] = useState([]);
	const [showRoundStatistic, setShowRoundStatistic] = useState(false);

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
		if (dice[0] === null || dice[1] === null || dice[2] === null) {
			return -1;
		}
		if (dice[0] === dice[1] && dice[1] === dice[2]) return 10;
		if (dice.join() === "4,5,6") return 10;
		if (dice.join() === "1,2,3") return -2;
		if (dice[0] !== dice[1] && dice[1] !== dice[2] && dice[1] !== dice[3]) return 0;
		if (dice[0] === dice[1] || dice[1] === dice[2] || dice[1] === dice[3]) {
			const pointDie = dice[0] === dice[1] ? dice[2] : dice[0];
			return pointDie === 1 ? -2 : pointDie === 6 ? 10 : pointDie;
		}
	}

	const pointChecker = (score, currentPlayer) => {
		// check if die values are null
		if (score === -1) {
			return "Roll " + currentPlayer + "'s dice";
		}
		if (score === 10) {
			return "INSTANT WIN";
		}
		if (score === -2) {
			return "INSTANT LOSS";
		}
		if (score === 0) {
			// return "INDETERMINATE: ROLL AGAIN!";
			return "Roll " + currentPlayer + "'s dice";
		}
		return "score: " + score;

	}

	// game result finder
	const gameResult = (bankerScore, playerScore) => {
		if (playerScore === -1) {
			setResult("Please roll your dice!");
			return "Roll player's dice";
		}
		if (bankerScore === playerScore) {
			setResult("PUSH");
			return "TIE";
		}
		if (bankerScore > playerScore) {
			setResult("BANKER WINS");
			setPMoney(pMoney - pBet);
			return "BANKER WINS";
		}
		if (bankerScore < playerScore) {
			setResult("PLAYER WINS");
			setPMoney(pMoney + pBet);
			return "PLAYER WINS";
		}
	}

	const ref1 = useRef();
	const ref2 = useRef();
	const ref3 = useRef();
	const bankerRollClick = () => {
		ref1.current.rollDice();
		ref2.current.rollDice();
		ref3.current.rollDice();
	};

	// reset dice if score is 0
	const resetIndeterminate = () => {
		if (bScore === 0) {
			setBDie_1(null);
			setBDie_2(null);
			setBDie_3(null); ``
		}
		if (pScore === 0) {
			setPDie_1(null);
			setPDie_2(null);
			setPDie_3(null);
		}
	}

	const resetRound = () => {
		setPBet(0);
		setBRoll(false);
		setPRoll(false);
		setBScore(null);
		setPScore(null);
		setBDie_1(null);
		setBDie_2(null);
		setBDie_3(null);
		setPDie_1(null);
		setPDie_2(null);
		setPDie_3(null);
	}

	const startRound = () => {

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
		if (bScore !== null) {
			setBRoll(true);
		}
		if (pScore !== null) {
			setPRoll(true);
		}
		if (bScore === 10) {
			setResult("BANKER WINS");
			setPDie_1(1);
			setPDie_2(2);
			setPDie_3(3);
		}

		gameResult(bScore, pScore);
		setPScore(score([pDie_1, pDie_2, pDie_3]))
		setBScore(score([bDie_1, bDie_2, bDie_3]))

	}, [bDie_1, bDie_2, bDie_3, bScore, gameResult, pDie_1, pDie_2, pDie_3, pScore]);

	return (
		<div className={styles.round}>
			<div className={styles.alphaButtons}>
				{/* roll banker's dice with ref */}
				<button
					disabled={bDie_1 !== null || bDie_2 !== null || bDie_3 !== null || pBet <= 0}
					onClick={bankerRollClick}>
					2. Roll Banker
				</button>
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
				{/* button to reset player bet */}
				<button
					onClick={() => {
						setPBet(0);
					}}>
					Reset Player Bet
				</button>
				{/* button to reset game */}
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
						setPBet(0);
						setResult("");
						setBScore(0);
						setPScore(0);
						setBMoney(1000);
						setPMoney(1000);
					}}>
					Reset Game
				</button>
			</div>
			{console.log("")}
			{/* {console.log("1-2-3 instant loss: " + score([1, 2, 3]))}
			{console.log("1-1-1 instant win: " + score([1, 1, 1]))}
			{console.log("4-5-6 instant win: " + score([4, 5, 6]))}
			{console.log("5-5-1 instant loss: " + score([5, 5, 1]))}
			{console.log("2-2-1 instant loss: " + score([2, 2, 1]))} */}
			<h1 className={styles.title}> Cee-Lo: New Yorker&apos;s favorite dice game</h1>

			<div className={styles.game}>
				<h2 className={styles.Buser}> Banker</h2>
				<div className={styles.Bdie1}>
					<Dice
						onRoll={(value) => setBDie_1(value)}
						size={95}
						// cheatValue={6}
						ref={ref1}
						// disabled={bDie_1 !== null} />
						disabled={true} />
				</div>
				<div className={styles.Bdie2}>
					<Dice
						onRoll={(value) => setBDie_2(value)}
						size={95}
						ref={ref2}
						// cheatValue={6}
						// disabled={bDie_2 !== null} />
						disabled={true} />
				</div>
				<div className={styles.Bdie3}>
					<Dice
						onRoll={(value) => setBDie_3(value)}
						size={95}
						// cheatValue={6}
						ref={ref3}
						// disabled={bDie_3 !== null} />
						disabled={true} />
				</div>
				{/* {console.log("banker dice:", bDie_1, bDie_2, bDie_3)}
			{console.log("score:", bScore)} */}
				<h3 className={styles.Bresult}>{bScore === -1 ? "Roll Banker's dice" : pointChecker(bScore, "Banker")}</h3>

				<h2 className={styles.Puser}>Player</h2>
				<div className={styles.Pdie1}>
					<Dice
						onRoll={(value) => setPDie_1(value)}
						size={95}
						disabled={pDie_1 !== null || pBet <= 0} />
				</div>
				<div className={styles.Pdie2}>
					<Dice
						onRoll={(value) => setPDie_2(value)}
						size={95}
						disabled={pDie_2 !== null || pBet <= 0} />
				</div>
				<div className={styles.Pdie3}>
					<Dice
						onRoll={(value) => setPDie_3(value)}
						size={95}
						disabled={pDie_3 !== null || pBet <= 0} />
				</div>
				{/* {console.log("player dice:", pDie_1, pDie_2, pDie_3)}
			{console.log("score:", pScore)} */}
				{/* <h3>{pScore == -2 ? "Roll Player's dice" : "score: " + pScore}</h3> */}
				<h3 className={styles.Presult}>{pointChecker(pScore, "Player")}</h3>
			</div>


			<div className={styles.betEl}>
				{/* form for the player to place bets */}

				{/* {console.log("player bet:", pBet)} */}

				{/* display money */}
				{/* <h2>Banker Money: ${bMoney}</h2> */}
				<h2>Username</h2>
				<h2>Tokens: {pMoney}</h2>
				<form onSubmit={submitBet} className={styles.makeBet}>
					<label>
						Bet:
						<input type="number" name="bet" />
					</label>
					<input className={styles.betButton} type="submit" value="BET" />
				</form>

				<button onClick={notify}>Notify!</button>
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					// rtl={true}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>

				{/* display game result */}
				<h2>Game Result: {result}</h2>

				<h2>Hotkeys</h2>
				<h3>space: bet</h3>
				<h3>E: halve bet</h3>
				<h3>R: double bet</h3>
				<h3>D: roll dice / play</h3>
			</div>


			<div className={styles.logEl}>
				{/* display game log
				<h2>CHAT / GAME LOG GOES HERE</h2>
				<h2>{"banker dice: " + bDie_1 + " " + bDie_2 + " " + bDie_3}</h2>
				<h2>{"score: " + bScore}</h2>
				<h2>{"player dice: " + pDie_1 + " " + pDie_2 + " " + pDie_3}</h2>
				<h2>{"score: " + pScore}</h2>
				<h2>{"player bet: " + pBet}</h2> */}
				<div className={styles.sideBar}>
					<ul className={styles.sideBarOptions} >
						<li className={styles.sideBarChatFrame}>
							<a className={styles.sideBarChat}>CHAT</a>
						</li>
						<li className={styles.sideBarHistoryFrame}>
							<a className={styles.sideBarHistory}>HISTORY</a>
						</li>
					</ul>
					<a className={styles.sideBarSetting}>S</a>
				</div>
				<div className={styles.chatContent}>
				</div>
			</div>
		</div >
	);
}

export default Round;