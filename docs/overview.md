---
id: overview
title: What's T-Regx?
---

Documentation for version: 0.41.2

T-Regx is a lightweight, high-level library for regular expressions in PHP. It's designed for simple projects 
and enterprise solutions.

The name "T-Regx" is a combination of words "Regex" and "T-Rex" (Tyrannosaurus Rex).

Main features of T-Regx are:

- Separates `Pattern` syntax and matching process
- Unifies differences in PCRE between PHP versions
- Provides UTF-8 support out of the box
- Uses exceptions (instead of errors/warnings/fatals and flags)
- Regular expressions without delimiters (so `Pattern::of("^foo")` instead of `preg_match("/^foo/")`)
- Provides [prepared patterns] for handling unsafe characters (e.g. user input, delicate values)
- Has simplified, clean interface:
    - exposes proper methods (instead of returning `null`, `false`, `""` or `0`/`-1` as magic values)
    - handles unnecessarily complex `preg_` state and output, and exposes it as:
        - `Pattern` and `PatternList` for syntax and pattern building
        - `Matcher`, `Detail`, `Group` for matching (instead of nested `array` of `string|int`)
        - exceptions `MalformedPatternException`, `SubjectNotMatchedException`, `GroupNotMatchedException`, `NonexistentGroupException`

T-Regx uses PHP regular expressions under the hood, but its well encapsulated.

## Example usages of T-Regx

### Example usage of matching

```php
<?php
use TRegx\CleanRegex\Pattern;

/**
 * Instantiate your pattern
 */
$pattern = Pattern::of("^(f)oo");

$matcher = $pattern->match($_GET['input'])

if ($matcher->fails()) {
    die("Nothing matched!");
}

/**
 * @var Detail $detail
 */
foreach ($matcher as $detail) {
    $detail->text();   // matched text
    $detail->offset(); // matched offset in characters, for bytes use byteOffset()
    $detail->get(1);   // get first capturing group
}

echo "Found " . $matcher->count() . " occurrences";

/**
 * @var string[]
 */
$splitElements = $pattern->split($_GET['input']); // split by regular expression
```

When calling multiple methods on the same `$matcher` object, T-Regx doesn't make any unnecessary calls to underlying
PHP implementations.

```php
$match->all();   // calls `preg_match_all()` to return Detail[]
$match->count(); // reuses the return value from the previous PHP call
```

### Example usage of replacing


```php
<?php
use TRegx\CleanRegex\Pattern;

/**
 * Instantiate your pattern
 */
$pattern = Pattern::of("https?://(\w+\.\w+)");

/**
 * Replace all matched occurrences
 */
$replace = $pattern->replace($_GET['input'])

/**
 * Replace with a constant value
 */
$replace->with('XXX'); // censor all links in the input

/**
 * Replace dynamically via callback
 */
$replace->callback(function (Detail $detail): string {
    return 'new';
});

/**
 * Replace with a group reference format
 */
$replace->withReferences('://$1'); // censor links with group reference format
```

### Example usage of splitting

```php
<?php
use TRegx\CleanRegex\Pattern;

/**
 * Match a vertical pipe or a comma
 */
$pattern = Pattern::of('[|,]');

/**
 * Split all occurrences
 */
$elements = $pattern->split($_GET['input']);

/**
 * Split limited occurrences, from the start
 */
[$first, $second, ...$rest] = $pattern->splitStart($_GET['input'], 2);

/**
 * Split limited occurrences, from end
 */
$elements = $pattern->splitEnd($_GET['input'], 2);
```

### Example of prepared patterns

This example illustrates a pattern that allows us to match string enclosed in double quote `"`
or a backtick `` ` ``, for example `"foo"` or `` `foo` ``, but not ``"foo` `` and not `` `foo"``.

Additionally, we want the word to be anything we want, including data that potentially holds
special regular expression values.

```php
<?php
use TRegx\CleanRegex\Pattern;

