<?php

use TRegx\CleanRegex\Match\Details\Detail;

pattern('https?://(\w+\.\w+)')->match($string)->first(function (Detail $match) {
    // cast to string
    // highlight-next-line
    echo "I matched: $match";

    // capturing group
    // highlight-next-line
    $domain = $match->get(1);

    // use offset (UTF-8 safe)
    // highlight-next-line
    mb_substr($match, 0, $match->group(1)->offset());

    // use offset (bytes)
    // highlight-next-line
    substr($match, 0, $match->group(1)->byteOffset());
});
