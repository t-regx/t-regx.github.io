import React, {ElementType, useState} from "react";

import QuizSlider from "./QuizSlider";
import PointCounter from "./PointCounter";
import {QuestionInt} from "../index";

interface QuizProps {
  questions: QuestionInt[],
  openingSlide: (callback: () => void) => ElementType,
  finishSlide: () => ElementType,
}

interface Answers {
  [key: number]: string
}

export default ({questions, openingSlide, finishSlide}: QuizProps) => {
  const [slide, setSlide] = useState<number>(-1); // "slide=-1" means "opening slide"
  const [answers, setAnswers] = useState<Answers>({});

  const startQuiz = () => {
    setSlide(0);
    setAnswers({0: "pending"});
  };

  const setNextAnswer = (question: number, correct: boolean, isLast: boolean) => {
    setAnswers(joinEntries(answers, {
      [question]: correct ? "correct" : "incorrect",
      [question + 1]: isLast ? "last" : "pending"
    }));
  };

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

function joinEntries(original: Answers, update: Answers): Answers {
  return Object.assign({}, original, update)
}
