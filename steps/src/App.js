import { useState } from "react";

const messages = [
  "1. Learn React ⚛️",
  "2. Apply for jobs 💼",
  "3. Invest your new income 🤑",
];

const App = () => {
  const [messageIdx, setMessageIdx] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  const handlePrevious = () => {
    if (messageIdx > 0) {
      setMessageIdx(messageIdx - 1);
    }
  };

  const handleNext = () => {
    if (messageIdx < messages.length - 1) {
      setMessageIdx((msgIdx) => msgIdx + 1);
      setMessageIdx((msgIdx) => msgIdx + 1);
    }
  };

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="close" onClick={handleClose}>
        &times;
      </button>

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={messageIdx >= 0 ? "active" : null}>1</div>
            <div className={messageIdx >= 1 ? "active" : null}>2</div>
            <div className={messageIdx >= 2 ? "active" : null}>3</div>
          </div>

          <Message messageIdx={messageIdx} />

          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const Message = ({ messageIdx }) => {
  return <p className="message">{messages[messageIdx]}</p>;
};

export default App;
