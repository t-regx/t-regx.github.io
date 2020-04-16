<?php
namespace Docs;

use AssertionError;

class Integer
{
    public static function parse(string $string): int
    {
        if (\TRegx\CleanRegex\Internal\Integer::isValid($string)) {
            return $string;
        }
        throw new AssertionError();
    }
}
