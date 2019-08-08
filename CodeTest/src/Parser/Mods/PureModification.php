<?php
namespace CodeTest\Parser\Mods;

use CodeTest\Parser\Snippet\Snippet;

abstract class PureModification implements Modification
{
    public function forSnippet(Snippet $snippet, string $type, ?string $argument): void
    {
        $snippet->set($type, $this->modify($snippet->get($type), $argument));
    }

    public abstract function modify(array $snippet, ?string $argument): array;
}
