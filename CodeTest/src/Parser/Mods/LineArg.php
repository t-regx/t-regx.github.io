<?php
namespace CodeTest\Parser\Mods;

use InvalidArgumentException;

class LineArg
{
    /** @var int|string */
    private $argument;

    public function __construct($modArgument)
    {
        if (!$this->isValidArgument($modArgument)) {
            throw new InvalidArgumentException();
        }
        $this->argument = $modArgument;
    }

    public function lineAsInt(int $collectionSize): int
    {
        if ($collectionSize <= 0) {
            throw new InvalidArgumentException();
        }
        if ($this->argument === 'first') {
            return 0;
        }
        if ($this->argument === 'last') {
            return $collectionSize - 1;
        }
        if (is_numeric($this->argument)) {
            if ($this->argument < $collectionSize) {
                return $this->argument;
            }
        }
        throw new InvalidArgumentException("Mod line \"first\", \"last\" or of type integer expected, '$this->argument' given");
    }

    public function isValidArgument($modArgument): bool
    {
        if (is_int($modArgument)) {
            return $modArgument >= 0;
        }
        return is_string($modArgument);
    }
}
