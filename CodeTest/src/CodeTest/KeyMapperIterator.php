<?php
namespace CodeTest;

use Iterator;

class KeyMapperIterator implements Iterator
{
    private Iterator $iterator;
    /** @var callable */
    private $keyMapper;

    public function __construct(Iterator $iterator, callable $keyMapper)
    {
        $this->iterator = $iterator;
        $this->keyMapper = $keyMapper;
    }

    public function current()
    {
        return $this->iterator->current();
    }

    public function next(): void
    {
        $this->iterator->next();
    }

    public function key()
    {
        return call_user_func($this->keyMapper, $this->iterator->key());
    }

    public function valid(): bool
    {
        return $this->iterator->valid();
    }

    public function rewind(): void
    {
        $this->iterator->rewind();
    }
}
