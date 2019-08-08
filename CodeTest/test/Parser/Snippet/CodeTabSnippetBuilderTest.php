<?php
namespace Test\CodeTest\Parser\Snippet;

use CodeTest\Parser\Mods\ReturnVariable;
use CodeTest\Parser\Snippet\CodeTabSnippetBuilder;
use CodeTest\Parser\Snippet\Snippet;
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

    public function created(Snippet $snippet): void
    {
        $this->assertTrue($snippet->isEmpty());
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
    public function shouldThrow_forInvalidConsumer()
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
            function snippet(Snippet $snippet, Assert $assert)
            {
                $assert->assertEquals(['Accept 1', 'Accept 2',], $snippet->get('T-Regx'));
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

    /**
     * @test
     */
    public function shouldThrow_forMidFeedingConsumerChange()
    {
        // given
        $builder = new CodeTabSnippetBuilder($this);
        $builder->setConsumer('T-Regx');
        $builder->controlMark('```php');

        // then
        $this->expectException(LogicException::class);

        // when
        $builder->setConsumer('PHP');
    }
}
