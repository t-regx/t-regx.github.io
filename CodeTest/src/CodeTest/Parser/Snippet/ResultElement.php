<?php
namespace CodeTest\Parser\Snippet;

class ResultElement implements Element
{
    /** @var string */
    private $value;
    /** @var string|null */
    private $type;

    public function __construct(string $value, ?string $type)
    {
        $this->value = $value;
        $this->type = $type;
    }

    public function populate(Snippet $snippet): void
    {
        if ($this->type === 'text') {
            $snippet->set('Result-Output', explode("\n", $this->value));
        } else {
            $snippet->set('Result-Value', explode("\n", $this->value));
        }
    }
}
