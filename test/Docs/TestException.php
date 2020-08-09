<?php
namespace Docs;

use Throwable;

class TestException extends \Exception
{
    private ?string $snippet;

    public function __construct(Throwable $cause, ?string $snippet)
    {
        parent::__construct($snippet,0,  $cause);
        $this->snippet = $snippet;
    }
}
