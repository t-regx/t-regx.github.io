<?php
namespace Test\Docs;

use PHPUnit\Framework\TestCase;

class CodeDualityTest extends TestCase
{
    function snippets(): array
    {
        return (new CodeTabsParser('../../docs/'))->getSnippets();
    }

    /**
     * @test
     * @dataProvider snippets
     * @param array $tregx
     * @param array $php
     */
    function testDuality(array $tregx, array $php): void
    {
        // given
        $one = $this->arrayToString($this->addSingleLineReturn($tregx));
        $two = $this->arrayToString($this->addSingleLineReturn($php));

        // when
        list($return1, $echo1) = $this->invoke($one);
        list($return2, $echo2) = $this->invoke($two);

        // then
        $this->assertEquals($return1, $return2);
        $this->assertEquals($echo1, $echo2);
    }

    private function arrayToString(array $lines): string
    {
        $namespaces = [
            'use TRegx\CleanRegex\Match\Details\Match;',
            'use TRegx\SafeRegex\preg;'
        ];
        return join(PHP_EOL, array_merge($namespaces, $lines));
    }

    private function invoke(string $one): array
    {
        ob_start();
        $return1 = eval($one);
        $echo1 = ob_get_clean();
        return array($return1, $echo1);
    }

    private function addSingleLineReturn(array $code): array
    {
        if (count($code) === 1) {
            if (substr($code[0], 0, 6) !== 'return') {
                return ['return ' . $code[0]];
            }
        }
        return $code;
    }
}
