<?php

use TRegx\CleanRegex\Match\Details\Detail;
use TRegx\CleanRegex\Pattern;

// instantiate pattern from string
$pattern = Pattern::of('https?://(\w+\.\w+)');

// start replacements
$replace = $pattern->replace($stringWithLinks);

// replace first match by callback
$replace->first()->callback(function (Detail $match) {
    // cast to string
    // highlight-next-line
    echo "I matched: $match";

    // capturing group
    // highlight-next-line
    $domain = $match->get(1);

    // replace with
    return "new domain: $domain";
});
