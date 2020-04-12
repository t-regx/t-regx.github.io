<?php
namespace Test\CodeTest\Parser;

use CodeTest\Parser\MarkdownSnippetParser;
use PHPUnit\Framework\TestCase;
use TRegx\CleanRegex\Exception\InvalidReturnValueException;

class MarkdownSnippetParserTest extends TestCase
{
    /**
     * @test
     */
    public function shouldParseEmptyTags()
    {
        $this->assertCodeIsParsedAll('<CodeTabs/> <Tabs/> <CodeTabs />', [[], []]);
    }

    /**
     * @test
     */
    public function shouldParseCode()
    {
        // when
        $code = '<CodeTabs
    tregx={`pattern(\'[0-9]+\')->match("I\'m 19. I was born in 1999, on May 12")->all();`}
    php={`preg::match_all(\'/[0-9]+/\', "I\'m 19. I was born in 1999, on May 12", $matches);
return $matches[0];`}/>';

        // when
        $this->assertCodeIsParsed($code, [
            'tregx' => "pattern('[0-9]+')->match(\"I'm 19. I was born in 1999, on May 12\")->all();",
            'php'   => 'preg::match_all(\'/[0-9]+/\', "I\'m 19. I was born in 1999, on May 12", $matches);' . PHP_EOL .
                'return $matches[0];'
        ]);
    }

    /**
     * @test
     */
    public function shouldParseResult()
    {
        // given
        $code = '<CodeTabs tregx={`yes`} php={`no`}/>
<Result>code</Result>';

        // when + then
        $this->assertCodeIsParsed($code, [
            'tregx'  => 'yes',
            'php'    => 'no',
            'result' => ['value' => 'code', 'type' => null]
        ]);
    }

    /**
     * @test
     */
    public function shouldNotParseResultMalformed()
    {
        // given
        $code = '<CodeTabs/>
<Resulttext>code</Result>';

        // when + then
        $this->assertCodeIsParsed($code, []);
    }

    /**
     * @test
     */
    public function shouldParseOutput()
    {
        // when
        $code = '<CodeTabs/>
<Result foo>some words</Result>';

        // when + then
        $this->assertCodeIsParsed($code, ['result' => ['value' => 'some words', 'type' => 'foo']]);
    }

    /**
     * @test
     */
    public function shouldParseExpectedException_className()
    {
        // given
        $code = '<CodeTabs/>
<!--T-Regx:{expect-exception(TRegx\CleanRegex\Exception\InvalidReturnValueException)}-->';

        // when + then
        $this->assertCodeIsParsed($code, [
            'mod' => [
                'name' => 'expect-exception',
                'for'  => 'T-Regx',
                'arg'  => InvalidReturnValueException::class
            ]
        ]);
    }

    private function assertCodeIsParsed(string $code, array $snippet): void
    {
        $this->assertCodeIsParsedAll($code, [$snippet]);
    }

    private function assertCodeIsParsedAll(string $code, array $expected): void
    {
        // when
        $snippets = (new MarkdownSnippetParser())->parse($code);

        // then
        $this->assertCount(count($expected), $snippets);
        $this->assertEquals($expected, $snippets);
    }
}
