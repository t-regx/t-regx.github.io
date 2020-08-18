<?php
$string = 'Welcome to my website';

// highlight-next-line
$count     = preg_match('/\w+/', $string, $match);

if ($count > 0) {
    echo "Matched $count, first is: " . $match[0];
}
