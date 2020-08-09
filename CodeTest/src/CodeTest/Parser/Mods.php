<?php
namespace CodeTest\Parser;

use CodeTest\Parser\Mods\ExpectExceptionMod;
use CodeTest\Parser\Mods\IgnoreSnippetMod;
use CodeTest\Parser\Mods\InsertKeywordAt;
use CodeTest\Parser\Mods\MockVariable;
use CodeTest\Parser\Mods\Modification;
use CodeTest\Parser\Mods\MultipleReturnValues;
use CodeTest\Parser\Mods\ReturnFirstSemicolonLast;
use CodeTest\Parser\Mods\ReturnVariable;
use Exception;

class Mods
{
    private string $path;
    /** @var Modification[] */
    private $mods;

    public function __construct(string $path)
    {
        $this->path = $path;
        $this->mods = [
            'ignore-snippet'   => new IgnoreSnippetMod(),
            'return'           => new ReturnVariable(),
            'return-at'        => new InsertKeywordAt('return'),
            'echo-at'          => new InsertKeywordAt('echo'),
            'return-semi'      => new ReturnFirstSemicolonLast(),
            'multiline-return' => new MultipleReturnValues(),
            'mock'             => new MockVariable(false),
            'mockPattern'      => new MockVariable(true),
            'expect-exception' => new ExpectExceptionMod(),
        ];
    }

    public function mod(string $mod): Modification
    {
        if (array_key_exists($mod, $this->mods)) {
            return $this->mods[$mod];
        }
        throw new Exception("Unknown mod '$mod' used in $this->path");
    }
}
