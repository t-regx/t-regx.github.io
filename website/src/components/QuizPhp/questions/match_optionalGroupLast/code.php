<?php
// highlight-next-line
preg_match('/cost: ([$€])?(\d+)?/', 'cost: $', $match);
$match == ['cost: $', '$', /* here */];
