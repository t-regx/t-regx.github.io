<?php
namespace CodeTest\Parser\Snippet;

interface Element
{
    function populate(Snippet $snippet): void;
}
