<?php
namespace Test\CodeTest;

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

    public function created(array $snippet): void
    {
        $this->snippet($snippet, $this->assert);
    }

    abstract function snippet(array $snippet, Assert $assert);
}
