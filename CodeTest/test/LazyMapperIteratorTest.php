<?php
namespace CodeTest;

use ArrayIterator;
use PHPUnit\Framework\TestCase;

class LazyMapperIteratorTest extends TestCase
{
    /**
     * @test
     */
    public function test()
    {
        // given
        $iterator = new LazyMapperIterator(new ArrayIterator(['Foo', 'Bar', 'Lorem', 'Ipsum']), 'strtoupper');

        // when
        $result = iterator_to_array($iterator);

        // then
        $this->assertEquals(['FOO', 'BAR', 'LOREM', 'IPSUM'], $result);
    }

    /**
     * @test
     */
    public function shouldBeLazy()
    {
        // given
        $buffer = [];

        $iterator = new LazyMapperIterator(new ArrayIterator([1, 2, 3]), function (int $input) use (&$buffer) {
            $buffer[] = $input;
        });

        // when
        $buffer[] = 'A';
        $iterator->current();
        $iterator->next();
        $buffer[] = 'B';
        $iterator->current();
        $iterator->next();
        $buffer[] = 'C';
        $iterator->current();
        $iterator->next();

        // then
        $this->assertEquals(['A', 1, 'B', 2, 'C', 3], $buffer);
    }
}
