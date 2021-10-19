import React, { useRef } from "react";
import { v4 as uuid } from "uuid";
import { SvgAdventure } from "./Svg";

const Question = ({
  question,
  options,
  answer,
  currentQuestion,
  setCorrectAnswerCount,
  setCurrentQuestion,
}) => {
  const bullets = ["A", "B", "C", "D"];
  const optionsContainer = useRef(null);
  let btnClickCount = 0;

  const evaluator = (e, option) => {
    const btnClicked = e.currentTarget;
    if (btnClickCount === 1) {
      if (typeof answer === "object") {
        answer = answer[0].toString();
        option = option[0].toString();
      } else {
        answer = answer.toString();
        option = option.toString();
      }

      Array.from(optionsContainer.current.children).forEach((btn) => {
        if (btn.textContent.slice(1) === answer) {
          btn.classList.add("right");
        }
      });

      if (option === answer) {
        setTimeout(() => {
          setCorrectAnswerCount(
            (correctAnswserCount) => correctAnswserCount + 1
          );
          setCurrentQuestion(currentQuestion + 1);
        }, 1000);
      } else {
        Array.from(optionsContainer.current.children).forEach((btn) => btn);
        btnClicked.classList.add("wrong");
        setTimeout(() => {
          setCurrentQuestion(currentQuestion + 1);
        }, 1000);
      }
    }
  };

  return (
    <article className="card question-card">
      <h1 className="title">Country Quiz</h1>
      <SvgAdventure />
      <div className="question-container">
        <h2>{question}</h2>
      </div>
      <div className="options-container" ref={optionsContainer}>
        {options.map((option, index) => (
          <button
            onClick={(e) => {
              btnClickCount += 1;
              evaluator(e, option);
            }}
            className="option-btn"
            key={uuid()}
          >
            {bullets[index]}
            <div className="space"></div>
            {option.length
              ? option.length > 33
                ? option.substr(0, 30) + "..."
                : option
              : "None of the above"}
          </button>
        ))}
      </div>
    </article>
  );
};

export default Question;
