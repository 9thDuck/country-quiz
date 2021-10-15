import React from "react";

const Question = ({ questions, currentQuestion,selectedCountries }) => {
  return (
    <article className="quiz-card">
      {console.log(selectedCountries, questions, currentQuestion)}
      {questions && questions.map((question) => question.question)}
    </article>
  );
};

export default Question;
