<?php
namespace Docs\Parser\Mods;

interface Modification
{
    public function modify(array $snippet, ?int $modLine): array;
}
