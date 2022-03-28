import { useEffect, useState, useReducer, useCallback } from 'react';
import Dice from "react-dice-roll";
import styles from './Round.module.scss';

// commenting out this ghetto ass lib
// import ReactDice from 'react-dice-complete'
// import dynamic from 'next/dynamic';
// import { render } from 'react-dom';
// const ReactDice = dynamic(() => import('react-dice-complete'), { ssr: false });
// import dieStyles from 'react-dice-complete/dist/react-dice-complete.css';



// const Round = () => {

// 	return (
// 		<div className={styles.round}>
// 			<h1 className={styles.title}>React Dice Roll</h1>
// 			{/* <Dice cheatValue={2} size={80}/> */}
// 			<h2>Banker</h2>
// 			<Dice onRoll={(value) => console.log("banker die 1:", value)} size={80} />
// 			<Dice onRoll={(value) => console.log("banker die 2:", value)} size={80} />
// 			<Dice onRoll={(value) => console.log("banker die 3:", value)} size={80} />
// 			<h2>Player</h2>
// 			<Dice onRoll={(value) => console.log("player die 1:", value)} size={80} />
// 			<Dice onRoll={(value) => console.log("player die 2:", value)} size={80} />
// 			<Dice onRoll={(value) => console.log("player die 3:", value)} size={80} />

// 			<h2>test dice lib 2</h2>
// 			<ReactDice
// 				numDice={3}
// 				rollDone={(roll) => console.log("roll done:", roll)}
// 				diceSize={80}
// 			/>
// 		</div>
// 	);
// };

// export default Round;

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
	// check for x-x-6
	if (dice[0] === dice[1] && dice[2] === 6) {
		return "INSTANT WIN: x-x-6";
	}
	// check for x-x-y #1
	if (dice[0] === dice[1] && dice[2] !== 6) {
		return "POINTS: x-x-" + dice[2];
	}
	// check for x-x-y #2
	if (dice[0] === dice[1] && dice[2] !== 1) {
		return "POINTS: x-x-" + dice[2];
	}
	// check for x-x-1
	if (dice[0] === dice[1] && dice[2] === 1) {
		return "INSTANT LOSS: x-x-1";
	}
	// check for 1-2-3
	if (dice[0] === 1 && dice[1] === 2 && dice[2] === 3) {
		return "INSTANT LOSS: 1-2-3";
	}
	// check for x-y-z
	if (dice[0] !== dice[1] && dice[1] !== dice[2] && dice[0] !== dice[2]) {
		return "INDETERMINATE: " + dice[0] + "-" + dice[1] + "-" + dice[2];	
	}
	// return default
	return "default";
	// return dice.reduce((acc, curr) => acc + curr, 0);
};


export default function Round() {

	useEffect(() => {
		console.log(rollCombination([6, 6, 6]));
		console.log(rollCombination([4, 5, 6]));
		console.log(rollCombination([3, 3, 6]));
		console.log(rollCombination([4, 4, 5]));
		console.log(rollCombination([5, 5, 1]));
		console.log(rollCombination([1, 2, 3]));
		console.log(rollCombination([3, 5, 6]));
	})

	return (
		<div className={styles.round}>
			<h1 className={styles.title}>React Dice Roll</h1>
			{/* <Dice cheatValue={2} size={80}/> */}
			<h2>Banker</h2>
			<Dice onRoll={(bDie_1) => console.log("banker die 1:", bDie_1)} size={80} />
			<Dice onRoll={(bDie_2) => console.log("banker die 2:", bDie_2)} size={80} />
			<Dice onRoll={(bDie_3) => console.log("banker die 3:", bDie_3)} size={80} />
			<h2>Player</h2>
			<Dice onRoll={(pDie_1) => console.log("player die 1:", pDie_1)} size={80} />
			<Dice onRoll={(pDie_2) => console.log("player die 2:", pDie_2)} size={80} />
			<Dice onRoll={(pDie_3) => console.log("player die 3:", pDie_3)} size={80} />

			{/* <h2>Banker</h2>
			{(typeof window !== 'undefined') &&
				<ReactDice
					className={styles.dieStyles}
					numDice={3}
					rollDone={(bankRolls) => console.log("Banker Roll Sum:", bankRolls)}
					diceSize={80}
					rollTime={0.4}
				/>
			}
			<h2>Player</h2>
			{(typeof window !== 'undefined') &&
				<ReactDice
					className={styles.dieStyles}
					numDice={3}
					rollDone={(playerRolls) => console.log("Player Roll Sum:", playerRolls)}
					diceSize={80}
					rollTime={0.4}
				/>
			} */}
		</div>
	);
}