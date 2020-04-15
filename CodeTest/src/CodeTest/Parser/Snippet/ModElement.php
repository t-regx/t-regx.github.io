<?php
namespace CodeTest\Parser\Snippet;

use CodeTest\Parser\Mods;

class ModElement implements Element
{
    /** @var Mods */
    private $mods;
    /** @var string */
    private $name;
    /** @var string */
    private $for;
    /** @var string|int */
    private $arg;

    public function __construct(Mods $mods, string $name, string $for, $arg)
    {
        $this->name = $name;
        $this->for = $for;
        $this->arg = $arg;
        $this->mods = $mods;
    }

    public function populate(Snippet $snippet): void
    {
        $this->mods->mod($this->name)->forSnippet($snippet, $this->for, $this->arg);
    }
}
