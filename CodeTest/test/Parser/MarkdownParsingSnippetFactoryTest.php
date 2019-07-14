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
        [$path, $file] = $this->fileAndPath('replace-by-group.md');
        $factory = new MarkdownSnippetParser($path, new CodeTabSnippetBuilder($store));

        // when
        $factory->parse($file);

        // then
        $expected = [
            [
                "\$links = 'Links: www.google.com, http://socket.io, facebook.com, https://t-regx.com';",
                '',
                "echo pattern('(https?://)?(www\.)?(?<domain>[\w-]+)\.(com|io)')",
                '    ->replace($links)',
                '    ->all()',
                '    ->by()',
                "    ->group('domain')",
                '    ->orThrow(MyCustomException::class);',
            ],
            [
                "\$links = 'Links: www.google.com, http://socket.io, facebook.com, https://t-regx.com';",
                '',
                "echo preg::replace_callback('#(https?://)?(www\\.)?(?<domain>[\\w-]+)\\.(com|io)#', function (\$match) {",
                "    if (!array_key_exists('domain', \$match)) {",
                '        // group is either un-matched or non-existent',
                "        if (validateGroupExists('domain', \$match)) {",
                '            throw new MyCustomException();',
                '        } else {',
                "            throw new NonexistentGroupException('domain');",
                '        }',
                '    }',
                "    if (\$match['domain'] === '') {",
                '        // group is either un-matched or matched an empty string',
                "        if (!validateGroupMatched('domain', \$match)) {",
                '            throw new MyCustomException();',
                '        }',
                '    }',
                "    return \$match['domain'];",
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

    public function fileAndPath(string $filename): array
    {
        $path = $this->file($filename);
        return [$path, file_get_contents($path)];
    }
}
