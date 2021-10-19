import React, { useState, useEffect } from "react";
import { data } from "./data"; // replaced the fetch functionality with local data module
import Question from "./Question";
import { v4 as uuid } from "uuid";
import { SvgWinners, SvgAdventure } from "./Svg";

const App = () => {
  ////////////////////////////////////////////////////////////////////////////
  //////////////////////////  STATES  ////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  const [allCountries] = useState(data);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);

  ////////////////////////////////////////////////////////////////////////////
  //////////////////////////  FUNCTIONS  /////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  const makeQuestions = () => {
    const questionsTemp = selectedCountries.map((country, index) => {
      const randomNumber = Math.round(Math.random() * 3);
      let options;
      const { name, capital, callingCodes, region } = country;
      let question;
      switch (randomNumber) {
        case 0:
          options = optionsList(name, "name");
          question = {
            question: `${capital} is the capital of...`,
            options,
            answer: name,
          };
          options = undefined;
          return question;

        case 1:
          options = optionsList(callingCodes, "callingCodes");
          question = {
            question: `Which is the calling code of ${name}?`,
            options,
            answer: callingCodes.flat(),
            index,
          };
          options = undefined;
          return question;

        case 2:
          options = optionsList(capital, "capital");
          question = {
            question: `Which is the capital of ${name}?`,
            options,
            answer: capital,
            index,
          };
          options = undefined;
          return question;

        case 3:
          options = optionsList(region, "region");
          question = {
            question: `${name} is situated in...`,
            options,
            answer: region,
          };

          options = undefined;
          return question;
      }
    });

    setQuestions(questionsTemp);
  };

  const optionsList = (answer, param) => {
    if (answer.typeOf === "array") {
      answer = answer.flat();
    }
    const randomOptionPusher = () => {
      const randomIndex = Math.floor(Math.random() * allCountries.length);
      const optionObj = allCountries[randomIndex];
      let option;

      option =
        optionObj[param].typeOf === Array
          ? optionObj[param].flat()
          : optionObj[param];
      if (option.length && optionsTemp.indexOf(option) === -1) {
        optionsTemp.push(option);
      }
    };

    let optionsTemp = [answer];
    while (optionsTemp.length < 4) {
      randomOptionPusher();
    }
    optionsTemp = optionsTemp.sort((a, b) => 0.5 - Math.random());
    return optionsTemp;
  };

  ////////////////////////////////////////////////////////////////////////////
  //////////////////////////  useEffects /////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const selectedCountriesTemp = [];
    while (selectedCountriesTemp.length < 20) {
      const randomIndex = Math.floor(Math.random() * allCountries.length);
      selectedCountriesTemp.push(allCountries[randomIndex]);
    }
    setSelectedCountries(selectedCountriesTemp);
  }, []);

  useEffect(() => {
    makeQuestions();
  }, [selectedCountries]);

  ////////////////////////////////////////////////////////////////////////////
  //////////////////////////  RETURNS ////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  return (
    <main className="app-main">
      <section>
        {questions.map((qustion, index) => {
          const { question, options, answer } = qustion;

          return (
            <div
              className={`question-card-container ${
                index === currentQuestion ? "active " : ""
              }${index < currentQuestion ? "finished " : ""}${
                index > currentQuestion ? "upcoming" : ""
              }`}
            >
              <Question
                key={uuid()}
                question={question}
                options={options}
                qNum={index + 1}
                correctAnswerCount={correctAnswerCount}
                setCorrectAnswerCount={setCorrectAnswerCount}
                answer={answer}
                currentQuestion={currentQuestion}
                index={index}
                setCurrentQuestion={setCurrentQuestion}
              />
            </div>
          );
        })}

        {currentQuestion === 20 && (
          <article className="card results-container">
            <div className="results-img-container">
              <SvgAdventure />
            </div>
            <div className="results-info">
              <h1 className="results-title">Results</h1>
              <p className="info">
                You got
                <span className="score-span"> {correctAnswerCount} </span>
                correct answers
              </p>
            </div>

            <button
              className="try-again-btn"
              onClick={() => window.location.reload(true)}
            >
              Try again
            </button>
          </article>
        )}
      </section>
    </main>
  );
};

export default App;
