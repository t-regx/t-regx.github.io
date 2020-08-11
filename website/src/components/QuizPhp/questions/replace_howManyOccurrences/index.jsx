import React from "react";

import {Answer, Question} from "../../../Quiz";

import code from './code.php';

const help = "`preg_replace()` replaces all of the matched occurrences, unless `$limit` is used.";

export default <Question question="How many occurrences will be censored, if there are more than one link?" code={code}
                         php>
  <Answer help={help}>Just the first</Answer>
  <Answer help={help} correct>All of them</Answer>
</Question>;
