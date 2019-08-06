<?php
namespace CodeTest\Parser;

use CodeTest\Parser\Mods\IgnoreSnippetMod;
use CodeTest\Parser\Mods\InsertKeywordAt;
use CodeTest\Parser\Mods\MockVariable;
use CodeTest\Parser\Mods\Modification;
use CodeTest\Parser\Mods\MultipleReturnValues;
use CodeTest\Parser\Mods\ReturnFirstSemicolonLast;
use CodeTest\Parser\Mods\ReturnVariable;
use CodeTest\Parser\Snippet\CodeTabSnippetBuilder;
use Exception;
use TRegx\SafeRegex\preg;

class MarkdownSnippetParser
{
    const START_TOKEN = '<!--DOCUSAURUS_CODE_TABS-->';
    const END_TOKEN = '<!--END_DOCUSAURUS_CODE_TABS-->';

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
        ];
    }

    public function parse(string $content): void
    {
        foreach (preg_split("/[\n\r]{1,2}/", $content) as $line) {
            if ($line == self::START_TOKEN) {
                if (!$this->builder->isEmpty()) {
                    $this->builder->flush();
                }
                continue;
            }
            if (in_array($line, ['```', '```php', '```text'])) {
                $this->builder->controlMark($line);
                continue;
            }
            if (preg::match('/<!--(T-Regx|PHP|Result-(?:Value|Output))-->/', $line, $match)) {
                $this->builder->setConsumer($match[1]);
                continue;
            }
            if (preg::match('/<!--(T-Regx|PHP|Result-(?:Value|Output)):\{([\w-]+)(?:\(([\w\$-]+)\))?\}-->/', $line, $match)) {
                $forType = $match[1];
                $mod = $match[2];
                $arg = array_key_exists(3, $match) ? $match[3] : null;

                $this->builder->modify($forType, $this->modByName($mod), $arg);
                continue;
            }

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
}
