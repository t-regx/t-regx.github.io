import React from "react";

import {Answer, Question} from "../../../Quiz";

import code from './code.php';
import matches from './answerMatches.php';
import byMatches from './answerByMatches.php';
import byGroup from './answerByGroup.php';

export const helpMatches = "Result of `preg_match()`/`preg_match_all()`/`preg_replace()` is always an array (containing " +
  "the match and its capturing groups), not just strings. It's an array for `preg_match()`/`preg_replace()` and an array of arrays for `preg_match_all()`.";

export const helpByMatches = "`preg_match_all()` groups results by matches, if flag `PREG_SET_ORDER` is used.";
export const helpByGroups = "`preg_match_all()` groups results by capturing groups, if flag `PREG_PATTERN_ORDER` is used, which is the default.";

export default <Question question="What's the value of `$match`?" markdown code={code} php>
  <Answer code={matches} help={helpMatches}>
    Returns whole matches
  </Answer>
  <Answer code={byMatches} help={helpByMatches}>
    Returns nested arrays, each grouped by matches
  </Answer>
  <Answer code={byGroup} help={helpByGroups} correct>
    Returns nested arrays, each grouped by a capturing group
  </Answer>
</Question>;
