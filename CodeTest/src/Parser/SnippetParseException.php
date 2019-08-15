<?php
namespace CodeTest\Parser;

use Exception;
use Throwable;

class SnippetParseException extends Exception
{
    public function __construct(Throwable $previous = null)
    {
        parent::__construct("", 0, $previous);
    }
}
