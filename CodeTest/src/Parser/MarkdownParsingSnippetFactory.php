<?php
namespace CodeTest\Parser;

use CodeTest\Parser\Mods\Modification;
use CodeTest\Parser\Mods\MultipleReturnValues;
use CodeTest\Parser\Mods\ReturnAt;
use CodeTest\Parser\Mods\ReturnFirstSemicolonLast;
use Exception;
use InvalidArgumentException;
use TRegx\SafeRegex\preg;

class MarkdownParsingSnippetFactory
{
    const START_TOKEN = '<!--DOCUSAURUS_CODE_TABS-->';
    const END_TOKEN = '<!--END_DOCUSAURUS_CODE_TABS-->';

    /** @var Modification[] */
    private $mods;

    public function __construct()
    {
        $this->mods = [
            'return-at'              => new ReturnAt(),
            'return-semi'            => new ReturnFirstSemicolonLast(),
            'packed-return-from-end' => new MultipleReturnValues(),
        ];
    }

    public function snippetsFromFile(string $path): ?array
    {
        if (is_dir($path)) {
            return null;
        }
        $file = file_get_contents($path);
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
                $modLine = array_key_exists(3, $match) ? $match[3] : null;
                if ($modLine) {
                    $modLine = $this->modLineStringToInt($modLine, count($snippet[$forType]));
                }

                if (array_key_exists($modLine, $snippet[$forType]) || $modLine === null) {
                    $snippet[$forType] = $this->modByName($mod)->modify($snippet[$forType], $modLine);
                    array_pop($snippets);
                    $snippets[] = array_values($snippet);
                    continue;
                }
                throw new InvalidArgumentException("Can't put return in $modLine");
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
        throw new Exception("Unknown mod '$mod'");
    }

    private function emptySnippet(): array
    {
        return ['T-Regx' => [], 'PHP' => [], 'Result-Value' => [], 'Result-Output' => []];
    }

    private function modLineStringToInt($modLine, int $count): int
    {
        if ($modLine === 'first') {
            return 0;
        }
        if ($modLine === 'last') {
            return $count - 1;
        }
        if (is_numeric($modLine)) {
            return $modLine;
        }
        throw new InvalidArgumentException("Mod line \"first\", \"last\" or of type integer expected, '$modLine' given");
    }
}
