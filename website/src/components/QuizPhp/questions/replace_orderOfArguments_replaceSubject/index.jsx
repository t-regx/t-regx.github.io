import React from "react";

import {Answer, Question} from "../../../Quiz";

import code from './code.php';
import replaceSubject from './answerReplaceSubject.php';
import subjectReplace from './answerSubjectReplace.php';

export default <Question
  selfExplanatory
  question="We need to censor the external link. Which is the correct signature?" markdown
  code={code} php>
  <Answer code={replaceSubject} markdown correct>
    `/pattern/`, `$replacement`, `$string`
  </Answer>
  <Answer code={subjectReplace} markdown>
    `/pattern/`, `$string`, `$replacement`
  </Answer>
</Question>;
