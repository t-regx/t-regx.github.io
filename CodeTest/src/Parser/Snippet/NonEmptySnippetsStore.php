<?php

namespace CodeTest\Parser\Snippet;

class NonEmptySnippetsStore implements SnippetListener
{
    /** @var array[] */
    private $snippets = [];

    public function created(Snippet $snippet): void
    {
        if ($snippet->isEmpty()) {
            return;
        }
        $this->snippets[] = $snippet->toDataProviderArray();
    }

    public function snippets(): array
    {
        return $this->snippets;
    }
}
