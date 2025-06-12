import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const initialState = {
  questions: [],
  status: "loading", // loading, active, error, finished, ready
  idx: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

const SECS_PER_QUESTION = 30;

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "startQuiz":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "answered": {
      const currentQuestion = state.questions[state.idx];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion.correctOption
            ? currentQuestion.points + state.points
            : state.points,
      };
    }
    case "nextQuestion":
      return { ...state, idx: state.idx + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore: Math.max(state.points, state.highScore),
      };
    case "restart":
      return {
        ...state,
        status: "ready",
        idx: 0,
        answer: null,
        points: 0,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
      };
    default:
      throw new Error("Invalid Action Type");
  }
};

const QuizProvider = ({ children }) => {
  const [
    { questions, status, idx, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, [dispatch]);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        idx,
        answer,
        points,
        highScore,
        secondsRemaining,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => {
  const value = useContext(QuizContext);
  if (value === undefined) {
    throw new Error("useQuiz is being used outside of QuizContext");
  }
  return value;
};

export { useQuiz, QuizProvider };
