import React from "react";

import {Answer, Question} from "../../../Quiz";

import code from './code.php';
import hoverCount from './codeHoverCount.php';
import hoverLimit from './codeHoverLimit.php';
import answerLimitCount from './answerLimitCount.php';
import answerCountLimit from './answerCountLimit.php';

export default <Question
  selfExplanatory
  question="We need to censor the links (up to 10), and count the replacements. Which is the correct signature?"
  code={code} php>
  <Answer code={answerLimitCount} markdown hoverCode={hoverLimit} correct>
    `/pattern/`, `$repl`, `$str`, `$maxLimit`, `&$count`
  </Answer>
  <Answer code={answerCountLimit} markdown hoverCode={hoverCount}>
    `/pattern/`, `$repl`, `$str`, `&$count`, `$maxLimit`
  </Answer>
</Question>;
