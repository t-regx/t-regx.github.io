<?php
namespace CodeTest;

use Iterator;

class LazyMapperIterator implements Iterator
{
    /** @var Iterator */
    private $source;
    /** @var callable */
    private $mapper;

    public function __construct(Iterator $source, callable $mapper)
    {
        $this->source = $source;
        $this->mapper = $mapper;
    }

    public function current()
    {
        return call_user_func($this->mapper, $this->source->current());
    }

    public function next(): void
    {
        $this->source->next();
    }

    public function key()
    {
        return $this->source->key();
    }

    public function valid(): bool
    {
        return $this->source->valid();
    }

    public function rewind(): void
    {
        $this->source->rewind();
    }
}
