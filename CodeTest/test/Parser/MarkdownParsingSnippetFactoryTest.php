<?php
namespace CodeTest\Parser;

use CodeTest\Parser\Snippet\CodeTabSnippetBuilder;
use CodeTest\Parser\Snippet\SnippetsStore;
use PHPUnit\Framework\TestCase;

class MarkdownParsingSnippetFactoryTest extends TestCase
{
    /**
     * @test
     */
    public function shouldSnippetsFromFile()
    {
        // given
        $store = new SnippetsStore();
        $factory = new MarkdownSnippetParser($this->file('replace-by-group.md'), new CodeTabSnippetBuilder($store));

        // when
        $factory->loadFromFile();

        // then
        $expected = [
            [
                "\$links = 'Links: www.google.com, http://socket.io, facebook.com, https://t-regx.com';",
                '',
                "return pattern('(https?://)?(www\.)?(?<domain>[\w-]+)\.(com|io)')",
                '    ->replace($links)',
                '    ->all()',
                '    ->by()',
                "    ->group('domain')",
                '    ->orThrow();',
            ],
            [
                "\$links = 'Links: www.google.com, http://socket.io, facebook.com, https://t-regx.com';",
                '',
                "return preg::replace_callback('#(https?://)?(www\\.)?(?<domain>[\\w-]+)\\.(com|io)#', function (\$match) {",
                '    return $match[3];',
                '}, $links);'
            ],
            [],
            [
                '',
                'Links: google, socket, facebook, t-regx'
            ]
        ];
        $this->assertEquals([$expected], $store->snippets());
    }

    private function file(string $str): string
    {
        return getcwd() . "/../../docs/$str";
    }
}
