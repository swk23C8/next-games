import { useEffect, useState, useReducer, useCallback } from 'react';
import Dice from "react-dice-roll";
import styles from './Round.module.scss';
// import ReactDice from 'react-dice-complete'

import dynamic from 'next/dynamic';
import { render } from 'react-dom';
const ReactDice = dynamic(() => import('react-dice-complete'), { ssr: false });
import dieStyles from 'react-dice-complete/dist/react-dice-complete.css';



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

export default function Round() {
	return (
		<div className={styles.round}>
			<h1 className={styles.title}>React Dice Roll</h1>
			{/* <Dice cheatValue={2} size={80}/> */}
			<h2>Banker</h2>
			<Dice onRoll={(value) => console.log("banker die 1:", value)} size={80} />
			<Dice onRoll={(value) => console.log("banker die 2:", value)} size={80} />
			<Dice onRoll={(value) => console.log("banker die 3:", value)} size={80} />
			<h2>Player</h2>
			<Dice onRoll={(value) => console.log("player die 1:", value)} size={80} />
			<Dice onRoll={(value) => console.log("player die 2:", value)} size={80} />
			<Dice onRoll={(value) => console.log("player die 3:", value)} size={80} />

			<h2>Banker</h2>
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
			}
		</div>
	);
}