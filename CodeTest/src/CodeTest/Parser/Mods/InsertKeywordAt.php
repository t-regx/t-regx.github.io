<?php
namespace CodeTest\Parser\Mods;

use CodeTest\Parser\LineArg;

class InsertKeywordAt extends PureModification
{
    private string $keyword;

    public function __construct(string $keyword)
    {
        $this->keyword = $keyword;
    }

    public function modify(array $snippet, ?string $argument): array
    {
        return $this->forModLine($snippet, (new LineArg($argument))->lineAsInt(count($snippet)));
    }

    private function forModLine(array $snippet, int $modLine): array
    {
        $snippet[$modLine] = $this->keyword . ' ' . $snippet[$modLine];
        return $snippet;
    }
}
