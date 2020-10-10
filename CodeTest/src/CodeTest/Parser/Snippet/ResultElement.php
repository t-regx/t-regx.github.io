<?php

namespace CodeTest\Parser\Snippet;

class ResultElement implements Element
{
    private string $value;
    private ?string $type;

    public function __construct(string $value, ?string $type)
    {
        $this->value = $value;
        $this->type = $type;
    }

    public function populate(Snippet $snippet): void
    {
        if ($this->type === 'text') {
            $snippet->set('Result-Output', Code::toArray($this->value));
        } else {
            $snippet->set('Result-Value', Code::codeToArray($this->value));
        }
    }
}
