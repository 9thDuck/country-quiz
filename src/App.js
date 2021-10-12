import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import { data } from "./data"; // fetch result output for just in case

const App = () => {
  ////////////////////////////////////////////////////////////////////////////
  //////////////////////////  STATES  ////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  const [allCountries, setAllCountries] = useState(data);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [questions, setQuestions] = useState([]);

  ////////////////////////////////////////////////////////////////////////////
  //////////////////////////  FUNCTIONS  /////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  const makeQuestions = () => {
    const questionsTemp = [];
    selectedCountries.forEach((country) => {
      const randomNumber = Math.floor(Math.random() * 20);
      const { name, capital } = country;

      switch (randomNumber) {
        case 1:
          optionsList("name");
          questionsTemp.push({
            question: `${capital} is the capital of...`,
            options,
          });
          setOptions([]);
          break;
        case 2:
          optionsList("callingCode");
          questionsTemp.push({
            question: `Which is the calling code of ${name}`,
            options,
          });
          setOptions([]);
          break;
        case 3:
          optionsList("name");
          questionsTemp.push({
            question: `Which country's capital is ${capital}?`,
            options,
          });
          setOptions([]);
          break;
        case 4:
          optionsList("region");
          questionsTemp.push({
            question: `${name} is situated in...`,
            options,
          });
          setOptions([]);
          break;
      }
    });

    setQuestions(questionsTemp);
  };

  const optionsList = (param) => {
    const optionsTemp = [];
    while (optionsTemp.length < 5) {
      const randomIndex = Math.floor(Math.random() * allCountries.length);
      const optionObj = allCountries[randomIndex];
      optionsTemp.push(optionObj[param]);
    }
    setOptions(optionsTemp);
  };

  useEffect(() => {
    const selectedCountriesTemp = [];
    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const country = allCountries[randomIndex];
      selectedCountriesTemp.push(country);
    }

    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////// Problem /////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    console.log(selectedCountriesTemp); // This is an array of 20 objects
    setSelectedCountries(selectedCountriesTemp); // I try to update the state here but it doesn't get updated. Why?
    console.log(selectedCountries); // This returns an empty array
    makeQuestions();
    setLoading(false);
  }, []);

  ////////////////////////////////////////////////////////////////////////////
  //////////////////////////  RETURNS ////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  if (loading) return <Loading />;

  return (
    <main className="app-main">
      <section className="title">
        <h1 className="title">Country Quiz</h1>
        <article className="quiz-card"></article>
      </section>
    </main>
  );
};

export default App;
