<?php

use TRegx\CleanRegex\Pattern;

// instantiate pattern from string
$pattern = Pattern::of('^[a-zA-Z][a-zA-Z0-9]{1,15}$');

// test subject against a pattern
// highlight-next-line
$pattern->test($_GET['username']);      // (bool) true
