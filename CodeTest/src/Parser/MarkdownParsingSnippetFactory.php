<?php
namespace CodeTest\Parser;

use CodeTest\Parser\Mods\Modification;
use CodeTest\Parser\Mods\MultipleReturnValues;
use CodeTest\Parser\Mods\ReturnAt;
use CodeTest\Parser\Mods\ReturnFirstSemicolonLast;
use Exception;
use TRegx\SafeRegex\preg;

class MarkdownParsingSnippetFactory
{
    const START_TOKEN = '<!--DOCUSAURUS_CODE_TABS-->';
    const END_TOKEN = '<!--END_DOCUSAURUS_CODE_TABS-->';

    /** @var string */
    private $path;
    /** @var Modification[] */
    private $mods;

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
        $snippets = [];
        $type = null;
        $snippet = $this->emptySnippet();
        foreach (preg_split("/[\n\r]?[\n\r]/", $file) as $line) {
            if ($line == self::START_TOKEN) {
                $snippet = $this->emptySnippet();
                continue;
            }
            if ($line == self::END_TOKEN) {
                $type = null;
                $snippets[] = array_values($snippet);
                continue;
            }
            if (in_array($line, ['```', '```php', '```text'])) {
                if ($line === '```' && in_array($type, ['Result-Value', 'Result-Output'])) {
                    array_pop($snippets);
                    $snippets[] = array_values($snippet);
                    $type = null;
                }
                continue;
            }
            if (preg::match('/<!--(T-Regx|PHP|Result-(?:Value|Output))-->/', $line, $match)) {
                $type = $match[1];
                continue;
            }
            if (preg::match('/<!--(T-Regx|PHP|Result-(?:Value|Output)):\{([a-z-]+)(?:\((?:(\w+))\))?\}-->/', $line, $match)) {
                $forType = $match[1];
                $mod = $match[2];
                $arg = array_key_exists(3, $match) ? $match[3] : null;

                $snippet[$forType] = $this->modByName($mod)->modify($snippet[$forType], $arg);
                array_pop($snippets);
                $snippets[] = array_values($snippet);
                continue;
            }
            if ($type) {
                array_push($snippet[$type], $line);
            }
        }

        return empty($snippets) ? null : $snippets;
    }

    private function modByName(string $mod): Modification
    {
        if (array_key_exists($mod, $this->mods)) {
            return $this->mods[$mod];
        }
        throw new Exception("Unknown mod '$mod' used in $this->path");
    }

    private function emptySnippet(): array
    {
        return ['T-Regx' => [], 'PHP' => [], 'Result-Value' => [], 'Result-Output' => []];
    }
}
