<?php

use TRegx\CleanRegex\Pattern;

$message = "Files: song.mp3, video.mp4, file, movie.mp4";

// highlight-next-line
$result = Pattern::of('\b\w+(\.(?<ext>\w{3}))?\b')
    ->replace($message)
    ->all()
    ->by()
    ->group('ext')
// highlight-next-line
    ->map([
        'mp3' => 'Audio',
        'mp4' => 'Video'
    ])
    ->orElseWith('Unknown');

echo $result; // "Files: Audio, Video, Unknown, Video"
