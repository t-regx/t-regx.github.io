<?php

use TRegx\CleanRegex\Match\Details\Detail;
use TRegx\CleanRegex\Match\Details\NotMatched;
use TRegx\CleanRegex\Pattern;

$domain = $_GET['domain'];

// highlight-next-line
Pattern::inject('(?<scheme>https?)://(?<uri>@/[^ ]+)', [$domain])
    ->match($message)
    ->findFirst(function (Detail $detail) {
        $scheme = $detail->get('scheme');
        $uri = $detail->get('uri');
    })
    ->orElse(function (NotMatched $notMatched) {
        $message = $notMatched->subject();
        throw new Exception("Sorry! Not found in $message!");
    });
