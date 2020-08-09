<?php
namespace CodeTest\Parser;

use CodeTest\Parser\Snippet\CodeElement;

class MarkdownSnippetParser
{
    private MdxParser $parser;

    public function __construct(MdxParser $parser)
    {
        $this->parser = $parser;
    }

    public function parse(string $content): array
    {
        return $this->splitArrayCodeValue($this->parser->parse($content));
    }

    private function splitArrayCodeValue(array $values): array
    {
        $result = [];
        foreach ($values as $element) {
            if ($element instanceof CodeElement) {
                $result[] = [$element];
            } else {
                end($result);
                $result[key($result)][] = $element;
            }
        }
        return $result;
    }
}
