import {Children} from "react";

export const mapAnswers = (children, callback) => map(children, "Answer", callback);
export const mapQuestions = (children, callback) => map(children, "Question", callback);

const map = (children, componentName, callback) =>
  Children.map(children, (child, index) =>
    callback(child.props, index));
