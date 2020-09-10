import React from "react";
import {QuizElement} from "./QuizElement";
import {AnswerInt} from "./Answer";

export interface QuestionProps {
  markdown?: string,
  body?: (code: string) => React.ReactNode,
  question?: string,
  code?: string,
  php?: boolean,
  selfExplanatory?: boolean,
  children: AnswerInt[],
}

export interface QuestionInt extends QuizElement<QuestionProps> {
}

export class Question extends React.Component<QuestionProps> implements QuestionInt {
  render() {
    return <></>;
  }
}
