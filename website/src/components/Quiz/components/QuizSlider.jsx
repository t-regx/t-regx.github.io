import React from "react";

import {Markdown} from "../../Utils/code";

import Slide from "./Slide";
import Slider from "./Slider";
import {Code, PhpCode} from "./cosmethics";
import {mapQuestions} from "./mapper";

export default ({questions, slide, onSlideChange, firstSlide, lastSlide}) =>
  <Slider value={slide}>
    <div>{firstSlide}</div>

    {mapQuestions(questions, ({body, question, code, markdown, php, selfExplanatory, children}, index) => {
      const text = question && (markdown ? <Markdown>{question}</Markdown> : question);
      const snippet = code && (php ? <PhpCode>{code}</PhpCode> : <Code>{code}</Code>);

      return <div key={index}>
        <Slide
          index={index}
          body={body || <><p>{text}</p>{snippet}</>}
          children={children}
          selfExplanatory={selfExplanatory}
          onClick={answer => onSlideChange(index, answer, questions.length - 1 === index)}/>
      </div>;
    })}

    <div>{lastSlide}</div>
  </Slider>;
