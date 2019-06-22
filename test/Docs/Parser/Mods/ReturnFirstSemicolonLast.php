<?php
namespace Docs\Parser\Mods;

use Docs\Parser\Arrays;

class ReturnFirstSemicolonLast implements Modification
{
    public function modify(array $snippet, ?int $modLine): array
    {
        $snippet[0] = 'return ' . $snippet[0];
        $snippet[Arrays::lastKey($snippet)] .= ';';
        return $snippet;
    }
}
