<?php
namespace Test\CodeTest\Parser\Snippet;

use ArrayIterator;
use CodeTest\Parser\Snippet\Snippet;
use Exception;
use LogicException;
use PHPUnit\Framework\TestCase;

class SnippetExceptionTest extends TestCase
{
    /**
     * @test
     */
    public function shouldReturnEmptySnippet()
    {
        // given
        $snippet = new Snippet(['Foo', 'Bar']);

        // when
        $snippet->setException('Foo', Exception::class);

        // then
        $this->assertEquals([null, null, ['Foo' => Exception::class, 'Bar' => null]], $snippet->toDataProviderArray());
    }

    /**
     * @test
     */
    public function shouldThrowForNoConsumers()
    {
        // when
        $snippet = new Snippet(['Foo']);

        // then
        $this->expectException(LogicException::class);

        // when
        $snippet->setException('Bar', Exception::class);
    }

    /**
     * @test
     */
    public function shouldThrow_forInvalidArgument()
    {
        // when
        $snippet = new Snippet(['Foo']);

        // then
        $this->expectException(LogicException::class);

        // when
        $snippet->setException('Foo', 'asd');
    }

    /**
     * @test
     */
    public function shouldThrow_forNotThrowableClass()
    {
        // when
        $snippet = new Snippet(['Foo']);

        // then
        $this->expectException(LogicException::class);

        // when
        $snippet->setException('Foo', ArrayIterator::class);
    }
}
