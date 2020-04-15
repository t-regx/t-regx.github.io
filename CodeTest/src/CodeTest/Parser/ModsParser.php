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
use LogicException;
use TRegx\SafeRegex\preg;

class ModsParser
{
    /** @var string */
    private $path;
    private $builder;
    /** @var Modification[] */
    private $mods;

    public function __construct(string $path, CodeTabSnippetBuilder $builder)
    {
        $this->path = $path;
        $this->builder = $builder;
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

    public function parse(string $content): void
    {
        try {
            $this->tryParse($content);
        } catch (LogicException $exception) {
            throw new SnippetParseException($exception);
        }
    }

    private function tryParse(string $content): void
    {
        foreach (preg_split("/\r?\n/", $content) as $line) {
            if (preg::match('/<!--(T-Regx|PHP|Result-(?:Value|Output)):\{([\w-]+)(?:\(([\w\\\\$-]+)\))?\}-->/', $line, $match)) {
                $forType = $match[1];
                $mod = $match[2];
                $arg = $match[3] ?? null;

                $this->builder->modify($forType, $this->modByName($mod), $arg);
                continue;
            }

            $this->validateMalformedSyntax($line);
            $this->builder->feedLine($line);
        }
    }

    private function modByName(string $mod): Modification
    {
        if (array_key_exists($mod, $this->mods)) {
            return $this->mods[$mod];
        }
        throw new Exception("Unknown mod '$mod' used in $this->path");
    }

    private function validateMalformedSyntax(string $line): void
    {
        if (preg::match('/<!--(T-Regx|PHP|Result-(?:Value|Output)):(.*)-->/', $line, $match)) {
            $forType = $match[1];
            $malformedSyntax = $match[2];
            throw new Exception("Modification for $forType has malformed syntax: $malformedSyntax");
        }
    }
}
