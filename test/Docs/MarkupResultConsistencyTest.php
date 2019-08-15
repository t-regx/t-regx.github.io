<?php
namespace Docs;

use AssertionError;
use CodeTest\CodeTabsDataProvider;
use Error;
use InvalidArgumentException;
use ParseError;
use PHPUnit\Framework\TestCase;
use Throwable;
use TRegx\CleanRegex\Exception\CleanRegex\MissingReplacementKeyException;
use TRegx\CleanRegex\Exception\CleanRegex\NonExistentGroupException;
use TRegx\CleanRegex\Exception\CleanRegex\SubjectNotMatchedException;
use TRegx\CleanRegex\Match\Details\Match;
use TRegx\CleanRegex\Match\Details\NotMatched;
use TRegx\CleanRegex\Pattern;
use TRegx\SafeRegex\Exception\CompileSafeRegexException;
use TRegx\SafeRegex\preg;

class MarkupResultConsistencyTest extends TestCase
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
     * @param array|null $exceptions
     */
    function test(array $tregx, ?array $php, ?array $expectedResult, ?array $expectedOutput, array $exceptions = null): void
    {
        // given
        $one = $tregx ? $this->arrayToString($tregx) : null;
        $two = $php ? $this->arrayToString($php) : null;

        // when
        [$return1, $echo1, $exception1] = $one ? $this->invoke($one, 'T-Regx') : [null, null, null];
        [$return2, $echo2, $exception2] = $two ? $this->invoke($two, 'PHP') : [null, null, null];

        // then
        if ($one && $two) {
            $this->assertEquals($return1, $return2, 'Return values from T-Regx (expected) and PHP (actual) differ');
            $this->assertEquals($echo1, $echo2, 'Printed texts from T-Regx (expected) and PHP (actual) differ');
        }

        if ($expectedResult) {
            $this->assertEquals($this->parseExpectedResult($expectedResult), $return1, 'Failed asserting that T-Regx snippet returned expected result');
        }
        if ($expectedOutput) {
            $this->assertEquals($this->parseExpectedOutput($expectedOutput), $echo1, 'Failed asserting that T-Regx snippet printed expected output');
        }

        $this->assertExceptionInstanceOf($exceptions['T-Regx'], $exception1, 'T-Regx');
        $this->assertExceptionInstanceOf($exceptions['PHP'], $exception2, 'PHP');
    }

    private function arrayToString(array $lines): string
    {
        return join(PHP_EOL, $this->preprocessCode($lines));
    }

    private function preprocessCode(array $lines): array
    {
        $namespaces = $this->declareNamespaces([
            MissingReplacementKeyException::class,
            NonExistentGroupException::class,
            SubjectNotMatchedException::class,
            Match::class,
            NotMatched::class,
            CompileSafeRegexException::class,
            preg::class,
            Pattern::class,
        ]);
        $functions = $this->polyfillGlobalFunctions([
            'validateGroupExists'  => true,
            'validateGroupMatched' => false, // doesn't work for matched empty strings
            'validateGroupName'    => true
        ]);
        $classes = [
            "if (!class_exists('MyCustomException')) { class MyCustomException extends Exception {} }"
        ];
        $lines = $this->addSingleLineReturn($lines);
        $lines = $this->replaceCodeFragments($lines, [
            'new SubjectNotMatchedException()' => 'new SubjectNotMatchedException("","")'
        ]);
        $lines = $this->protectAgainstClassRedeclaration($lines);
        return array_merge($namespaces, $functions, $classes, $lines);
    }

    private function invoke(string $code, string $snippetName): array
    {
        $result = null;
        $output = null;
        $caughtException = null;
        try {
            ob_start();
            try {
                $result = eval($code);
            } catch (Throwable $exception) {
                $caughtException = $exception;
            } finally {
                $output = ob_get_clean();
            }
        } catch (ParseError $error) {
            throw new ParseError($this->errorMessage($error, $code, $snippetName));
        } catch (Error $error) {
            throw new Error($this->errorMessage($error, $code, $snippetName));
        }
        return [$result, $output, $caughtException];
    }

    private function errorMessage(Error $error, string $code, string $snippetName): string
    {
        return $error->getMessage() . ', on line ' . $error->getLine() . " in $snippetName snippet:" . PHP_EOL . PHP_EOL . $code;
    }

    private function addSingleLineReturn(array $code): array
    {
        if (count($code) === 1) {
            if (!$this->startsWith($code[0], 'return ') && !$this->startsWith($code[0], 'echo ')) {
                return ['return ' . $code[0]];
            }
        }
        return $code;
    }

    private function replaceCodeFragments(array $lines, $replacements): array
    {
        return array_map(function (string $line) use ($replacements) {
            return str_replace(array_keys($replacements), array_values($replacements), $line);
        }, $lines);
    }

    private function protectAgainstClassRedeclaration(array $lines): array
    {
        return array_map(function (string $line) {
            if (preg::match('/^class (\w+) extends ([\\\\\\w+]+) {}/', $line, $match)) {
                [$text, $child, $parent] = $match;
                return "if (!class_exists('$child')) { class $child extends $parent {} }";
            }
            if (preg::match('/^class /', $line)) {
                throw new AssertionError();
            }
            return $line;
        }, $lines);
    }

    private function polyfillGlobalFunctions(array $namesAndResults): array
    {
        return array_map(function ($key, $value) {
            return "if (!function_exists('$key')) { function $key() { return " . var_export($value, true) . "; }}";
        }, array_keys($namesAndResults), $namesAndResults);
    }

    private function declareNamespaces(array $classes): array
    {
        return array_map(function (string $className) {
            return "use $className;";
        }, $classes);
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
        return join(PHP_EOL, array_values(array_filter($expectedOutput, 'trim')));
    }

    private function startsWith(string $haystack, string $needle): bool
    {
        return substr($haystack, 0, strlen($needle)) === $needle;
    }

    private function assertExceptionInstanceOf(?string $expected, ?Throwable $exception, string $snippet): void
    {
        if ($expected === null && $exception === null) {
            $this->assertTrue(true);
            return;
        }
        if ($expected && $exception) {
            $this->assertInstanceOf($expected, $exception, "Failed asserting that T-Regx snippet threw $expected");
            return;
        }
        if ($exception) {
            throw new AssertionError("Snippet $snippet threw '\\" . get_class($exception) . "', but exception was not expected");
        }
    }
}
