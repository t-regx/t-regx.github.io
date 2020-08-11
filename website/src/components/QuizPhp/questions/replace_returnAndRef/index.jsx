import React from "react";

import {Answer, Question} from "../../../Quiz";

import code from './code.php';
import returnString from './answerReturnString.php';
import returnCount from './answerReturnCount.php';
import returnError from './answerReturnError.php';

const question = "With `preg_replace()`, is the result returned, or populated via `$ref`?";

const help = "`preg_replace()` returns the replaced string. Optionally, it populates `&$count` with the number of replacements done."
const helpError = "`preg_replace()` returns `null` on error, unlike `preg_match()` which returns `false`. It returns replaced `$string` on success.";

export default <Question question={question} markdown code={code} php>
  <Answer code={returnString} markdown help={help} correct>
    New string is returned (`&$count` is passed as ref)
  </Answer>
  <Answer code={returnCount} markdown help={help}>
    Amount is returned (new `&$string` is passed as ref)
  </Answer>
  <Answer code={returnError} markdown help={helpError}>
    Returns `true`/`false` on success/error (passes new `&$string` and `&$count` as ref)
  </Answer>
</Question>;
