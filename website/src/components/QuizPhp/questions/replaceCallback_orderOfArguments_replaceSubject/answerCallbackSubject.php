<?php
preg_replace_callback('#https://\w+.com#', function ($match) {
    return strtoupper($match[0]);
}, $string);
