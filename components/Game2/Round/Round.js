import { useEffect, useState, useReducer, useCallback } from 'react';
import Dice from "react-dice-roll";


const Round = () => {

	return (
		<div className="round">
			<h1>React Dice Roll</h1>
			<Dice cheatValue={2} size={80}/>

			<Dice onRoll={(value) => console.log(value)} size={80}/>
		</div>
	);
};

export default Round;