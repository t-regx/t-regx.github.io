<?php
namespace Test\Docs;

use InvalidArgumentException;

class SnippetFactory
{
    const START_TOKEN = '<!--DOCUSAURUS_CODE_TABS-->';
    const END_TOKEN = '<!--END_DOCUSAURUS_CODE_TABS-->';

    public function snippetsFromFile(string $path): ?array
    {
        if (is_dir($path)) {
            return null;
        }
        $file = file_get_contents($path);
        $snippets = [];
        $type = null;
        foreach (preg_split("/[\n\r]?[\n\r]/", $file) as $line) {
            if ($line == self::START_TOKEN) {
                $snippet = ['T-Regx' => [], 'PHP' => []];
            }
            if ($line == self::END_TOKEN) {
                $type = null;
                $snippets[] = array_values($snippet);
                continue;
            }
            if (in_array($line, ['```', '```php'])) {
                continue;
            }
            if (preg_match('/<!--(T-Regx|PHP)-->/', $line, $match)) {
                $type = $match[1];
                continue;
            }
            if (preg_match('/<!----test-return-(T-Regx|PHP)-(\d+)---->/', $line, $match)) {
                $forType = $match[1];
                $returnLine = $match[2];
                if (array_key_exists($returnLine, $snippet[$forType])) {
                    $snippet[$forType][$returnLine] = 'return ' . $snippet[$forType][$returnLine];
                    array_pop($snippets);
                    $snippets[] = array_values($snippet);
                    continue;
                }
                throw new InvalidArgumentException("Can't put return in $returnLine");
            }
            if ($type) {
                $snippet[$type][] = $line;
            }
        }

        return empty($snippets) ? null : $snippets;
    }
}
