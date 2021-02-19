<?php

use TRegx\CleanRegex\Match\Details\Detail;
use TRegx\CleanRegex\Pattern;

$link = $_GET['link'];

// highlight-next-line
Pattern::inject('(?<scheme>https?)://(?<domain>@/[^ ]+)', [$link])
  ->match($message)
  ->first(function (Detail $detail) {
      // scheme
      $scheme = $detail->get('scheme');

      // domain
      $domain = $detail->get('domain');
  });
