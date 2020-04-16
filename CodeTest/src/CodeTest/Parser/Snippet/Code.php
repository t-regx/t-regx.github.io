<?php
namespace CodeTest\Parser\Snippet;

use TRegx\CleanRegex\Match\Details\Match;

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
        return pattern('\\\\[\\\\n]')->replace($code)->all()->callback(function (Match $match) {
            if ($match->text() === '\n') {
                return "\n";
            }
            return "\\";
        });
    }
}
