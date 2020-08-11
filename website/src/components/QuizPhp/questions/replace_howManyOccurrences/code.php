<?php
$subject = 'http://facebook.com and https://google.com';

// highlight-next-line
preg_replace('#https?://\w+.com#', '***', $subject);
