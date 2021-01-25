<?php
namespace CodeTest\Parser\Mods;

use CodeTest\Parser\Snippet\Snippet;

class ExpectExceptionMod implements Modification
{
    public function forSnippet(Snippet $snippet, string $type, ?string $argument): void
    {
        if ($argument === null) {
            throw new \InvalidArgumentException("ExpectExceptionMod: Exception class name is required");
        }
        $snippet->setExceptions($type, $argument);
    }
}
