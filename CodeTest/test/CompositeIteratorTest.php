<?php
namespace CodeTest\Parser;

use ArrayIterator;
use CodeTest\CompositeIterator;
use EmptyIterator;
use PHPUnit\Framework\TestCase;

class CompositeIteratorTest extends TestCase
{
    /**
     * @test
     */
    function test(): void
    {
        // given
        $iterators = new ArrayIterator([
            new ArrayIterator([1, 2]),
            new EmptyIterator(),
            new ArrayIterator([3, 4, 5, 6]),
            new EmptyIterator(),
            new EmptyIterator(),
            new ArrayIterator([7]),
        ]);
        // when
        $result = iterator_to_array(new CompositeIterator($iterators));

        // then
        $this->assertEquals([1, 2, 3, 4, 5, 6, 7], $result);
    }

    /**
     * @test
     */
    function shouldNotBeValid(): void
    {
        // given
        $iterator = new CompositeIterator(new EmptyIterator());

        // when
        $result = $iterator->valid();

        // then
        $this->assertFalse($result);
    }
}
