<?php
namespace Test\CodeTest;

use ArrayIterator;
use CodeTest\KeyMapperIterator;
use PHPUnit\Framework\TestCase;

class KeyMapperIteratorTest extends TestCase
{
    /**
     * @test
     */
    public function shouldMapKeys()
    {
        // given
        $iterator = new KeyMapperIterator(new ArrayIterator([1, 2, 3]), function (int $key) {
            return "key: $key";
        });

        // when
        $result = iterator_to_array($iterator);

        // then
        $expected = [
            'key: 0' => 1,
            'key: 1' => 2,
            'key: 2' => 3,
        ];
        $this->assertEquals($expected, $result);
    }
}
