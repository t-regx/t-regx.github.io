<?php

use TRegx\CleanRegex\Match\Details\Detail;
use TRegx\CleanRegex\Pattern;

// instantiate pattern from string
$pattern = Pattern::of('https?://(\w+\.\w+)');

// match a pattern against a subject
$match = $pattern->match('This is my link€: https://google.com');

if (!$match->test()) {
    echo "Subject not matched";
}

foreach ($match as $detail) {
    // cast to string
    // highlight-next-line
    echo "I matched: $detail";

    // capturing group
    // highlight-next-line
    $domain = $detail->get(1);         // (string) "google.com"

    // offset in characters (UTF-8 safe)
    // highlight-next-line
    $detail->group(1)->offset();       // (int) 26

    // offset in raw bytes (bytes)
    // highlight-next-line
    $detail->group(1)->byteOffset();   // (int) 28
};
