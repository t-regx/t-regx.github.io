<?php

use TRegx\CleanRegex\Match\Details\Detail;
use TRegx\CleanRegex\Pattern;

// instantiate pattern from string
$pattern = Pattern::of('https?://(\w+\.\w+)');

// match a pattern against a subject
$match = $pattern->match('This is my link€: https://google.com');

// call Detail for the first match
$match->first(function (Detail $match) {
    // cast to string
    // highlight-next-line
    echo "I matched: $match";

    // capturing group
    // highlight-next-line
    $domain = $match->get(1);         // (string) "google.com"

    // offset in characters (UTF-8 safe)
    // highlight-next-line
    $match->group(1)->offset();       // (int) 26

    // offset in raw bytes (bytes)
    // highlight-next-line
    $match->group(1)->byteOffset();   // (int) 28
});
