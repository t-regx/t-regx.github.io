<?php
namespace CodeTest\Parser\Mods;

interface Modification
{
    public function modify(array $snippet, ?int $modLine): array;
}
