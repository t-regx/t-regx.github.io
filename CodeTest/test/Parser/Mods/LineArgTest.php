<?php
namespace Test\CodeTest\Parser\Mods;

use CodeTest\Parser\Mods\LineArg;
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
            ['0', 1, 0],
            ['-3', 10, 7],
            ['-3', 3, 0],
            [-2, 10, 8],
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
            ['foo', 10],
            [5, 2],
            [2, 2],
            [-4, 2],
            [null, 2],
        ];
    }
}
