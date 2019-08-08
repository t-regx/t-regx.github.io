<?php
namespace CodeTest\Parser\Mods;

use CodeTest\Parser\Snippet\Snippet;

interface Modification
{
    public function forSnippet(Snippet $snippet, string $type, ?string $argument): void;
}
