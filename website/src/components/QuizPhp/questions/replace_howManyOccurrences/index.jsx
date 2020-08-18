import React from "react";

import {Answer, Question} from "../../../Quiz";

import code from './code.php';
import hoverFirst from './codeHoverFirst.php';
import hoverAll from './codeHoverAll.php';

const help = "`preg_replace()` replaces all of the matched occurrences, unless `$limit` is used.";

export default <Question question="How many occurrences will be censored, if there are more than one link?" code={code}
                         php>
  <Answer help={help} hoverCode={hoverFirst}>Just the first</Answer>
  <Answer help={help} hoverCode={hoverAll} correct>All of them</Answer>
</Question>;
