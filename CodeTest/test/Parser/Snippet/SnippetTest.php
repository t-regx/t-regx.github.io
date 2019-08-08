<?php
namespace Test\CodeTest\Parser\Snippet;

use CodeTest\Parser\Snippet\Snippet;
use InvalidArgumentException;
use LogicException;
use PHPUnit\Framework\TestCase;

class SnippetTest extends TestCase
{
    /**
     * @test
     */
    public function shouldReturnEmptySnippet()
    {
        // given
        $snippet = new Snippet(['Foo', 'Bar', 'Lorem']);

        // when
        $result = $snippet->toDataProviderArray();

        // then
        $this->assertEquals([null, null, null], $result);
    }

    /**
     * @test
     */
    public function shouldThrowForNoConsumers()
    {
        // then
        $this->expectException(InvalidArgumentException::class);

        // when
        new Snippet([]);
    }

    /**
     * @test
     */
    public function shouldAppend()
    {
        // given
        $snippet = new Snippet(['Foo', 'Bar']);

        // when
        $snippet->append('Foo', 'first');
        $snippet->append('Bar', 'second');
        $snippet->append('Foo', 'third');
        $snippet->append('Bar', 'fourth');

        // then
        $this->assertEquals([['first', 'third'], ['second', 'fourth']], $snippet->toDataProviderArray());
    }

    /**
     * @test
     */
    public function shouldAppend_throw_forInvalidConsumer()
    {
        // given
        $snippet = new Snippet(['Foo']);

        // then
        $this->expectException(LogicException::class);

        // when
        $snippet->append('Bar', '');
    }

    /**
     * @test
     */
    public function shouldReset()
    {
        // given
        $snippet = new Snippet(['Foo', 'Bar']);

        // when
        $snippet->set('Foo', ['first']);
        $snippet->set('Bar', ['second']);
        $snippet->set('Foo', ['third']);
        $snippet->set('Bar', ['fourth']);

        // then
        $this->assertEquals([['third'], ['fourth']], $snippet->toDataProviderArray());
    }

    /**
     * @test
     */
    public function shouldReset_throw_forInvalidConsumer()
    {
        // given
        $snippet = new Snippet(['Foo']);

        // then
        $this->expectException(LogicException::class);

        // when
        $snippet->set('Bar', []);
    }

    /**
     * @test
     */
    public function shouldGet()
    {
        // given
        $snippet = new Snippet(['Foo']);
        $snippet->set('Foo', ['one', 'two']);

        // when
        $result = $snippet->get('Foo');

        // then
        $this->assertEquals(['one', 'two'], $result);
    }

    /**
     * @test
     */
    public function shouldGet_throw_forInvalidConsumer()
    {
        // given
        $snippet = new Snippet(['Foo']);

        // then
        $this->expectException(LogicException::class);

        // when
        $snippet->get('Bar');
    }

    /**
     * @test
     */
    public function shouldGetThrow_forNotSetConsumer()
    {
        // given
        $snippet = new Snippet(['Foo']);

        // then
        $this->expectException(LogicException::class);

        // when
        $snippet->get('Foo');
    }

    /**
     * @test
     */
    public function shouldBeEmpty()
    {
        // given
        $snippet = new Snippet(['Foo']);

        // when
        $isEmpty = $snippet->isEmpty();

        // then
        $this->assertTrue($isEmpty);
    }

    /**
     * @test
     */
    public function shouldNotBeEmpty()
    {
        // given
        $snippet = new Snippet(['Foo']);
        $snippet->append('Foo', 'not empty');

        // when
        $isEmpty = $snippet->isEmpty();

        // then
        $this->assertFalse($isEmpty);
    }

    /**
     * @test
     */
    public function shouldHaveConsumer()
    {
        // given
        $snippet = new Snippet(['Foo']);

        // when
        $has = $snippet->exists('Foo');

        // then
        $this->assertTrue($has);
    }

    /**
     * @test
     */
    public function shouldNotHaveConsumer()
    {
        // given
        $snippet = new Snippet(['Foo']);

        // when
        $has = $snippet->exists('Bar');

        // then
        $this->assertFalse($has);
    }

    /**
     * @test
     */
    public function testIsConsumerEmpty()
    {
        // given
        $snippet = new Snippet(['not set', 'set']);
        $snippet->set('set', []);

        // when
        $firstSet = $snippet->isConsumerSet('not set');
        $secondSet = $snippet->isConsumerSet('set');

        // then
        $this->assertFalse($firstSet);
        $this->assertTrue($secondSet);
    }

    /**
     * @test
     */
    public function shouldIsConsumerEmpty_throw_forInvalidConsumer()
    {
        // given
        $snippet = new Snippet(['Foo']);

        // then
        $this->expectException(LogicException::class);

        // when
        $snippet->isConsumerSet('Bar');
    }
}
