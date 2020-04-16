<?php
namespace CodeTest\Parser\Snippet;

class EmptyElement implements Element
{
    public function populate(Snippet $snippet): void
    {
    }
}
