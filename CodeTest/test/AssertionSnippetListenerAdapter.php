<?php
namespace Test\CodeTest;

use CodeTest\Parser\Snippet\Snippet;
use CodeTest\Parser\Snippet\SnippetListener;
use PHPUnit\Framework\Assert;

abstract class AssertionSnippetListenerAdapter implements SnippetListener
{
    /** @var Assert */
    private $assert;

    public function __construct(Assert $assert)
    {
        $this->assert = $assert;
    }

    public function created(Snippet $snippet): void
    {
        $this->snippet($snippet, $this->assert);
    }

    abstract function snippet(Snippet $snippet, Assert $assert);
}
