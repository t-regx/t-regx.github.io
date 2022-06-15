<?php
namespace Docs;

use TRegx\CleanRegex\Pattern;

class Integer
{
    public static function parse(string $string): int
    {
        return Pattern::of('^.+$')->match($string)->first()->toInt();
    }
}
