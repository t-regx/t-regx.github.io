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
    /** @var bool */
    private $reindex;

    public function __construct(Iterator $iterator, bool $reindexKeys = true)
    {
        $this->iterator = $iterator;
        $this->nestedIterator = $this->firstIterator($iterator);
        $this->reindex = $reindexKeys;
    }

    public function valid(): bool
    {
        return $this->nestedIterator->valid();
    }

    public function current()
    {
        return $this->nestedIterator->current();
    }

    /**
     * @return int|string|null
     */
    public function key()
    {
        if ($this->nestedIterator->valid()) {
            if ($this->reindex) {
                return $this->key;
            }
            return $this->nestedIterator->key();
        }
        return null;
    }

    public function next(): void
    {
        $this->nestedIterator->next();
        $this->key++;
        $this->nextIteratorIfInvalid();
    }

    public function rewind(): void
    {
        $this->iterator->rewind();
        $this->key = 0;
        $this->nestedIterator = $this->firstIterator($this->iterator);
        $this->nextIteratorIfInvalid();
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

    private function nextIteratorIfInvalid(): void
    {
        if (!$this->nestedIterator->valid()) {
            $this->nestedIterator->rewind();
            $this->nestedIterator = $this->nextIterator();
        }
    }
}
