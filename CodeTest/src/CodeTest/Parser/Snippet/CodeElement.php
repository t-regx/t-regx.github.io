<?php
namespace CodeTest\Parser\Snippet;

class CodeElement implements Element
{
    /** @var string|null */
    private $tRegx;
    /** @var string|null */
    private $php;

    public function __construct(?string $tRegx, ?string $php)
    {
        $this->tRegx = $tRegx;
        $this->php = $php;
    }

    public function populate(Snippet $snippet): void
    {
        if ($this->tRegx !== null) {
            $snippet->set('T-Regx', explode("\n", $this->tRegx));
        }
        if ($this->php !== null) {
            $snippet->set('PHP', explode("\n", $this->php));
        }
    }
}
