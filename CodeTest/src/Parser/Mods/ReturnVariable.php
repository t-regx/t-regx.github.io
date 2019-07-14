<?php
namespace CodeTest\Parser\Mods;

use InvalidArgumentException;

class ReturnVariable implements Modification
{
    public function modify(array $snippet, ?string $argument): array
    {
        $this->validateArgument($argument);
        $snippet[] = "return $argument;";
        return $snippet;
    }

    private function validateArgument(string $argument): void
    {
        if (preg_match('/^\$(?!\d)\w+$/', $argument) === 0) {
            throw new InvalidArgumentException("Invalid argument '$argument' for mod 'mock'");
        }
    }
}
