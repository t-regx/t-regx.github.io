<?php
namespace Test\CodeTest\Parser;

use CodeTest\Parser\MarkdownSnippetParserMdx;
use CodeTest\Parser\Snippet\CodeTabSnippetBuilder;
use CodeTest\Parser\Snippet\NonEmptySnippetsStore;
use PHPUnit\Framework\TestCase;
use TRegx\CleanRegex\Exception\InvalidReturnValueException;

class MarkdownSnippetParserMdxTest extends TestCase
{
    /**
     * @test
     */
    public function shouldGetOnlyOneSnippet()
    {
        // given
        $store = new NonEmptySnippetsStore();
        [$path, $file] = $this->fileAndPath('code_tabs.v2.mdx');
        $parser = new MarkdownSnippetParserMdx($path, new CodeTabSnippetBuilder($store));

        // when
        $parser->parse($file);

        // then
        $snippet = $store->snippets()[0];

        $this->assertCount(1, $store->snippets(), "Failed asserting that parser returned a single snippet");
        $expected = [
            [
                "pattern('[0-9]+')->match(\"I'm 19. I was born in 1999, on May 12\")->all();"
            ],
            [
                'preg::match_all(\'/[0-9]+/\', "I\'m 19. I was born in 1999, on May 12", $matches);',
                'return $matches[0];'
            ],
            [
                "['19', '1999', '12']",
            ],
            null
        ];
        $this->assertEquals($expected, $snippet);
    }

    /**
     * @test
     */
    public function shouldParseClassNames()
    {
        // given
        $store = new NonEmptySnippetsStore();
        $parser = new MarkdownSnippetParserMdx('', new CodeTabSnippetBuilder($store));

        // when
        $parser->parse('
<Tabs>
<TabItem value="T-Regx">
```php
```
<!--T-Regx:{expect-exception(\TRegx\CleanRegex\Exception\InvalidReturnValueException)}-->');

        // then
        $snippet = $store->snippets()[0];
        $this->assertArrayHasKey(4, $snippet, 'Failed asserting that resulting snippet has an "exceptions" field');
        $this->assertEquals(InvalidReturnValueException::class, $snippet[4]['T-Regx']);
    }

    public function fileAndPath(string $filename): array
    {
        $path = getcwd() . "/CodeTest/resources/$filename";
        return [$path, file_get_contents($path)];
    }
}
