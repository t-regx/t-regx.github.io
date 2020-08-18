import React from "react";

import {Answer, Question} from "../../../Quiz";

import code from './code.php';
import hoverFirst from './codeHoverFirst.php';
import hoverAll from './codeHoverAll.php';
import one from "./answerOne.php";
import all from "./answerMany.php";

const helpFirst = "`preg_match()` returns only the first match.";
const helpAll = "`preg_match()` returns only the first match. For all matches, use `preg_match_all()`.";

export default <Question question="How many occurrences will `preg_match()` retrieve?" markdown code={code} php>
  <Answer code={one} help={helpFirst} hoverCode={hoverFirst} correct>
    Just the first
  </Answer>
  <Answer code={all} help={helpAll} hoverCode={hoverAll}>
    All of them
  </Answer>
</Question>;
