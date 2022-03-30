import { useEffect, useState, useReducer, useCallback, Component } from 'react';
import Dice from "react-dice-roll";
import styles from './Round.module.scss';

// import ReactDice from 'react-dice-complete';
// import dieStyles from 'react-dice-complete/dist/react-dice-complete.css';


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
const rollCombination = (dice) => {
	// sort dice
	dice.sort((a, b) => a - b);
	// console.log("dice:", dice);
	// check for triple
	if (dice[0] === dice[1] && dice[1] === dice[2]) {
		return "INSTANT WIN: triple";
	}
	// check for 4-5-6
	if (dice[0] === 4 && dice[1] === 5 && dice[2] === 6) {
		return "INSTANT WIN: 4-5-6";
	}
	// check for 1-2-3
	if (dice[0] === 1 && dice[1] === 2 && dice[2] === 3) {
		return "INSTANT LOSS: 1-2-3";
	}
	// check for x-x-6
	if (dice[0] === dice[1] && dice[2] === 6) {
		return "INSTANT WIN: x-x-6";
	}
	// check for x-x-1
	if (dice[0] === 1 && dice[1] === dice[2]) {
		return "INSTANT LOSS: x-x-1";
	}
	// check for x-y-z
	if (dice[0] !== dice[1] && dice[1] !== dice[2] && dice[0] !== dice[2]) {
		return "INDETERMINATE: " + dice[0] + "-" + dice[1] + "-" + dice[2];
	}
	// check for x-x-y #1
	if (dice[0] === dice[1] && dice[2] !== 6) {
		return "POINTS: x-x-" + dice[2];
	}
	// check for x-x-y #2
	if (dice[0] !== 1 && dice[1] === dice[2]) {
		return "POINTS: x-x-" + dice[2];
	}
	// check for x-x-y #3

	// return default
	return "default";
	// return dice.reduce((acc, curr) => acc + curr, 0);
};

const score = (dice) => {
	dice.sort();
	// check if die values are null
	if (dice[0] === null || dice[1] === null || dice[2] === null) {
		return 'null';
	}
	if (dice[0] === dice[1] && dice[1] === dice[2]) return 10;
	if (dice.join() === "4,5,6") return 10;
	if (dice[0] !== dice[1] && dice[1] !== dice[2] && dice[1] !== dice[3]) return 0;
	if (dice.join() === "1,2,3") return -1;
	if (dice[0] === dice[1] || dice[1] === dice[2] || dice[1] === dice[3]) {
		const pointDie = dice[0] === dice[1] ? dice[2] : dice[0];
		return pointDie === 1 ? -1 : pointDie === 6 ? 10 : pointDie;
	}
}


// class Round extends Component {
const Round = () => {

	// Banker dice useStates
	const [bDie_1, setBDie_1] = useState(null);
	const [bDie_2, setBDie_2] = useState(null);
	const [bDie_3, setBDie_3] = useState(null);

	// Player dice useStates
	const [pDie_1, setPDie_1] = useState(null);
	const [pDie_2, setPDie_2] = useState(null);
	const [pDie_3, setPDie_3] = useState(null);


	useEffect(() => {
		// POINTS: x-x-3 
		// console.log(score([5, 5, 3]));
		// console.log(score([2, 6, 6]));
		// console.log(score([6, 6, 6]));
		// console.log(score([4, 5, 6]));
		// console.log(score([3, 3, 6]));
		// console.log(score([4, 4, 5]));
		// console.log(score([5, 5, 1]));
		// console.log(score([3, 5, 6]));
		// console.log(score([1, 1, 1]));
	}, []);

	return (
		<div className={styles.round}>
			{console.log("")}
			<h1 className={styles.title}>Cee-Lo (hood nigga's dice game)</h1>

			<h2>Banker</h2>
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
			{console.log(score([bDie_1, bDie_2, bDie_3]))}


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
			{console.log(score([pDie_1, pDie_2, pDie_3]))}


			<div></div>
			{/* button to clear dice value */}
			<button
				onClick={() => {
					setBDie_1(null);
					setBDie_2(null);
					setBDie_3(null);
				}}>
				Clear Banker Dice
			</button>
			<button
				onClick={() => {
					setPDie_1(null);
					setPDie_2(null);
					setPDie_3(null);
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
				}}>
				Clear All Dice
			</button>
		</div>
	);
}

export default Round;