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

const score = (dice, currentPlayer) => {
	console.log(currentPlayer);

	dice.sort();
	// check if die values are null
	if (dice[0] === null || dice[1] === null || dice[2] === null) {
		return -2;
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


// class Round extends Component {
const Round = () => {
	// Banker useStates
	const [bDie_1, setBDie_1] = useState(null);
	const [bDie_2, setBDie_2] = useState(null);
	const [bDie_3, setBDie_3] = useState(null);
	const [bScore, setBScore] = useState(null);
	const [bRoll, setBRoll] = useState(false);

	// Player useStates
	const [pDie_1, setPDie_1] = useState(null);
	const [pDie_2, setPDie_2] = useState(null);
	const [pDie_3, setPDie_3] = useState(null);
	const [pScore, setPScore] = useState(null);
	const [pRoll, setPRoll] = useState(false);



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
		setPScore(score([pDie_1, pDie_2, pDie_3]))
		setBScore(score([bDie_1, bDie_2, bDie_3]))
	}, [bDie_1, bDie_2, bDie_3, bScore, pDie_1, pDie_2, pDie_3, pScore]);

	return (
		<div className={styles.round}>
			{console.log("")}
			<h1 className={styles.title}>Cee-Lo (hood nigga&apos;s dice game)</h1>

			{/* <button onClick={() => setBRoll(true)}>Roll Banker</button>
			<button onClick={() => setPRoll(true)}>Roll Player</button> */}

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
			{console.log("score:", bScore)}
			{/* <h3>{bScore == -2 ? "Roll Bank's dice" : "score: " + bScore}</h3> */}
			<h3>{pointChecker(bScore, "Banker")}</h3>


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

			<div></div>

			<form className="flex flex-col" onSubmit={submitContact2}>
				<label htmlFor="name" className="mb-2 italic">Name</label>
				<input
					className="mb-4 border-b-2"
					id="name"
					name="name"
					type="text"
					autoComplete="name"
					required
				/>
				<button
					type="submit"
					className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
				>
					Submit
				</button>
			</form>

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