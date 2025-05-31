function FinishScreen({ points, maxPossiblePoints, highScore, dispatch }) {
  const percentage = Math.ceil((points / maxPossiblePoints) * 100);

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  const handleOnRestartQuiz = () => {
    dispatch({ type: "restart" });
  };

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <storng>{points}</storng> out of{" "}
        {maxPossiblePoints} ({percentage}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button className="btn btn-ui" onClick={handleOnRestartQuiz}>
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
