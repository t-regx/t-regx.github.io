<?php
namespace CodeTest\Parser\Snippet;

use InvalidArgumentException;
use LogicException;
use Throwable;

class Snippet
{
    private string $filename;
    private array $consumers;
    private array $snippet;
    private array $exceptions;

    public function __construct(string $filename, array $consumers)
    {
        if (empty($consumers)) {
            throw new InvalidArgumentException();
        }
        $this->filename = $filename;
        $this->consumers = $consumers;
        $this->snippet = $this->emptySnippet();
        $this->exceptions = $this->emptySnippet();
    }

    private function emptySnippet(): array
    {
        return array_combine($this->consumers, array_fill(0, count($this->consumers), null));
    }

    public function set(string $consumer, array $lines): void
    {
        $this->validateType($consumer);
        $this->snippet[$consumer] = $lines;
    }

    public function get(string $consumer): array
    {
        if (!$this->isConsumerSet($consumer)) {
            throw new LogicException("Tried to retrieve '$consumer', but it was not set");
        }
        return $this->snippet[$consumer];
    }

    public function exists(string $consumer): bool
    {
        return array_key_exists($consumer, $this->snippet);
    }

    public function isConsumerSet(string $consumer): bool
    {
        $this->validateType($consumer);
        return $this->snippet[$consumer] !== null;
    }

    private function validateType(string $consumer): void
    {
        if (!in_array($consumer, $this->consumers)) {
            throw new LogicException("Invalid consumer '$consumer'");
        }
    }

    public function setExceptions(string $consumer, string $className): void
    {
        $this->validateType($consumer);
        $this->validateExceptionType($className);
        $this->exceptions[$consumer] = $className;
    }

    public function toDataProviderArray(): array
    {
        if (array_filter($this->exceptions)) {
            return [...array_values($this->snippet), $this->exceptions, $this->filename];
        }
        return [...array_values($this->snippet), null, $this->filename];
    }

    private function validateExceptionType(string $className): void
    {
        if (!class_exists($className) || !$this->isThrowable($className)) {
            throw new InvalidArgumentException("Classname $className is not a class or is not throwable");
        }
    }

    private function isThrowable(string $className): bool
    {
        return in_array(Throwable::class, class_implements($className));
    }
}
