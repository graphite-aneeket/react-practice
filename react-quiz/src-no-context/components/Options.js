function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;

  const handleAnswerClick = (chosenAnswer) => {
    if (!hasAnswered) {
      dispatch({ type: "answered", payload: chosenAnswer });
    }
  };

  return (
    <div className="options">
      {question.options.map((option, idx) => (
        <button
          className={`btn btn-option ${idx === answer && "answer"} ${
            !hasAnswered
              ? ""
              : idx === question.correctOption
              ? "correct"
              : "wrong"
          }`}
          key={option}
          disabled={answer !== null}
          onClick={() => handleAnswerClick(idx)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
