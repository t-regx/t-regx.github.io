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

    /**
     * @test
     */
    function shouldNotReindexKeys(): void
    {
        // given
        $iterator = new CompositeIterator(new ArrayIterator([
            new ArrayIterator(['a' => 1, 'b' => 2]),
            new EmptyIterator(),
            new ArrayIterator(['c' => 3, 'd' => 4, 'e' => 5, 'f' => 6]),
            new EmptyIterator(),
            new EmptyIterator(),
            new ArrayIterator(['g' => 7]),
        ]), false);

        // when
        $result1 = iterator_to_array($iterator);

        // then
        $expected = [
            'a' => 1,
            'b' => 2,
            'c' => 3,
            'd' => 4,
            'e' => 5,
            'f' => 6,
            'g' => 7
        ];
        $this->assertEquals($expected, $result1);
    }
}
