<?php

namespace CodeTest\Parser\Snippet;

class SnippetsStore implements SnippetListener
{
    /** @var array[] */
    private $snippets = [];

    public function created(array $snippet): void
    {
        $this->snippets[] = $snippet;
    }

    public function snippets(): array
    {
        return $this->snippets;
    }
}
