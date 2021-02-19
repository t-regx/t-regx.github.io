<?php
namespace CodeTest\Parser;

use CodeTest\Parser\Snippet\CodeElement;
use CodeTest\Parser\Snippet\EmptyElement;
use CodeTest\Parser\Snippet\ModElement;
use CodeTest\Parser\Snippet\ResultElement;
use TRegx\CleanRegex\Match\Details\Detail;
use TRegx\CleanRegex\Pattern;

class MdxParser
{
    private Mods $mods;

    public function __construct(Mods $mods)
    {
        $this->mods = $mods;
    }

    public function parse(string $content): array
    {
        return $this->parseMdx(str_replace("\r", "", $content));
    }

    private function parseMdx(string $content): array
    {
        $merged = $this->code($content) + $this->mod($content) + $this->result($content);
        ksort($merged);
        return $merged;
    }

    public function code(string $content): array
    {
        return $this->map($this->codePattern(), $content, fn(Detail $detail) => new CodeElement(
            $detail->group('tregx')->orReturn(null),
            $detail->group('php')->orReturn(null)
        ));
    }

    private function mod(string $content): array
    {
        return $this->map($this->modPattern(), $content, function (Detail $detail) {
            if ($detail->matched('mod')) {
                return new ModElement(
                    $this->mods,
                    $detail->get('mod'),
                    $detail->get('mod_for'),
                    $detail->group('mod_arg')->orReturn(null)
                );
            }
            return new EmptyElement();
        });
    }

    private function result(string $content): array
    {
        return $this->map($this->resultPattern(), $content, function (Detail $detail) {
            if ($detail->matched('result_value')) {
                return new ResultElement(
                    $this->unquoteJsx($detail, $detail->get('result_value')),
                    $detail->group('result_type')->orReturn(null));
            }
            return new EmptyElement();
        });
    }

    private function unquoteJsx(Detail $match, string $value): string
    {
        if ($this->isResultJsx($match)) {
            return $this->parseEscapedJsx($value);
        }
        return $value;
    }

    private function isResultJsx(Detail $match): bool
    {
        return trim($match->group('start')->orReturn(null)) == '{`'
            && trim($match->group('end')->orReturn(null)) == '`}';
    }

    private function parseEscapedJsx(string $jsx): string
    {
        return Pattern::of('\\\\.')->replace($jsx)->all()->by()->map([
            '\n'   => "\n",
            '\\\\' => '\\',
        ]);
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
        return '(?:<Result(?:\\s+(?<result_type>[a-z]+))?>(?<start>\s*\{`)?(?<result_value>.*?)(?<end>`}\s*)?</Result>)';
    }

    private function map(string $pattern, string $content, callable $mapper): array
    {
        return Pattern::of($pattern, 'sx')
            ->match($content)
            ->fluent()
            ->groupByCallback(fn(Detail $detail) => $detail->byteOffset())
            ->map(fn(array $matches) => $mapper($matches[0]))
            ->all();
    }
}
