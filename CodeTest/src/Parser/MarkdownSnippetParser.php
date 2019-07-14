<?php
namespace CodeTest\Parser;

use CodeTest\Parser\Mods\Modification;
use CodeTest\Parser\Mods\MultipleReturnValues;
use CodeTest\Parser\Mods\ReturnAt;
use CodeTest\Parser\Mods\ReturnFirstSemicolonLast;
use CodeTest\Parser\Snippet\CodeTabSnippetBuilder;
use CodeTest\Parser\Snippet\SnippetListener;
use Exception;
use TRegx\SafeRegex\preg;

class MarkdownParsingSnippetFactory implements SnippetListener
{
    const START_TOKEN = '<!--DOCUSAURUS_CODE_TABS-->';
    const END_TOKEN = '<!--END_DOCUSAURUS_CODE_TABS-->';

    /** @var string */
    private $path;
    /** @var Modification[] */
    private $mods;

    /** @var array[] */
    private $snippets = [];

    public function __construct(string $path)
    {
        $this->path = $path;
        $this->mods = [
            'return-at'              => new ReturnAt(),
            'return-semi'            => new ReturnFirstSemicolonLast(),
            'packed-return-from-end' => new MultipleReturnValues(),
        ];
    }

    public function snippetsFromFile(): ?array
    {
        if (is_dir($this->path)) {
            return null;
        }
        $file = file_get_contents($this->path);

        $builder = new CodeTabSnippetBuilder($this);

        foreach (preg_split("/[\n\r]?[\n\r]/", $file) as $line) {
            if ($line == self::START_TOKEN) {
                if (!$this->builder->isEmpty()) {
                    $this->builder->flush();
                }
                continue;
            }
            if (in_array($line, ['```', '```php', '```text'])) {
                $builder->controlMark($line);
                continue;
            }
            if (preg::match('/<!--(T-Regx|PHP|Result-(?:Value|Output))-->/', $line, $match)) {
                $builder->setConsumer($match[1]);
                continue;
            }
            if (preg::match('/<!--(T-Regx|PHP|Result-(?:Value|Output)):\{([a-z-]+)(?:\((?:(\w+))\))?\}-->/', $line, $match)) {
                $forType = $match[1];
                $mod = $match[2];
                $arg = array_key_exists(3, $match) ? $match[3] : null;

                $builder->modify($forType, $this->modByName($mod), $arg);
                continue;
            }

            $builder->feedLine($line);
        }

        $this->builder->flush();
    }

    private function modByName(string $mod): Modification
    {
        if (array_key_exists($mod, $this->mods)) {
            return $this->mods[$mod];
        }
        throw new Exception("Unknown mod '$mod' used in $this->path");
    }

    public function created(array $snippet): void
    {
        $this->snippets[] = $snippet;
    }
}
