import React from "react";

import {Answer, Question} from "../../../Quiz";

import code from './code.php';
import answer1 from '../matchAll_structure/answerMatches.php';
import answer2 from '../matchAll_structure/answerByMatches.php';
import answer3 from '../matchAll_structure/answerByGroup.php';

import {helpMatches, helpByGroups, helpByMatches} from "../matchAll_structure";

export default <Question question="What's the value of `$result`, with flag `PREG_SET_ORDER`?" markdown
                         code={code} php>
  <Answer code={answer1} help={helpMatches}>Returns whole matches</Answer>
  <Answer code={answer2} help={helpByMatches} correct>Returns nested arrays, each grouped by matches</Answer>
  <Answer code={answer3} help={helpByGroups}>Returns nested arrays, each grouped by a capturing group</Answer>
</Question>;
