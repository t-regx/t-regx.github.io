<?php
namespace CodeTest\Parser\Mods;

class InsertKeywordAt extends PureModification
{
    /** @var string */
    private $keyword;

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
