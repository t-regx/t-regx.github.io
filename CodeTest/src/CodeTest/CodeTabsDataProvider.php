<?php

namespace CodeTest;

use ArrayIterator;
use CodeTest\Parser\MarkdownSnippetParser;
use CodeTest\Parser\MdxFacade;
use CodeTest\Parser\MdxParser;
use CodeTest\Parser\Mods;
use Iterator;

class CodeTabsDataProvider
{
    private string $basePath;

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
            $parsed = (new MdxFacade(new MarkdownSnippetParser(new MdxParser(new Mods($this->basePath)))))->parse($filename, file_get_contents($filename));
            return new KeyMapperIterator(new ArrayIterator($parsed), fn(int $key) => basename($filename) . " #$key");
        }), false);
    }
}
