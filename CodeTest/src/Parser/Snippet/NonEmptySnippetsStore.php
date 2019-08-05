<?php

namespace CodeTest\Parser\Snippet;

class NonEmptySnippetsStore implements SnippetListener
{
    /** @var array[] */
    private $snippets = [];

    public function created(array $snippet): void
    {
        if (empty(array_filter($snippet))) {
            return;
        }
        $this->snippets[] = $snippet;
    }

    public function snippets(): array
    {
        return $this->snippets;
    }
}
