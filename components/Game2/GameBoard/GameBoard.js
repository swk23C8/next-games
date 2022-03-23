import HoldOrContinue from '../HoldOrContinue/HoldOrContinue';
import { Alert, Paper, Snackbar } from '@mui/material';
import { useRef, useState, useEffect, useReducer, useContext } from 'react';
import Dice from 'react-dice-roll';
import { Context } from '../../Context';
import EndGame from '../EndGame/EndGame';

const diceReducer = (state, action) => {
	switch (action.type) {
		case 'leftRolled':
			return { ...state, leftDieValue: action.payload };
		case 'rightRolled':
			return { ...state, rightDieValue: action.payload };
		case 'clearDice':
			return { rightDieValue: 0, leftDieValue: 0 };

		default:
			throw new Error();
	}
};

export default function GameBoard() {

	return (
		<>
			test
		</>
	)
}
