<?php
namespace CodeTest;

use EmptyIterator;
use Iterator;

class CompositeIterator implements Iterator
{
    /** @var Iterator */
    private $iterator;
    /** @var Iterator|null */
    private $nestedIterator;
    /** @var int */
    private $key = 0;

    public function __construct(Iterator $iterator)
    {
        $this->iterator = $iterator;
        $this->nestedIterator = $this->firstIterator($iterator);
    }

    public function valid(): bool
    {
        return $this->nestedIterator->valid();
    }

    public function current()
    {
        return $this->nestedIterator->current();
    }

    public function key(): ?int
    {
        if ($this->nestedIterator->valid()) {
            return $this->key;
        }
        return null;
    }

    public function next(): void
    {
        $this->nestedIterator->next();
        $this->key++;
        if (!$this->nestedIterator->valid()) {
            $this->nestedIterator->rewind();
            $this->nestedIterator = $this->nextIterator();
        }
    }

    public function rewind(): void
    {
        $this->key = 0;
        $this->iterator->rewind();
        $this->nestedIterator = $this->firstIterator($this->iterator);
    }

    private function firstIterator(Iterator $iterator): Iterator
    {
        if ($iterator->valid()) {
            return $iterator->current();
        }
        return new EmptyIterator();
    }

    private function nextIterator(): Iterator
    {
        while (true) {
            $this->iterator->next();
            if ($this->iterator->valid()) {
                $nextIterator = $this->iterator->current();
                if ($nextIterator->valid()) {
                    return $nextIterator;
                }
            } else {
                return new EmptyIterator();
            }
        }
        return new EmptyIterator();
    }
}
