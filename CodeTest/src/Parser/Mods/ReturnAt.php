<?php
namespace CodeTest\Parser\Mods;

class ReturnAt implements Modification
{
    public function modify(array $snippet, $argument): array
    {
        return $this->forModLine($snippet, (new LineArg($argument))->lineAsInt(count($snippet)));
    }

    private function forModLine(array $snippet, int $modLine): array
    {
        $snippet[$modLine] = 'return ' . $snippet[$modLine];
        return $snippet;
    }
}
