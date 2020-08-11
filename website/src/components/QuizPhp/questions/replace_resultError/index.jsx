import React from "react";

import {Answer, Question} from "../../../Quiz";

const help = "`preg_replace()` returns `null` on error.";

export default <Question
  markdown
  question="This code will issue a warning, because pattern is invalid. Afterwards, what will remain in `$result`?"
  code="$result = preg_replace('/invalid pattern{1,/', $subject, '');">
  <Answer markdown help={help} correct>`$result === false`</Answer>
  <Answer markdown help={help}>`$result === 0`</Answer>
  <Answer markdown help={help}>`$result === ''`</Answer>
  <Answer markdown help={help}>`$result === []`</Answer>
  <Answer markdown help={help}>`$result === null`</Answer>
</Question>;