$word = "my.word"; // we want the period to be treated literally

/**
 * Inject the value into @ placeholder in the pattern 
 */
$pattern = Pattern::inject('(["`])@\1', [$word]);

$patter->test('content with "my.word"'); // bool (true)
$patter->test('content with "my!word"'); // bool (false)
```

Method `Pattern.test()` returns `true` if, and only if a pattern matches the given subject. In this example,
we can see that despite the dot character used in `"my.word"`, the subject `'content with "my!word"'` isn't matched.

That's because prepared patterns (such as patterns created with `Pattern::inject()`) treat each value literally, 
not as regular expression special characters.

You can read more about prepared patterns in [Handling user input].

### Example of exception handling

Example usage of an incorrect pattern:

```php
<?php
use TRegx\CleanRegex\Pattern;
use TRegx\Exception\MalformedPatternException;

try {
    /**
     * Try and use an incorrect pattern 
     */
    $pattern = Pattern::of('+++++');
    $pattern->test('value');
} catch (MalformedPatternException $malformed) {
    echo "Pattern is incorrect: " . $malformed->getMessage();
}
```

Example handling of backtracking limit:

```php
<?php
use TRegx\CleanRegex\Pattern;
use TRegx\SafeRegex\Exception\CatastrophicBacktrackingException;

$pattern = Pattern::of('(?:1+1+)+3');

try {
    $replace = $pattern->match('11111111111111111111 3')->first();
    $replace = $pattern->replace('11111111111111111111 3')->withGroup('empty');
} catch (CatastrophicBacktrackingException $exception) {
    echo "Failed to match the subject, without exhausting backtracking limit";
}
```

### Code completion with IDE

Because `Pattern` is designed with methods and objects, IDE suggestions can be very helpful when developing applications
with `Pattern`. Proper suggestions from IDE reduce time spent of reading documentations and finding the correct
syntax or notation.

![code completion](../website/static/img/docs/codeCompletion.png)

Similar code completion is available for `Matcher`, `Group` and other parts of T-Regx library.

## Error handling in T-Regx

### Examples of a missing group 

```php
<?php
use TRegx\CleanRegex\Pattern;

/**
 * Pattern with only one capturing group 
 */
$pattern = Pattern::of('(Foo)Bar');

/**
 * Create matcher for a given subject
 */
$matcher = $pattern->match('FooBar');

/**
 * Perform one match on the subject.
 * This calls preg_match() under the hood.
 */
$firstDetail = $matcher->first();

/**
 * Try and read a second group 
 */
try {
    $firstDetail->get(2);
} catch (NonexistentGroupException $exception) {
    echo "There is no such group";
}
```

### Examples of error handling in T-Regx

T-Regx doesn't interfere with userspace in any way. After using `Pattern` or `Matcher` with pattern
or subject which can't be matched because of malformed unicode encoding, or perhaps because of
catastrophic backtracking, a suitable exception will be thrown, but the userspace will be left intact,
so calling `preg_last_error()` won't return errors.

```php
<?php
use TRegx\CleanRegex\Pattern;

/**
 * Pattern in unicode mode, because of modifier 'u'
 */
$pattern = Pattern::of('(Foo)Bar', 'u');

$invalidUnicodeSubject = "\xc3\x28";

try {
    $matcher = $pattern->match($invalidUnicodeSubject)->first();
} catch (SubjectEncodingException $exception) {
    echo "There is a unicode encoding error in the subject";
}

preg_last_error(); // `PREG_NO_ERROR`
```

[`Detail`]: match.mdx
[`preg_match()`]: https://www.php.net/manual/en/function.preg-match.php
[`preg_replace()`]: https://www.php.net/manual/en/function.preg-replace.php
[`preg_split()`]: https://www.php.net/manual/en/function.preg-split.php
[`pattern()`]: introduction.mdx#entry-points
[Handling user input]: prepared-patterns.md
[prepared patterns]: prepared-patterns.md