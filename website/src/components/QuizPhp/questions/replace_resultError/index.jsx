import React from "react";

import {Answer, Question} from "../../../Quiz";

const help = "`preg_replace()` returns `null` on error.";

export default <Question
  markdown
  question="This code will issue a warning, because the pattern is invalid. Afterwards, what will remain in `$result`?"
  code="$result = preg_replace('/invalid pattern{1,/', $subject, '');">
  <Answer markdown help={help} hoverCode={"preg_replace('/invalid pattern{1,/', $subject, '') === false;"} correct>
    `$result === false`</Answer>
  <Answer markdown help={help} hoverCode={"preg_replace('/invalid pattern{1,/', $subject, '') === 0;"}>
    `$result === 0`
  </Answer>
  <Answer markdown help={help} hoverCode={"preg_replace('/invalid pattern{1,/', $subject, '') === '';"}>
    `$result === ''`
  </Answer>
  <Answer markdown help={help} hoverCode={"preg_replace('/invalid pattern{1,/', $subject, '') === [];"}>
    `$result === []`
  </Answer>
  <Answer markdown help={help} hoverCode={"preg_replace('/invalid pattern{1,/', $subject, '') === null;"}>
    `$result === null`
  </Answer>
</Question>;
