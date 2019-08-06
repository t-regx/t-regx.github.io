<?php
namespace CodeTest\Parser\Mods;

class IgnoreSnippetMod implements Modification
{
    public function modify(array $snippet, ?string $argument): array
    {
        return [];
    }
}
