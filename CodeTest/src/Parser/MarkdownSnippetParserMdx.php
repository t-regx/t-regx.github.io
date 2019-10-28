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
use CodeTest\Parser\Snippet\CodeTabSnippetBuilder;
use Exception;
use LogicException;
use TRegx\SafeRegex\preg;

class MarkdownSnippetParserMdx
{
    /** @var string */
    private $path;
    /** @var CodeTabSnippetBuilder */
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
        foreach (preg_split("/[\n\r]{1,2}/", $content) as $line) {
            if (preg::match('/^\s*<Tabs/', $line)) {
                if (!$this->builder->isEmpty()) {
                    $this->builder->flush();
                }
                continue;
            }
            if (in_array($line, ['```', '```php', '```text'])) {
                $this->builder->controlMark($line);
                continue;
            }
            if (preg::match('/<TabItem\s+value=([\'"])([\w-]+)\1>|<!--(Result-(?:Value|Output))-->/', $line, $match)) {
                $this->builder->setConsumer($match[3] ?? $match[2]);
                continue;
            }
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

        $this->builder->flush();
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
