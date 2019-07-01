<?php
namespace CodeTest\Parser\Mods;

use AssertionError;

class MultipleReturnValues implements Modification
{
    public function modify(array $snippet, ?int $modLine): array
    {
        if ($modLine === null) {
            throw new AssertionError("Argument #1 is required");
        }
        if (count($snippet) < $modLine) {
            throw new AssertionError("Argument #1 '$modLine' is greater than the number of lines");
        }
        if ($modLine <= 0) {
            throw new AssertionError("Argument #1 '$modLine' doesn't correspond to the number of lines");
        }
        return $this->performModification($snippet, $modLine);
    }

    public function performModification(array $snippet, int $modLine): array
    {
        [$payload, $toPack] = $this->splitArraysAtIndexFromEnd($snippet, $modLine);
        return array_merge($payload, ['return ['], $this->addCommas($toPack), ['];']);
    }

    public function splitArraysAtIndexFromEnd(array $array, int $indexFromEnd): array
    {
        $payload = array_slice($array, 0, count($array) - $indexFromEnd);
        $toPack = array_slice($array, count($array) - $indexFromEnd, $indexFromEnd);
        return [$payload, $toPack];
    }

    public function addCommas(array $toPack): array
    {
        return array_map(function (string $line) {
            return rtrim($line, ';') . ',';
        }, $toPack);
    }
}
