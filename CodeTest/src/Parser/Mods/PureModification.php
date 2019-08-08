<?php
namespace CodeTest\Parser\Mods;

abstract class PureModification implements Modification
{
    public abstract function modify(array $snippet, ?string $argument): array;
}
