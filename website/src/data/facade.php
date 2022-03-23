<?php

use TRegx\CleanRegex\Pattern;

function getPattern(): Pattern {
    if ($condition) {
        // highlight-next-line
        return pattern('^[a-zA-Z][a-zA-Z0-9]{1,15}$'); // helper-style
    }
    // highlight-next-line
    return Pattern::of('^[a-zA-Z][a-zA-Z0-9]{1,15}$'); // facade-style
}

// instantiate pattern
// highlight-next-line
$pattern = getPattern();

// test a subject
$pattern->test($_GET['username']);
