<?php
$string = 'Joffrey, Cersei, IlynPayne, the Hound.';

// highlight-next-line
if (preg_match('/\w+/', $string, $result)) {
    $result === ['Joffrey'];
}
