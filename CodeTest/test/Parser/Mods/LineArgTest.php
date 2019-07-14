<?php
namespace CodeTest\Parser\Mods;

use InvalidArgumentException;
use PHPUnit\Framework\TestCase;

class LineArgTest extends TestCase
{
    /**
     * @dataProvider inputAndOutput
     * @param $arg
     * @param int $collectionSize
     * @param int $expected
     */
    public function test($arg, int $collectionSize, int $expected)
    {
        // given
        $lineArg = new LineArg($arg);

        // when
        $result = $lineArg->lineAsInt($collectionSize);

        // then
        $this->assertEquals($expected, $result);
    }

    function inputAndOutput(): array
    {
        return [
            ['first', 10, 0],
            ['last', 10, 9],
            ['4', 10, 4],
            ['0', 1, 0]
        ];
    }

    /**
     * @test
     * @dataProvider invalidArguments
     * @param $arg
     * @param $collectionSize
     */
    public function shouldThrowForInvalidArgument($arg, $collectionSize)
    {
        // then
        $this->expectException(InvalidArgumentException::class);

        // when
        (new LineArg($arg))->lineAsInt($collectionSize);
    }

    function invalidArguments(): array
    {
        return [
            [-2, 10],
            ['foo', 10],
            [5, 2],
            [2, 2],
        ];
    }
}
