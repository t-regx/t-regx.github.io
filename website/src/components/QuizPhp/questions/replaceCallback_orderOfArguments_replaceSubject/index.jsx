import React from "react";

import {Answer, Question} from "../../../Quiz";

import code from './code.php';
import callbackSubject from './answerCallbackSubject.php';
import subjectCallback from './answerSubjectCallback.php';

const question = "We need to make the link UPPERCASE. Which is the correct signature?";

export default <Question question={question} code={code} php selfExplanatory>
  <Answer code={callbackSubject} markdown correct>
    `/pattern/`, `callback()`, `$string`
  </Answer>
  <Answer code={subjectCallback} markdown>
    `/pattern/`, `$string`, `callback()`
  </Answer>
</Question>;
