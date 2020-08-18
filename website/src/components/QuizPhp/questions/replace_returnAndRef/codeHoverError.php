<?php
$string = 'Welcome to my website';

// highlight-next-line
$success   = preg_replace('/\s+/', '', $string, $replaced, $count);

if ($count > 0) {
    echo "Replaced $count, result: $replaced";
}
