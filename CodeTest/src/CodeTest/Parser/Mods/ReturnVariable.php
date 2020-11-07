<?php
namespace CodeTest\Parser\Mods;

use InvalidArgumentException;

class ReturnVariable extends PureModification
{
    public function modify(array $snippet, ?string $argument): array
    {
        $this->validateArgument($argument);
        $snippet[] = "return $argument;";
        return $snippet;
    }

    private function validateArgument(string $argument): void
    {
        if (pattern('^\$(?!\d)\w+$')->fails($argument)) {
            throw new InvalidArgumentException("ReturnVariable: Invalid argument '$argument' for mod 'mock'");
        }
    }
}
