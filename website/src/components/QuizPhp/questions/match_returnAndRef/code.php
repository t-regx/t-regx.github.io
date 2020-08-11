<?php
$string = 'Welcome to my website';

// highlight-next-line
/* here */ = preg_match('/\w+/', $string, /* insert here */);

if ($count > 0) {
    echo "Matched $count, first is: " . $matchResult[0];
}
