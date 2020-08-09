<?php
namespace CodeTest\Parser\Mods;

use InvalidArgumentException;

class MockVariable extends PureModification
{
    private bool $isPattern;

    public function __construct(bool $isPattern)
    {
        $this->isPattern = $isPattern;
    }

    public function modify(array $snippet, ?string $argument): array
    {
        $this->validateArgument($argument);
        array_unshift($snippet, $this->mockLine($argument));
        return $snippet;
    }

    private function validateArgument(string $argument): void
    {
        if (preg_match('/^\$(?!\d)\w+$/', $argument) === 0) {
            throw new InvalidArgumentException("MockVariable: Invalid argument '$argument' for mod 'mock'");
        }
    }

    private function mockLine(string $argument): string
    {
        return "$argument = " . var_export($this->mockedValue(), true) . ';';
    }

    private function mockedValue(): string
    {
        if ($this->isPattern) {
            return '\d+';
        }
        return 'FooBar 123456789';
    }
}
