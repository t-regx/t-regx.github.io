<?php
$string = 'Welcome to my website';

// highlight-next-line
$match     = preg_match('/\w+/', $string, $count);

if ($count > 0) {
    echo "Matched $count, first is: " . $match[0];
}
