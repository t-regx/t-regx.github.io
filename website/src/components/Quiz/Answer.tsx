import React from "react";
import {QuizElement} from "./QuizElement";

export interface AnswerProps {
  correct?: boolean,
  markdown?: boolean,
  code?: string,
  help?: string | string[],
  markdownHelp?: boolean,
  hoverCode?: string
}

export interface AnswerInt extends QuizElement<AnswerProps> {
}

export class Answer extends React.Component<AnswerProps> implements AnswerInt {
  render() {
    return <></>;
  }
}
