<?php
namespace CodeTest;

use ArrayIterator;
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
        $compositeIterator = new CompositeIterator(new ArrayIterator([
            new ArrayIterator([1, 2]),
            new EmptyIterator(),
            new ArrayIterator([3, 4, 5, 6]),
            new EmptyIterator(),
            new EmptyIterator(),
            new ArrayIterator([7]),
        ]));

        // when
        $result = iterator_to_array($compositeIterator);

        // then
        $this->assertEquals([1, 2, 3, 4, 5, 6, 7], $result);
    }

    /**
     * @test
     */
    function shouldRewind(): void
    {
        // given
        $iterator = new CompositeIterator(new ArrayIterator([
            new ArrayIterator([1, 2]),
            new EmptyIterator(),
            new ArrayIterator([3, 4, 5, 6]),
            new EmptyIterator(),
            new EmptyIterator(),
            new ArrayIterator([7]),
        ]));

        // when
        $result1 = iterator_to_array($iterator);
        $result2 = iterator_to_array($iterator);

        // then
        $this->assertEquals([1, 2, 3, 4, 5, 6, 7], $result1);
        $this->assertEquals([1, 2, 3, 4, 5, 6, 7], $result2);
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
