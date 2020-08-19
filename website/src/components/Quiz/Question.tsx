import React from "react";
import {QuizElement} from "./QuizElement";
import {AnswerInt} from "./Answer";

export interface QuestionProps {
  markdown?: string,
  body?: React.ReactNode,
  question?: string,
  code?: string,
  php?: boolean,
  selfExplanatory?: boolean,
  children: AnswerInt[],
  hoverExample?: string
}

export interface QuestionInt extends QuizElement<QuestionProps> {
}

export class Question extends React.Component<QuestionProps> implements QuestionInt {
  render() {
    return <></>;
  }
}
