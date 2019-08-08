<?php
namespace CodeTest\Parser\Snippet;

interface SnippetListener
{
    public function created(Snippet $snippet): void;
}
