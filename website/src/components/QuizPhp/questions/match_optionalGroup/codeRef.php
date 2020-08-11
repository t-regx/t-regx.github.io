<?php
// highlight-next-line
preg_match('/cost: ([$€])(\d+)?/', 'cost: $500', $match);
$match == ['cost: $500', '$', '500'];
