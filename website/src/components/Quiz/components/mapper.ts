import {Children, ReactElement} from "react";
import {QuestionInt, QuestionProps} from "../Question";
import {AnswerInt} from "../index";
import {QuizElement} from "../QuizElement";
import {AnswerProps} from "../Answer";

export function mapAnswers(children: AnswerInt[], callback: (AnswerProps, number) => ReactElement) {
  return map(children, (props: AnswerProps, index: number) => callback(props, index));
}

export function mapQuestions(children: QuestionInt[], callback: (QuestionProps, number) => ReactElement) {
  return map(children, (props: QuestionProps, index: number) => callback(props, index));
}

const map = <T, U>(children: QuizElement<T>[], callback: (T, number) => U) =>
  Children.map(children, (child, index) =>
    callback(child.props, index));
