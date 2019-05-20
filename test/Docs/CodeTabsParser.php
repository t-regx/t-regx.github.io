<?php
namespace Test\Docs;

class CodeTabsParser
{
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
        $snippets = (new SnippetFactory())->snippetsFromFile($filename);
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

    private function array(string $value, int $count): array
    {
        $result = [];
        for ($i = 0; $i < $count; $i++) {
            $result[] = $value . " #$i";
        }
        return $result;
    }
}
