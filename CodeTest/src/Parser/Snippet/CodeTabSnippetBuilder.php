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
    /** @var Snippet */
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
        if ($this->snippet->isConsumerSet($consumer)) {
            throw new LogicException();
        }
        $this->snippet->set($consumer, []);
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
            $this->snippet->append($this->consumer, $line);
        }
    }

    public function modify(string $type, Modification $modification, $argument): void
    {
        $modification->forSnippet($this->snippet, $type, $argument);
    }

    public function flush(): void
    {
        $this->listener->created($this->snippet);
        $this->snippet = $this->emptySnippet();
        $this->consumer = null;
        $this->feeding = false;
    }

    private function validateType(string $consumer): void
    {
        if (!$this->snippet->exists($consumer)) {
            throw new InvalidArgumentException("Invalid consumer $consumer");
        }
    }

    private function emptySnippet(): Snippet
    {
        return new Snippet(['T-Regx', 'PHP', 'Result-Value', 'Result-Output']);
    }

    public function isEmpty(): bool
    {
        return $this->snippet->isEmpty();
    }
}
