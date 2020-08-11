import React from "react";

import {Answer, Question} from "../../../Quiz";

import code from './code.php';
import returnArray from './answerReturnArray.txt';
import returnCount from './answerReturnCount.txt';
import returnError from './answerReturnError.php';

const question = "With `preg_match()`, is the result returned, or populated via `$ref`?";

export default <Question question={question} markdown code={code} php>
  <Answer markdown code={returnArray}
          help="`preg_match()` result is populated into `&$match` ref-argument; the `$count` is returned.">
    Found matches are returned (`&$count` is passed as ref)
  </Answer>
  <Answer markdown code={returnCount} correct
          help="`preg_match()` returns the number of matched occurrences (`0`, if none found; `1` if one found).">
    Amount is returned (found `&$matches` are passed as ref)
  </Answer>
  <Answer markdown code={returnError}
          help="`preg_match()` does return `false` on error, but `0`/`1` on unmatched/matched subject.">
    Returns `true`/`false` on success/error (found `&$matches` and `&$count` are passed as ref)
  </Answer>
</Question>;
