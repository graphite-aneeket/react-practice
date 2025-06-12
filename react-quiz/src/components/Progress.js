import { useQuiz } from "../contexts/QuizContext";

function Progress({ numQuestions, maxPossiblePoints }) {
  const { idx, points, answer } = useQuiz();

  return (
    <header className="progress">
      <progress max={numQuestions} value={idx + Number(answer !== null)} />
      <p>
        Question <strong>{idx + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
