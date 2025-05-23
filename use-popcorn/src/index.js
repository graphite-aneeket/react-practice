import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StarRating from "./StarRating";
import { useState } from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));

const maxRating = 10;

const Test = () => {
  const [rating, setRating] = useState(0);

  const updateRating = (newRating) => {
    setRating(newRating);
  };

  return (
    <>
      <StarRating
        maxRating={maxRating}
        rating={rating}
        onSetRating={updateRating}
      />
      <p>Rating is {rating}</p>
    </>
  );
};

root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

