import React from "react";

import {Answer, Question} from "../../../Quiz";
import Markdown from "../../../Markdown/Markdown";

const help = <Markdown>
  There isn't a function to check if `$subject` matches the pattern.
  We can only perform a full match, and use the number of matched occurrences (`0` or more than `0`) to check
  if the subject was matched.
</Markdown>;

export default <Question question="Which function is used to check whether `$string` matches the pattern?" markdown>
  <Answer markdown help="There is no such function as `preg_find()`.">
    `preg_find($pattern, $string);`
  </Answer>
  <Answer markdown correct help={help} markdownHelp={false}>
    `preg_match($pattern, $string);`
  </Answer>
  <Answer markdown help="There is no such function as `preg_test()`.">
    `preg_test($pattern, $string);`
  </Answer>
</Question>;
