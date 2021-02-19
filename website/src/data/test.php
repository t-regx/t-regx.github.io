<?php

use TRegx\CleanRegex\Pattern;

$username = $_GET['username'];

// Use either helper function
// highlight-next-line
pattern('^[a-zA-Z][a-zA-Z0-9]{1,15}$')->test($username); // true

// or facade
// highlight-next-line
Pattern::of('^[a-zA-Z][a-zA-Z0-9]{1,15}$')->test($username); // true
