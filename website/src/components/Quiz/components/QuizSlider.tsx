import React, {useState} from "react";

import {Markdown} from "../../Utils/code";

import Slide from "./Slide";
import Slider from "./Slider";
import {Code, PhpCode} from "./cosmethics";
import {mapQuestions} from "./mapper";
import {QuestionInt} from "../index";
import {QuestionProps} from "../Question";

interface Props {
  questions: QuestionInt[],
  slide: number,
  onSlideChange: (question: number, correct: boolean, isLast: boolean) => void,
  firstSlide: React.ElementType,
  lastSlide: React.ElementType,
}

export default ({questions, slide, onSlideChange, firstSlide, lastSlide}: Props) =>
  <Slider value={slide}>
    <div>{firstSlide}</div>

    {mapQuestions(questions, (props: QuestionProps, index: number) => {
      const {body, question, code, markdown, php, selfExplanatory, children, hoverExample} = props;
      let [hoverCode, setHoverCode] = useState(code);

      const text = question && (markdown ? <Markdown>{question}</Markdown> : question);
      const snippet = code && (php ? <PhpCode>{hoverCode || code}</PhpCode> : <Code>{hoverCode || code}</Code>);

      return <div key={index}>
        <Slide
          index={index}
          body={body || <><p>{text}</p>{snippet}</>}
          children={children}
          selfExplanatory={selfExplanatory}
          onHover={code => setHoverCode(code)}
          onClick={answer => onSlideChange(index, answer, questions.length - 1 === index)}/>
      </div>;
    })}

    <div>{lastSlide}</div>
  </Slider>;
