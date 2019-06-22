<?php
namespace CodeTest\Parser;

use PHPUnit\Framework\TestCase;

class MarkdownParsingSnippetFactoryTest extends TestCase
{
    /**
     * @test
     */
    public function shouldSnippetsFromFile()
    {
        // given
        $factory = new MarkdownParsingSnippetFactory();
        $filename = $this->file('replace-by-group.md');

        // when
        $snippets = $factory->snippetsFromFile($filename);

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
                "return \$links = 'Links: www.google.com, http://socket.io, facebook.com, https://t-regx.com';",
                ''
            ],
            [],
            [
                '',
                'Links: google, socket, facebook, t-regx'
            ]
        ];
        $this->assertEquals([$expected], $snippets);
    }

    private function file(string $str): string
    {
        return getcwd() . "/../../../docs/$str";
    }
}
