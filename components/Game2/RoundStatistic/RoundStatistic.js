const RoundStatistic = ({ data, roundCount }) => {
  return (
    <section>
      <h2>Round {roundCount} statistic</h2>

      {data.map(({ roundNumber, coinTossNumber, playerWinsCount }) => {
        const casinoWinsCount = coinTossNumber - playerWinsCount;
        const winRate = playerWinsCount - casinoWinsCount;
        const getWinnerMessage = () => {
          if (winRate > 0) {
            return 'You won this round';
          } else if (winRate < 0) {
            return 'Casino won this round';
          } else {
            return 'There is no winner in this round';
          }
        };

        const winnerMessage = getWinnerMessage();

        if (roundNumber === roundCount)
          return (
            <div key={roundNumber}>
              <p>Coin toss number: {coinTossNumber}</p>
              <p>You won {playerWinsCount} set(s)</p>
              <p>Casino won {casinoWinsCount} set(s)</p>
              <p>{winnerMessage}</p>
            </div>
          );
      })}
    </section>
  );
};

export default RoundStatistic;
