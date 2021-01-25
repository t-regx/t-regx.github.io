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

    public function parse(string $filename, string $content): array
    {
        return array_map(fn(array $values) => $this->postprocess($filename, $values)->toDataProviderArray(), $this->parser->parse($content));
    }

    private function postprocess(string $filename, array $values): Snippet
    {
        $snippet = new Snippet($filename, ['T-Regx', 'PHP', 'Result-Value', 'Result-Output']);
        foreach ($values as $element) {
            $element->populate($snippet);
        }
        return $snippet;
    }
}
