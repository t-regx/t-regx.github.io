<?php
namespace CodeTest\Parser\Mods;

use CodeTest\Parser\Arrays;

class ReturnFirstSemicolonLast implements Modification
{
    public function modify(array $snippet, $ignored): array
    {
        $snippet[0] = 'return ' . $snippet[0];
        $snippet[Arrays::lastKey($snippet)] .= ';';
        return $snippet;
    }
}
