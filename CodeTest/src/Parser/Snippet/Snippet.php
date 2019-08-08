<?php
namespace CodeTest\Parser\Snippet;

use InvalidArgumentException;
use LogicException;
use Throwable;

class Snippet
{
    /** @var array */
    private $consumers;

    /** @var array */
    private $snippet;

    /** @var array */
    private $exception;

    public function __construct(array $consumers)
    {
        if (empty($consumers)) {
            throw new InvalidArgumentException();
        }
        $this->consumers = $consumers;
        $this->snippet = $this->emptySnippet();
        $this->exception = $this->emptySnippet();
    }

    private function emptySnippet(): array
    {
        return array_combine($this->consumers, array_fill(0, count($this->consumers), null));
    }

    public function append(string $consumer, string $line): void
    {
        $this->validateType($consumer);
        $this->snippet[$consumer][] = $line;
    }

    public function set(string $consumer, array $lines): void
    {
        $this->validateType($consumer);
        $this->snippet[$consumer] = $lines;
    }

    public function get(string $consumer): array
    {
        if (!$this->isConsumerSet($consumer)) {
            throw new LogicException();
        }
        return $this->snippet[$consumer];
    }

    public function isEmpty(): bool
    {
        return $this->snippet == $this->emptySnippet();
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
            throw new LogicException();
        }
    }

    public function setException(string $consumer, string $className): void
    {
        $this->validateType($consumer);
        $this->validateExceptionType($className);
        $this->exception[$consumer] = $className;
    }

    public function toDataProviderArray(): array
    {
        if (array_filter($this->exception)) {
            return array_values($this->snippet + [$this->exception]);
        }
        return array_values($this->snippet);
    }

    private function validateExceptionType(string $className): void
    {
        if (!class_exists($className) || !$this->isThrowable($className)) {
            throw new InvalidArgumentException();
        }
    }

    private function isThrowable(string $className): bool
    {
        return in_array(Throwable::class, class_implements($className));
    }
}
