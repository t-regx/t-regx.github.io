<?php
namespace CodeTest\Parser;

use CodeTest\Parser\Snippet\CodeElement;
use CodeTest\Parser\Snippet\EmptyElement;
use CodeTest\Parser\Snippet\ModElement;
use CodeTest\Parser\Snippet\ResultElement;
use TRegx\CleanRegex\Match\Details\Match;
use TRegx\CleanRegex\Pattern;

class MdxParser
{
    /** @var Mods */
    private $mods;

    public function __construct(Mods $mods)
    {
        $this->mods = $mods;
    }

    public function parse(string $content): array
    {
        $merged = $this->code($content) + $this->mod($content) + $this->result($content);
        ksort($merged);
        return $merged;
    }

    public function code(string $content): array
    {
        return $this->map($this->codePattern(), $content, function (Match $match) {
            return new CodeElement(
                $match->group('tregx')->orReturn(null),
                $match->group('php')->orReturn(null)
            );
        });
    }

    private function mod(string $content): array
    {
        return $this->map($this->modPattern(), $content, function (Match $match) {
            if ($match->matched('mod')) {
                return new ModElement(
                    $this->mods,
                    $match->get('mod'),
                    $match->get('mod_for'),
                    $match->group('mod_arg')->orReturn(null)
                );
            }
            return new EmptyElement();
        });
    }

    private function result(string $content): array
    {
        return $this->map($this->resultPattern(), $content, function (Match $match) {
            if ($match->matched('result_value')) {
                return new ResultElement(
                    $this->parseEscapedJsx($match->get('result_value')),
                    $match->group('result_type')->orReturn(null));
            }
            return new EmptyElement();
        });
    }

    private function codePattern(): string
    {
        return <<<PATTERN
<CodeTabs\s*
    (?:tregx=(?:\{`|")(?<tregx>.*?)(?:`\}|"))?  \s*
    (?:php=(?:\{`|")(?<php>.*?)(?:`\}|"))?  \s*
    />\s*
PATTERN;
    }

    private function modPattern(): string
    {
        return '(?:<!--(?<mod_for>T-Regx|PHP|Result-(?:Value|Output)):\\{(?<mod>[\\w-]+)(?:\\((?<mod_arg>[\\w\\\\$-]+)\\))?\\}-->)';
    }

    private function resultPattern(): string
    {
        return '(?:<Result(?:\\s+(?<result_type>[a-z]+))?>(\s*\{`)?(?<result_value>.*?)(`}\s*)?</Result>)';
    }

    private function map(string $pattern, string $content, callable $mapper): array
    {
        return Pattern::of($pattern, 'sx')
            ->match($content)
            ->fluent()
            ->groupByCallback(function (Match $match) {
                return $match->byteOffset();
            })
            ->map(function (array $matches) use ($mapper) {
                return $mapper($matches[0]);
            })
            ->all();
    }

    private function parseEscapedJsx(string $jsx): string
    {
        return Pattern::of('\\\\.')->replace($jsx)->all()->by()->map([
            '\n'   => "\n",
            '\\\\' => '\\',
        ]);
    }
}
