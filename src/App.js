import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import { data } from "./data"; // replaced the fetch functionality with local data module
import Question from "./Question"; // I have console loggged the state values in this module, please take a look at them.

const App = () => {
  ////////////////////////////////////////////////////////////////////////////
  //////////////////////////  STATES  ////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
const [loading, setLoading] = useState(true);
  const [allCountries, setAllCountries] = useState(data);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [options, setOptions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  ////////////////////////////////////////////////////////////////////////////
  //////////////////////////  FUNCTIONS  /////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

const makeQuestions = () => {
    const questionsTemp = [];
    selectedCountries.forEach((country, index) => {
      const randomNumber = Math.round(Math.random() * 4);
      const { name, capital } = country;
      console.log(country);
      switch (randomNumber) {
        case 1:
          optionsList("name");
          questionsTemp.push({
            question: `${capital} is the capital of...`,
            options,
            index,
          });
          setOptions([]);
          break;
        case 2:
          optionsList("callingCodes");
          questionsTemp.push({
            question: `Which is the calling code of ${name}`,
            options,
            index,
          });
          setOptions([]);
          break;
        case 3:
          optionsList("name");
          questionsTemp.push({
            question: `Which country's capital is ${capital}?`,
            options,
            index,
          });
          setOptions([]);
          break;
        case 4:
          optionsList("region");
          questionsTemp.push({
            question: `${name} is situated in...`,
            options,
            index,
          });
          setOptions([]);
          break;
      }
    });

    setQuestions(questionsTemp);
  };

  const optionsList = (param) => {
    const optionsTemp = [];
    while (optionsTemp.length < 4) {
      const randomIndex = Math.floor(Math.random() * allCountries.length);
      const optionObj = allCountries[randomIndex];
      optionObj[param] === "callingCodes"
        ? optionsTemp.push(...optionObj[param])
        : optionsTemp.push(optionObj[param]);
    }
    setOptions(optionsTemp);
    
  };

  useEffect(() => {
    const selectedCountriesTemp = [];
    while (selectedCountriesTemp.length < 20) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const country = allCountries[randomIndex];
      selectedCountriesTemp.push(country);
    }

    setSelectedCountries(selectedCountriesTemp);

    setTimeout(() => {
      makeQuestions();
      setLoading(false);
    }, 500);
  }, []);

  

  const questionChanger = () => {
    console.log(currentQuestion);
  };

  ////////////////////////////////////////////////////////////////////////////
  //////////////////////////  RETURNS ////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  if (loading) return <Loading />;

  return (
    <main className="app-main">
      <section className="title">
        <h1 className="title">Country Quiz</h1>

        <Question
          selectedCountries={selectedCountries}
          currentQuestion={currentQuestion}
          questions={questions}
        />
      </section>
    </main>
  );
};

export default App;
