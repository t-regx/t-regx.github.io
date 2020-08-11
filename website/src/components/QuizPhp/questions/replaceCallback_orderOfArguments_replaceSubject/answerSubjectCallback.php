<?php
preg_replace_callback('#https://\w+.com#', $string, function ($match) {
    return strtoupper($match[0]);
});
