<?php
namespace Test\CodeTest\Parser;

use CodeTest\Parser\MarkdownSnippetParser;
use CodeTest\Parser\MdxParser;
use CodeTest\Parser\Mods;
use CodeTest\Parser\Snippet\CodeElement;
use CodeTest\Parser\Snippet\ModElement;
use CodeTest\Parser\Snippet\ResultElement;
use PHPUnit\Framework\TestCase;
use TRegx\CleanRegex\Exception\InvalidReturnValueException;

class MarkdownSnippetParserTest extends TestCase
{
    /**
     * @test
     */
    public function shouldParseEmptyTags()
    {
        $this->assertCodeIsParsedAll('<CodeTabs/> <Tabs/> <CodeTabs />', [
            [new CodeElement(null, null)],
            [new CodeElement(null, null)]
        ]);
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
            new CodeElement(
                "pattern('[0-9]+')->match(\"I'm 19. I was born in 1999, on May 12\")->all();",
                'preg::match_all(\'/[0-9]+/\', "I\'m 19. I was born in 1999, on May 12", $matches);' . PHP_EOL .
                'return $matches[0];'
            )
        ]);
    }

    /**
     * @test
     */
    public function shouldParseCode_noJsxSyntax()
    {
        // when
        $code = '<CodeTabs
      tregx="return pattern(\'[aeiouy]\')->count(\'Computer\');"
      php="return preg::match_all(\'/[aeiouy]/\', \'Computer\');"/>
<Result>3</Result>';

        // when
        $this->assertCodeIsParsed($code, [
            new CodeElement(
                "return pattern('[aeiouy]')->count('Computer');",
                "return preg::match_all('/[aeiouy]/', 'Computer');"
            ),
            new ResultElement('3', null)
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
            new CodeElement('yes', 'no'),
            new ResultElement('code', null)
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
        $this->assertCodeIsParsed($code, [new CodeElement(null, null)]);
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
        $this->assertCodeIsParsed($code, [
            new CodeElement(null, null),
            new ResultElement('some words', 'foo')
        ]);
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
            new CodeElement(null, null),
            new ModElement(new Mods(''), 'expect-exception', 'T-Regx', InvalidReturnValueException::class),
        ]);
    }

    /**
     * @test
     */
    public function shouldParseMultipleMods()
    {
        // given
        $code = '<CodeTabs tregx="one" php="first"/>
<!--T-Regx:{mock($value)}-->
<!--PHP:{function($value)}-->
<Result php>foo</Result>
<CodeTabs tregx="two" php="second"/>
<!--Result-Value:{cos($a)}-->
<!--Result-Output:{sin($b)}-->
<Result>bar</Result>
';

        // when + then
        $this->assertCodeIsParsedAll($code, [
            [
                new CodeElement("one", "first"),
                new ModElement(new Mods(''), 'mock', 'T-Regx', '$value'),
                new ModElement(new Mods(''), 'function', 'PHP', '$value'),
                new ResultElement("foo", "php"),
            ],
            [
                new CodeElement("two", "second"),
                new ModElement(new Mods(''), 'cos', 'Result-Value', '$a'),
                new ModElement(new Mods(''), 'sin', 'Result-Output', '$b'),
                new ResultElement("bar", null),
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
        $snippets = (new MarkdownSnippetParser(new MdxParser(new Mods(''))))->parse($code);

        // then
        $this->assertCount(count($expected), $snippets, "Failed to assert that code was parsed into a snippet");
        $this->assertEquals($expected, $snippets);
    }
}
