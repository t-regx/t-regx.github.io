<?php
namespace CodeTest\Parser\Snippet;

interface SnippetListener
{
    public function created(array $snippet): void;
}
