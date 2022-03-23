<?php

use TRegx\CleanRegex\Match\Details\Detail;
use TRegx\CleanRegex\Pattern;

// instantiate pattern from a prepared pattern and a user supplied value
$link = $_GET['link'];
$pattern = Pattern::inject('(?<scheme>https?)://(?<domain>@/[^ ]+)', [$link]);
//                                                        ↑

// match a pattern against a subject
$match = $pattern->match($message);

// call Detail for the first match
// highlight-next-line
$match->first(function (Detail $detail) {
  // scheme
  $scheme = $detail->get('scheme');

  // domain
  $domain = $detail->get('domain');
});
