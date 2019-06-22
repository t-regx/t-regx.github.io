<?php
namespace Docs;

use InvalidArgumentException;
use ParseError;
use PHPUnit\Framework\TestCase;

class CodeDualityTest extends TestCase
{
    function snippets(): array
    {
        try {
            return (new CodeTabsDataProvider('../../docs/'))->getSnippets();
        } catch (InvalidArgumentException $exception) {
            echo PHP_EOL . $exception . $this->getStatusMessage() . PHP_EOL . $exception->getTraceAsString();
            throw $exception;
        }
    }

    /**
     * @test
     * @dataProvider snippets
     * @param array $tregx
     * @param array $php
     * @param array $expectedResult
     * @param array $expectedOutput
     */
    function testDuality(array $tregx, array $php, array $expectedResult, array $expectedOutput): void
    {
        // given
        $this->assertGreaterThan(0, count($tregx));
        $this->assertGreaterThan(0, count($php));

        $one = $this->arrayToString($tregx);
        $two = $this->arrayToString($php);

        // when
        list($return1, $echo1) = $this->invoke($one, 'T-Regx');
        list($return2, $echo2) = $this->invoke($two, 'PHP');

        // then
        $this->assertEquals($return1, $return2);
        $this->assertEquals($echo1, $echo2);

        if (count($expectedResult)) {
            $this->assertEquals($return1, $this->parseExpectedResult($expectedResult));
        }
        if (count($expectedOutput)) {
            $this->assertEquals($echo1, $this->parseExpectedOutput($expectedOutput));
        }
    }

    private function arrayToString(array $lines): string
    {
        return join(PHP_EOL, $this->preprocessCode($lines));
    }

    private function preprocessCode(array $lines): array
    {
        $lines = $this->addSingleLineReturn($lines);
        $lines = $this->polyfillForSubjectNotMatched($lines);
        $namespaces = [
            'use TRegx\CleanRegex\Exception\CleanRegex\SubjectNotMatchedException;',
            'use TRegx\CleanRegex\Match\Details\Match;',
            'use TRegx\CleanRegex\Match\Details\NotMatched;',
            'use TRegx\SafeRegex\preg;',
        ];
        return array_merge($namespaces, $lines);
    }

    private function invoke(string $code, string $snippetName): array
    {
        try {
            return $this->tryInvoke($code);
        } catch (ParseError $error) {
            throw new ParseError($error->getMessage() . " - in $snippetName snippet");
        }
    }

    private function tryInvoke(string $code): array
    {
        ob_start();
        $result = eval($code);
        $output = ob_get_clean();
        return [$result, $output];
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

    private function polyfillForSubjectNotMatched(array $lines)
    {
        return array_map(function (string $line) {
            return str_replace('new SubjectNotMatchedException()', 'new SubjectNotMatchedException("","")', $line);
        }, $lines);
    }

    private function parseExpectedResult(array $input)
    {
        $expectedResult = array_values(array_filter($input));
        if (count($expectedResult) === 1) {
            $expectedResult[0] = 'return ' . $expectedResult[0] . ';';
        }
        try {
            return eval(join(PHP_EOL, $expectedResult));
        } catch (ParseError $error) {
            echo join(PHP_EOL, $expectedResult);
            throw $error;
        }
    }

    private function parseExpectedOutput(array $expectedOutput): string
    {
        return join(PHP_EOL, array_values(array_filter($expectedOutput, function (string $input) {
            return trim($input);
        })));
    }
}
