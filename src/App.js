import React, { useState, useEffect } from "react";
import Loading from "./Loading";

const App = () => {
  ////////////////////////////////////////////////////////////////////////////
  //////////////////////////  STATES  ////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [questions, setQuestions] = useState([]);

  ////////////////////////////////////////////////////////////////////////////
  //////////////////////////  FUNCTIONS  /////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  // fetching countries json, and then selecting 20 countries out of all the countries.
  const getData = async () => {
    try {
      const response = await fetch(
        "http://api.countrylayer.com/v2/all?access_key=0413fc1849bd3a0140fa8f1f40dbb00a"
      );
      const data = await response.json();
      const selectedCountriesTemp = [];
      for (let i = 0; i < 20; i++) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const country = data[randomIndex];
        selectedCountriesTemp.push(country);
      }
      // setting the list of all countries to the state
      setAllCountries(data);
      setSelectedCountries(selectedCountriesTemp);
    } catch (err) {
      console.log(err);
    }
  };

  const makeQuestions = () => {
    const questionsTemp = [];
    selectedCountries.forEach((country) => {
      const randomNumber = Math.floor(Math.random() * 20);
      const { name, callingCode, capital, region } = country;
      switch (randomNumber) {
        case 1:
          optionsList(name);
          questionsTemp.push({
            question: `${capital} is the capital of...`,
            options,
          });
          break;
        case 2:
          optionsList(callingCode);
          questionsTemp.push({
            question: `Which is the calling code of ${name}`,
            options,
          });
          break;
        case 3:
          optionsList(name);
          questionsTemp.push({
            question: `Which country's capital is ${capital}?`,
            options,
          });
          break;
        case 4:
          optionsList(region);
          questionsTemp.push({
            question: `${name} is situated in...`,
            options,
          });
          break;
      }
    });

    setQuestions(questionsTemp);
  };

  const optionsList = (param) => {
    const optionsTemp = [];
    while (optionsTemp.length < 5) {
      const randomIndex = Math.floor(Math.random() * allCountries.length);
      const optionParent = allCountries[randomIndex];
      console.log(optionParent);
      optionsTemp.push(optionParent.param);
    }
  };

  useEffect(() => {
    getData();
    makeQuestions();
    setLoading(false);
    console.log(questions);
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
