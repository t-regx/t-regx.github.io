<?php
$string = 'Welcome to my website (http://facebook.com)! Welcome!';
$maxLimit = 10;

// highlight-next-line
preg_replace('#https://\w+.com#', '***', $string, 10, $count);

echo "We censored $count links!";
