<?php
namespace Test\CodeTest\Parser\Snippet;

use CodeTest\Parser\Mods\ReturnVariable;
use CodeTest\Parser\Snippet\CodeTabSnippetBuilder;
use CodeTest\Parser\Snippet\SnippetListener;
use InvalidArgumentException;
use LogicException;
use PHPUnit\Framework\Assert;
use PHPUnit\Framework\TestCase;
use Test\CodeTest\AssertionSnippetListenerAdapter;

class CodeTabSnippetBuilderTest extends TestCase implements SnippetListener
{
    /**
     * @test
     */
    public function shouldFeedListenerWithNull()
    {
        // given
        $builder = new CodeTabSnippetBuilder($this);

        // when
        $builder->flush();
    }

    public function created(array $snippet): void
    {
        $this->assertNull($snippet[0]);
        $this->assertNull($snippet[1]);
        $this->assertNull($snippet[2]);
        $this->assertNull($snippet[3]);
    }

    /**
     * @test
     */
    public function shouldNotModifyUnsetSnippet()
    {
        // given
        $builder = new CodeTabSnippetBuilder($this);

        // then
        $this->expectException(LogicException::class);

        // when
        $builder->modify('T-Regx', new ReturnVariable(), 0);
    }

    /**
     * @test
     */
    public function shouldNotSetSnippetTwice()
    {
        // given
        $builder = new CodeTabSnippetBuilder($this);

        // then
        $this->expectException(LogicException::class);

        // when
        $builder->setConsumer('T-Regx');
        $builder->setConsumer('T-Regx');
    }

    /**
     * @test
     */
    public function shouldThrowForInvalidConsumer()
    {
        // given
        $builder = new CodeTabSnippetBuilder($this);

        // then
        $this->expectException(InvalidArgumentException::class);

        // when
        $builder->setConsumer('Foo');
    }

    /**
     * @test
     */
    public function shouldBuildBetweenControlMarks()
    {
        // given
        $builder = new CodeTabSnippetBuilder(new class ($this) extends AssertionSnippetListenerAdapter
        {
            function snippet(array $snippet, Assert $assert)
            {
                $assert->assertEquals(['Accept 1', 'Accept 2',], $snippet[0]);
            }
        });

        // when
        $builder->setConsumer('T-Regx');
        $builder->feedLine('Fail 1');
        $builder->controlMark('```php');
        $builder->feedLine('Accept 1');
        $builder->feedLine('Accept 2');
        $builder->controlMark('```');
        $builder->feedLine('Fail 2');

        $builder->flush();
    }
}
