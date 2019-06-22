<?php
namespace Docs\Parser;

class Arrays
{
    public static function lastKey(array $array)
    {
        return array_keys($array)[count($array) - 1];
    }
}
