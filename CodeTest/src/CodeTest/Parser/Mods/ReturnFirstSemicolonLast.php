<?php
namespace CodeTest\Parser\Mods;

use CodeTest\Parser\Arrays;
use InvalidArgumentException;

class ReturnFirstSemicolonLast extends PureModification
{
    public function modify(array $snippet, $ignored): array
    {
        if (empty($snippet)) {
            throw new InvalidArgumentException("ReturnFirstSemicolonLast: Can't use mod with an empty snippet");
        }
        if (count($snippet) <= 1) {
            throw new InvalidArgumentException("ReturnFirstSemicolonLast: Can't use mod with a snippet with only one line");
        }
        $snippet[0] = 'return ' . $snippet[0];
        $snippet[Arrays::lastKey($snippet)] .= ';';
        return $snippet;
    }
}
