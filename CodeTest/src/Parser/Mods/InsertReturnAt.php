<?php
namespace CodeTest\Parser\Mods;

class InsertReturnAt implements Modification
{
    public function modify(array $snippet, ?string $argument): array
    {
        return $this->forModLine($snippet, (new LineArg($argument))->lineAsInt(count($snippet)));
    }

    private function forModLine(array $snippet, int $modLine): array
    {
        $snippet[$modLine] = 'return ' . $snippet[$modLine];
        return $snippet;
    }
}
