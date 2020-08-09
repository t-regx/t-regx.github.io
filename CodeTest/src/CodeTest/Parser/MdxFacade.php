<?php
namespace CodeTest\Parser;

use CodeTest\Parser\Snippet\Snippet;

class MdxFacade
{
    private MarkdownSnippetParser $parser;

    public function __construct(MarkdownSnippetParser $parser)
    {
        $this->parser = $parser;
    }

    public function parse(string $content): array
    {
        return array_map(function (Snippet $snippet) {
            return $snippet->toDataProviderArray();
        }, array_map([$this, 'postprocess'], $this->parser->parse($content)));
    }

    private function postprocess(array $values): Snippet
    {
        $snippet = new Snippet(['T-Regx', 'PHP', 'Result-Value', 'Result-Output']);
        foreach ($values as $element) {
            $element->populate($snippet);
        }
        return $snippet;
    }
}
