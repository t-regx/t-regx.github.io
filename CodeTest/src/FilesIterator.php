<?php
namespace CodeTest;

use ArrayIterator;

class FilesIterator extends ArrayIterator
{
    public function __construct(string $directory)
    {
        parent::__construct(array_map(function (string $filename) use ($directory) {
            return $directory . $filename;
        }, array_values(array_diff(scandir($directory), ['.', '..']))));
    }
}
