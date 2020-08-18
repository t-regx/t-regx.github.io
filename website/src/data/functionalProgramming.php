<?php

$message = "Extensions: .mp3, .mp4, .jpg, jpeg, png, gif";

// highlight-next-line
pattern('\b\.?(?<ext>\w{3,4})\b')->replace($message)
    ->all()
    ->by()
    ->group('ext')
// highlight-next-line
    ->mapIfExists([
        'mp3' => 'Audio',
        'gif' => 'Animation'
    ]);
