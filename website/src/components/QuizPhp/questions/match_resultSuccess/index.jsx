import React from "react";

import {Answer, Question} from "../../../Quiz";

const help = "`preg_match()` returns the number of matched occurrences, or `false` on error.";

export default <Question question="What's the value of `$result`?" markdown
                         code="$result = preg_match('/Foo (Bar)?/', $string);">
  <Answer markdown help={help}>
    `true` if matched, and `false` if not
  </Answer>
  <Answer markdown help={help} correct>
    `1` if matched, and `0` if not
  </Answer>
  <Answer markdown help="`preg_match()` doesn't return `true`. Only `0`/`1` on success, and `false` on error.">
    `true`, because pattern is correct. To read the result, we need to pass `&$match`
  </Answer>
</Question>;
