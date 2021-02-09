<?php

use TRegx\CleanRegex\Match\Details\Detail;

$pattern = 'https?://(\w+\.\w+)';

pattern($pattern)->replace($str)->first()->callback(function (Detail $match) {
    // cast to string
    // highlight-next-line
    echo "I matched: $match";

    // capturing group
    // highlight-next-line
    $domain = $match->get(1);

    // replace with
    return "new domain: $domain";
});
