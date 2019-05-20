<?php
namespace Test\Docs;

use InvalidArgumentException;

class SnippetFactory
{
    const END_TOKEN = '<!--END_DOCUSAURUS_CODE_TABS-->';

    public function snippetsFromFile(string $path): ?array
    {
        $file = file_get_contents($path);
        $snippets = [];
        $snippet = ['T-Regx' => [], 'PHP' => []];
        $type = null;
        foreach (explode("\n", $file) as $line) {
            if ($line == self::END_TOKEN) {
                $type = null;
                $snippets[] = array_values($snippet);
                $snippet = ['T-Regx' => [], 'PHP' => []];
                continue;
            }
            if (in_array($line, ['```', '```php'])) {
                continue;
            }
            if (preg_match('/<!--(T-Regx|PHP)-->/', $line, $match)) {
                $type = $match[1];
                continue;
            }
            if (preg_match('/<!--test-return-(\d+)-->/', $line, $match)) {
                $returnLine = $match[1];
                if (array_key_exists($returnLine, $snippet[$type])) {
                    $snippet[$type][$returnLine] = 'return ' . $snippet[$type][$returnLine];
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
