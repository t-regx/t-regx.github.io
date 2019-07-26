<?php
namespace CodeTest;

use ArrayIterator;
use CodeTest\Parser\MarkdownSnippetParser;
use CodeTest\Parser\Snippet\CodeTabSnippetBuilder;
use CodeTest\Parser\Snippet\SnippetsStore;
use Iterator;

class CodeTabsDataProvider
{
    /** @var string */
    private $basePath;

    public function __construct(string $basePath)
    {
        $this->basePath = $basePath;
    }

    public function getSnippetsIterator(): Iterator
    {
        return new CompositeIterator(new LazyMapperIterator(new FilesIterator($this->basePath), function (string $filename) {
            $store = new SnippetsStore();
            (new MarkdownSnippetParser($filename, new CodeTabSnippetBuilder($store)))->parse(file_get_contents($filename));
            return new KeyMapperIterator(new ArrayIterator($store->snippets()), function (int $key) use ($filename) {
                return basename($filename) . " #$key";
            });
        }), false);
    }
}
