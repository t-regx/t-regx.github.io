<?php
namespace CodeTest\Parser;

use TRegx\CleanRegex\Match\Details\Match;

class MarkdownSnippetParser
{
    public function parse(string $content): array
    {
        return pattern($this->pattern(), 'sx')->match($content)->map(function (Match $match) {
            $result = [];
            if ($match->matched('tregx')) {
                $result['tregx'] = $match->get('tregx');
            }
            if ($match->matched('php')) {
                $result['php'] = $match->get('php');
            }
            if ($match->matched('result_value')) {
                $result['result'] = [
                    'value' => $match->get('result_value'),
                    'type'  => $match->group('result_type')->orReturn(null)
                ];
            }
            if ($match->matched('mod')) {
                $result['mod'] = [
                    'name' => $match->get('mod'),
                    'for'  => $match->get('mod_for'),
                    'arg'  => $match->get('mod_arg'),
                ];
            }
            return $result;
        });
    }

    private function pattern(): string
    {
        return <<<PATTERN
<CodeTabs\s*
    (?:tregx=\{`(?<tregx>.*?)`\})?  \s*
    (?:php=\{`(?<php>.*?)`\})?  \s*
    />\s*
(?:<!--(?<mod_for>T-Regx|PHP):\{(?<mod>[\w-]+)(?:\((?<mod_arg>[\w\\\\$-]+)\))?\}-->)?\s*
(?:<Result(?:\s+(?<result_type>[a-z]+))?>(?<result_value>.*?)</Result>)?
PATTERN;
    }
}
