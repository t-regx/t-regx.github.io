<?php
namespace Docs\Parser\Mods;

class ReturnAt implements Modification
{
    public function modify(array $snippet, ?int $modLine): array
    {
        $snippet[$modLine] = 'return  ' . $snippet[$modLine];
        return $snippet;
    }
}
