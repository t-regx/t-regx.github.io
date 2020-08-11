import React from "react";

import {Answer, Question} from "../../../Quiz";

import answerLimitCount from './answerLimitCount.php';
import answerCountLimit from './answerCountLimit.php';
import code from './code.php';

export default <Question
  selfExplanatory
  question="We need to censor the links (up to 10), and count the replacements. Which is the correct signature?"
  code={code} php>
  <Answer code={answerLimitCount} markdown correct>
    `/pattern/`, `$repl`, `$str`, `$maxLimit`, `&$count`
  </Answer>
  <Answer code={answerCountLimit} markdown>
    `/pattern/`, `$repl`, `$str`, `&$count`, `$maxLimit`
  </Answer>
</Question>;
