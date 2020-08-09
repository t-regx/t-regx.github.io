<?php
namespace CodeTest\Parser\Snippet;

class CodeElement implements Element, \JsonSerializable
{
    private ?string $tRegx;
    private ?string $php;

    public function __construct(?string $tRegx, ?string $php)
    {
        $this->tRegx = $tRegx;
        $this->php = $php;
    }

    public function populate(Snippet $snippet): void
    {
        if ($this->tRegx !== null) {
            $snippet->set('T-Regx', Code::codeToArray($this->tRegx));
        }
        if ($this->php !== null) {
            $snippet->set('PHP', Code::codeToArray($this->php));
        }
    }

    public function jsonSerialize()
    {
        return [
            'tRegx' => $this->tRegx,
            'php'   => $this->php,
        ];
    }
}
