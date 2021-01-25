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
        $snippet = new Snippet('', ['Foo', 'Bar', 'Lorem']);

        // when
        $result = $snippet->toDataProviderArray();

        // then
        $this->assertEquals([null, null, null, null, ''], $result);
    }

    /**
     * @test
     */
    public function shouldThrowForNoConsumers()
    {
        // then
        $this->expectException(InvalidArgumentException::class);

        // when
        new Snippet('', []);
    }

    /**
     * @test
     */
    public function shouldReset()
    {
        // given
        $snippet = new Snippet('', ['Foo', 'Bar']);

        // when
        $snippet->set('Foo', ['first']);
        $snippet->set('Bar', ['second']);
        $snippet->set('Foo', ['third']);
        $snippet->set('Bar', ['fourth']);

        // then
        $this->assertEquals([['third'], ['fourth'], null, ''], $snippet->toDataProviderArray());
    }

    /**
     * @test
     */
    public function shouldReset_throw_forInvalidConsumer()
    {
        // given
        $snippet = new Snippet('', ['Foo']);

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
        $snippet = new Snippet('', ['Foo']);
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
        $snippet = new Snippet('', ['Foo']);

        // then
        $this->expectException(LogicException::class);

        // when
        $snippet->get('Bar');
    }

    /**
     * @test
     */
    public function shouldGet_throw_forNotSetConsumer()
    {
        // given
        $snippet = new Snippet('', ['Foo']);

        // then
        $this->expectException(LogicException::class);

        // when
        $snippet->get('Foo');
    }

    /**
     * @test
     */
    public function shouldHaveConsumer()
    {
        // given
        $snippet = new Snippet('', ['Foo']);

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
        $snippet = new Snippet('', ['Foo']);

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
        $snippet = new Snippet('', ['not set', 'set']);
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
        $snippet = new Snippet('', ['Foo']);

        // then
        $this->expectException(LogicException::class);

        // when
        $snippet->isConsumerSet('Bar');
    }

    /**
     * @test
     */
    public function shouldReturnFilename()
    {
        // given
        $snippet = new Snippet('filename.js', ['Foo']);

        // when
        $dataProvider = $snippet->toDataProviderArray();

        // then
        $this->assertSame([null, null, 'filename.js'], $dataProvider);
    }
}
