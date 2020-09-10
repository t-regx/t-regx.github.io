import React from "react";

import {Answer, Question} from "../../../Quiz";

import code from './code.php';
import codeRef from './codeRef.php';
import answerNull from "./answerNull.php";
import answerEmpty from "./answerEmpty.php";
import answerMissing from "./answerMissing.php";
import codeHoverNull from "./codeHoverNull.php";
import codeHoverEmpty from "./codeHoverEmpty.php";
import codeHoverMissing from "./codeHoverMissing.php";
import codeHoverNone from "./codeHoverNone.txt";
import {Markdown} from "../../../Utils/code";
import {PhpCode} from "../../../Quiz/components/cosmethics";

const helpMissing = [
  <>
    In `preg_match()`, an *unmatched group* is represented as an empty string.
  </>,
  <>
    Empty, trailing values are also **trimmed** by `preg_match()`, but only from the end.
    That is,`["Foo", "Bar", ""]` would be trimmed to `["Foo", "Bar"]`; but `["Foo", "", "Bar"]` would not.
  </>,
  <>
    The trailing happens, regardless of whether the value was really an empty string `""`, or it was *unmatched*,
    but represented as an empty string in the results
    (*unmatched* group is **indistinguishable** from a *matched* empty string).
  </>,
];

const helpEmpty = <>
  In `preg_match()`, *unmatched groups* are represented as *matched* empty strings (*unmatched* groups are
  **indistinguishable** from *matched* empty strings).
</>;

export const helpNull = [
  <>In `preg_match()`, an *unmatched group* is represented as an empty string.</>,
  <>
    It is possible to represent unmatched groups as `null`, but only with `preg_match_all()`, and
    only if `PREG_UNMATCHED_AS_NULL` is used. There is no similar functionality for `preg_match()` or
    `preg_replace()`.
  </>,
];

export function optionalGroupBody(question, hoverCode) {
  return <>
    <p><Markdown>Given, an example result of `preg_match()`:</Markdown></p>
    <PhpCode>{codeRef}</PhpCode>
    <p><Markdown>{question}</Markdown></p>
    <PhpCode>{[code, hoverCode]}</PhpCode>
  </>
}

export default <Question php body={hoverCode => optionalGroupBody(
  "How is an *optional*, unmatched group `#1` represented in `preg_match()`, when currency is missing?",
  hoverCode || codeHoverNone)}>
  <Answer code={answerMissing} hoverCode={codeHoverMissing} help={helpMissing}>
    Isn't present in the result
  </Answer>
  <Answer code={answerEmpty} hoverCode={codeHoverEmpty} help={helpEmpty} correct>
    As an empty string
  </Answer>
  <Answer code={answerNull} hoverCode={codeHoverNull} help={helpNull} markdown>
    As `null`
  </Answer>
</Question>;
