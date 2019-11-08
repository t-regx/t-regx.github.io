<?php
namespace CodeTest;

use ArrayIterator;

class FilesIterator extends ArrayIterator
{
    public function __construct(string $directory)
    {
        parent::__construct(array_map(function (string $filename) use ($directory) {
            return $this->joinPaths($directory, $filename);
        }, array_values(array_diff(scandir($directory), ['.', '..']))));
    }

    private function joinPaths(string $directory, string $filename, string $s = DIRECTORY_SEPARATOR): string
    {
        return join($s, [trim($directory, $s), trim($filename, $s)]);
    }
}
