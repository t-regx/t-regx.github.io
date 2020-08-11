import React from "react";

import {Answer, Question} from "../../../Quiz";

import code from './code.php';
import matches from '../matchAll_structure/answerMatches.php';
import byMatches from '../matchAll_structure/answerByMatches.php';
import byGroup from '../matchAll_structure/answerByGroup.php';

import {helpMatches, helpByGroups, helpByMatches} from "../matchAll_structure";

export default <Question question="What's the value of `$result`, with flag `PREG_PATTERN_ORDER`?" markdown
                         code={code} php>
  <Answer code={matches} help={helpMatches}>Returns whole matches</Answer>
  <Answer code={byMatches} help={helpByMatches}>Returns nested arrays, each grouped by matches</Answer>
  <Answer code={byGroup} help={helpByGroups} correct>Returns nested arrays, each grouped by a capturing group</Answer>
</Question>;
