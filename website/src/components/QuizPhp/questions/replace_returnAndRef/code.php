<?php
$string = 'Welcome to my website';

// highlight-next-line
/* here */ = preg_replace('/\s+/', '', $string, /* insert code here */);

if ($count > 0) {
    echo "Replaced $count, result: $replaceResult";
}
