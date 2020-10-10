<?php

namespace Test\CodeTest\Parser\Snippet;

use CodeTest\Parser\Snippet\Code;
use PHPUnit\Framework\TestCase;

class CodeTest extends TestCase
{
    /**
     * @test
     */
    public function shouldSplit()
    {
        // when
        $array = Code::toArray("One\nTwo");

        // then
        $this->assertSame(['One', 'Two'], $array);
    }

    /**
     * @test
     */
    public function shouldCodeToArray()
    {
        // when
        $array = Code::codeToArray('One\nTwo\\\\n');

        // then
        $this->assertSame(['One', 'Two\\n'], $array);
    }
}
