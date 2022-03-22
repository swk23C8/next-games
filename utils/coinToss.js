/* Function that simulates a coin toss */

export const coinToss = () =>
  Math.floor(Math.random() * 2) === 1 ? 'heads' : 'tails';
