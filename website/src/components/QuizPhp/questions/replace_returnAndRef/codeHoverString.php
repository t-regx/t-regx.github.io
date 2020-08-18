<?php
$string = 'Welcome to my website';

// highlight-next-line
$replaced  = preg_replace('/\s+/', '', $string, $count);

if ($count > 0) {
    echo "Replaced $count, result: $replaced";
}
