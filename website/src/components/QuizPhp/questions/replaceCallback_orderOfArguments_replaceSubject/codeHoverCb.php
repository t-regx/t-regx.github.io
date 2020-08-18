<?php
$string = 'Welcome to my website (http://facebook.com)! Welcome!';

// highlight-next-line
preg_replace_callback('#https://\w+.com#', function ($match) {}, $string);
