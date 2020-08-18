<?php
$string = 'Welcome to my website';

// highlight-next-line
$count     = preg_replace('/\s+/', '', $string, $replaced);

if ($count > 0) {
    echo "Replaced $count, result: $replaced";
}
