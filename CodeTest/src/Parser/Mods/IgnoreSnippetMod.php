<?php
namespace CodeTest\Parser\Mods;

class IgnoreSnippetMod extends PureModification
{
    public function modify(array $snippet, ?string $argument): array
    {
        return [];
    }
}
