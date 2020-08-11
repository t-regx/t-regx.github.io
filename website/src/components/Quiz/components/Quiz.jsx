import React, {useState} from "react";

import QuizSlider from "./QuizSlider";
import PointCounter from "./PointCounter";

export default ({questions, openingSlide, finishSlide}) => {
  const [slide, setSlide] = useState(-1); // "slide=-1" means "opening slide"
  const [answers, setAnswers] = React.useState({});

  const startQuiz = () => {
    setSlide(0);
    setAnswers({0: "pending"});
  };

  const setNextAnswer = (question, answer, isLast) => setAnswers(Object.assign({}, answers, {
    [question]: answer ? "correct" : "incorrect",
    [question + 1]: isLast ? "last" : "pending"
  }));

  return <>
    <QuizSlider
      questions={questions}
      slide={slide + 1}
      onSlideChange={(question, answer, isLast) => {
        setNextAnswer(question, answer, isLast);
        setSlide(question + 1);
      }}
      firstSlide={openingSlide(startQuiz)}
      lastSlide={finishSlide()}/>
    <PointCounter answers={Object.values(answers)} current={slide} onPointClick={index => setSlide(index)}/>
  </>;
};
