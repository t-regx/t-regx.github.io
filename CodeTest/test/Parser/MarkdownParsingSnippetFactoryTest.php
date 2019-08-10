<?php
namespace Test\CodeTest\Parser;

use CodeTest\Parser\MarkdownSnippetParser;
use CodeTest\Parser\Snippet\CodeTabSnippetBuilder;
use CodeTest\Parser\Snippet\NonEmptySnippetsStore;
use PHPUnit\Framework\TestCase;

class MarkdownParsingSnippetFactoryTest extends TestCase
{
    /**
     * @test
     */
    public function shouldGetOnlyOneSnippet()
    {
        // given
        $store = new NonEmptySnippetsStore();
        [$path, $file] = $this->fileAndPath('delimiters.md');
        $parser = new MarkdownSnippetParser($path, new CodeTabSnippetBuilder($store));

        // when
        $parser->parse($file);

        // then
        $snippet = $store->snippets()[0];

        $expected = [
            [
                "return [",
                'pattern(\'[A-Z][a-z]+\')->is()->delimitered(),',
                'pattern(\'#[A-Z][a-z]+#\')->is()->delimitered(),',
                '];',
            ],
            null,
            [
                'return [',
                'false,',
                'true,',
                '];',
            ],
            null
        ];
        $this->assertNull($snippet[1], "Failed asserting that supposedly missing `PHP` snippet is null");
        $this->assertEquals($expected, $snippet);
    }

    /**
     * @test
     */
    public function shouldParseClassNames()
    {
        // given
        $store = new NonEmptySnippetsStore();
        $parser = new MarkdownSnippetParser('', new CodeTabSnippetBuilder($store));

        // when
        $parser->parse('
<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--T-Regx:{expect-exception(\TRegx\CleanRegex\Exception\CleanRegex\InvalidReturnValueException)}-->');

        // then
        $snippet = $store->snippets()[0];
        $this->assertArrayHasKey(4, $snippet, 'Failed asserting that resulting snippet has an "exceptions" field');
        $this->assertEquals('\TRegx\CleanRegex\Exception\CleanRegex\InvalidReturnValueException', $snippet[4]['T-Regx']);
    }

    public function fileAndPath(string $filename): array
    {
        $path = getcwd() . "/../../docs/$filename";
        return [$path, file_get_contents($path)];
    }
}
