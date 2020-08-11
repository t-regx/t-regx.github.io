import React from "react";

import {Answer, Question} from "../../../Quiz";

import code from './code.php';
import one from "./answerOne.php";
import all from "./answerMany.php";

export default <Question question="How many occurrences will `preg_match()` retrieve?" markdown code={code} php>
  <Answer code={one} correct help="`preg_match()` returns only the first match.">
    Just the first
  </Answer>
  <Answer code={all} help="`preg_match()` returns only the first match. For all matches, use `preg_match_all()`.">
    All of them
  </Answer>
</Question>;
