<?php
namespace CodeTest\Parser\Mods;

use InvalidArgumentException;
use TRegx\CleanRegex\Exception\CleanRegex\IntegerFormatException;

class LineArg
{
    /** @var int|string */
    private $argument;

    public function __construct(?string $modArgument)
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
        if (!is_numeric($this->argument)) {
            throw new IntegerFormatException();
        }
        if ($this->argument < 0) {
            if (abs($this->argument) <= $collectionSize) {
                return $collectionSize + $this->argument;
            }
        } else if ($this->argument < $collectionSize) {
            return $this->argument;
        }
        throw new InvalidArgumentException("Mod line \"first\", \"last\" or of type integer expected, '$this->argument' given (for collection $collectionSize)");
    }

    public function isValidArgument(?string $modArgument): bool
    {
        if (in_array($modArgument, ['first', 'last'])) {
            return true;
        }
        return is_numeric($modArgument);
    }
}
