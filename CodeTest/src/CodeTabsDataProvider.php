<?php
namespace CodeTest;

use ArrayIterator;
use CodeTest\Parser\MarkdownSnippetParser;
use CodeTest\Parser\Snippet\CodeTabSnippetBuilder;
use CodeTest\Parser\Snippet\NonEmptySnippetsStore;
use Iterator;

class CodeTabsDataProvider
{
    /** @var string */
    private $basePath;

    public function __construct(string $basePath)
    {
        $this->basePath = $basePath;
    }

    public function getSnippets(): array
    {
        return iterator_to_array($this->getSnippetsIterator());
    }

    public function getSnippetsIterator(): Iterator
    {
        return new CompositeIterator(new LazyMapperIterator(new FilesIterator($this->basePath), function (string $filename) {
            $store = new NonEmptySnippetsStore();
            (new MarkdownSnippetParser($filename, new CodeTabSnippetBuilder($store)))->parse(file_get_contents($filename));
            return new KeyMapperIterator(new ArrayIterator($store->snippets()), function (int $key) use ($filename) {
                return basename($filename) . " #$key";
            });
        }), false);
    }
}
