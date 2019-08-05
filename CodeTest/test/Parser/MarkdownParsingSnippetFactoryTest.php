<?php
namespace Test\CodeTest\Parser;

use CodeTest\Parser\MarkdownSnippetParser;
use CodeTest\Parser\Snippet\CodeTabSnippetBuilder;
use CodeTest\Parser\Snippet\SnippetsStore;
use PHPUnit\Framework\TestCase;

class MarkdownParsingSnippetFactoryTest extends TestCase
{
    /**
     * @test
     */
    public function shouldGetOnlyOneSnippet()
    {
        // given
        $store = new SnippetsStore();
        [$path, $file] = $this->fileAndPath('delimiters.md');
        $factory = new MarkdownSnippetParser($path, new CodeTabSnippetBuilder($store));

        // when
        $factory->parse($file);

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

    private function file(string $str): string
    {
        return getcwd() . "/../../docs/$str";
    }

    public function fileAndPath(string $filename): array
    {
        $path = $this->file($filename);
        return [$path, file_get_contents($path)];
    }
}
