<?php
namespace Test\Docs;

class CodeTabsParser
{
    const END_TOKEN = '<!--END_DOCUSAURUS_CODE_TABS-->';
    const T_REGX_TOKEN = '<!--T-Regx-->';
    const PHP_TOKEN = '<!--PHP-->';

    /** @var string */
    private $basePath;

    public function __construct(string $basePath)
    {
        $this->basePath = $basePath;
    }

    public function getSnippets()
    {
        $files = $this->filesInDirectory($this->basePath);
        $snippetsArray = array_map(function (string $filename) {
            return $this->flatMapSnippetsFromFile($filename);
        }, $files);
        return array_merge(...array_filter($snippetsArray));
    }

    function flatMapSnippetsFromFile(string $filename)
    {
        $snippets = $this->snippetsFromFile($filename);
        if ($snippets === null) {
            return null;
        }
        return array_combine($this->array(basename($filename), count($snippets)), $snippets);
    }

    private function filesInDirectory(string $path): array
    {
        return array_map(function (string $filename) use ($path) {
            return $path . $filename;
        }, array_values(array_diff(scandir($path), ['.', '..'])));
    }

    private function snippetsFromFile(string $path): ?array
    {
        $file = file_get_contents($path);
        $snippets = [];
        $snippet = [0 => [], 1 => []];
        $state = 0;
        foreach (explode("\n", $file) as $line) {
            switch ($line) {
                case self::END_TOKEN:
                    $state = 0;
                    $snippets[] = $snippet;
                    $snippet = [0 => [], 1 => []];
                    break;
                case self::T_REGX_TOKEN :
                    $state = 1;
                    break;
                case self::PHP_TOKEN :
                    $state = 2;
                    break;
                case '```':
                case '```php':
                    break;
                default:
                    switch ($state) {
                        case 1:
                            $snippet[0][] = $line;
                            break;
                        case 2:
                            $snippet[1][] = $line;
                            break;
                    }
            }
        }

        return empty($snippets) ? null : $snippets;
    }

    private function array(string $value, int $count): array
    {
        $result = [];
        for ($i = 0; $i < $count; $i++) {
            $result[] = $value . " #$i";
        }
        return $result;
    }
}
