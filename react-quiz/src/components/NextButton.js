import { useQuiz } from "../contexts/QuizContext";

function NextButton({ showFinish }) {
  const { answer, dispatch, status } = useQuiz();

  if (answer === null) {
    return null;
  }

  function handleNextClick() {
    if (status === "active") {
      if (showFinish) {
        dispatch({ type: "finish" });
      } else {
        dispatch({ type: "nextQuestion" });
      }
    } else if (status === "finished") {
      dispatch({ type: "restart" });
    }
  }

  return (
    <button className="btn btn-ui" onClick={handleNextClick}>
      {showFinish ? "Finish" : "Next"}
    </button>
  );
}

export default NextButton;
