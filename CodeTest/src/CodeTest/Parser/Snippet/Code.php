<?php
namespace CodeTest\Parser\Snippet;

class Code
{
    public static function toArray(string $code): array
    {
        return explode("\n", $code);
    }

    public static function codeToArray(string $code): array
    {
        return explode("\n", self::parseCode($code));
    }

    private static function parseCode(string $code): string
    {
        return pattern('\\\\[\\\\n]')->replace($code)->all()->callback(fn(string $newLine) => $newLine === '\n' ? "\n" : "\\");
    }
}
