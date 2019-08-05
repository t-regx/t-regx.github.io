<?php
namespace CodeTest\Parser\Snippet;

use CodeTest\Parser\Mods\Modification;
use InvalidArgumentException;
use LogicException;

class CodeTabSnippetBuilder
{
    /** @var SnippetListener */
    private $listener;
    /** @var string|null */
    private $consumer = null;
    /** @var array[] */
    private $snippet;
    /** @var bool */
    private $feeding = false;

    public function __construct(SnippetListener $listener)
    {
        $this->listener = $listener;
        $this->snippet = $this->emptySnippet();
    }

    public function setConsumer(string $consumer): void
    {
        $this->validateType($consumer);
        $this->consumer = $consumer;
        if ($this->feeding) {
            throw new LogicException();
        }
        if ($this->snippet[$consumer] !== null) {
            throw new LogicException();
        }
        $this->snippet[$consumer] = [];
    }

    public function controlMark(string $mark): void
    {
        if ($mark === '```') {
            $this->consumer = null;
        }
        $this->feeding = in_array($mark, ['```php', '```text']);
    }

    public function feedLine(string $line): void
    {
        if ($this->consumer !== null && $this->feeding) {
            $this->snippet[$this->consumer][] = $line;
        }
    }

    public function modify(string $type, Modification $modification, $argument): void
    {
        $this->validateType($type);
        if ($this->snippet[$type] === null) {
            throw new LogicException();
        }
        $this->snippet[$type] = $modification->modify($this->snippet[$type], $argument);
    }

    public function resetConsumer(): void
    {
        $this->consumer = null;
    }

    public function flush(): void
    {
        $this->listener->created(array_values($this->snippet));
        $this->snippet = $this->emptySnippet();
        $this->consumer = null;
        $this->feeding = false;
    }

    private function validateType(string $consumer): void
    {
        if (!$this->isConsumer($consumer)) {
            throw new InvalidArgumentException("Invalid consumer $consumer");
        }
    }

    private function isConsumer(string $consumer): bool
    {
        return array_key_exists($consumer, $this->emptySnippet());
    }

    private function emptySnippet(): array
    {
        return ['T-Regx' => null, 'PHP' => null, 'Result-Value' => null, 'Result-Output' => null];
    }

    public function isEmpty(): bool
    {
        return $this->snippet === $this->emptySnippet();
    }
}
