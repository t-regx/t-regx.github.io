---
id: prepared-patterns
title: Prepared Patterns
sidebar_label: Prepared Patterns - User input
---

If you use [`Pattern::prepare()`], [`Pattern::inject()`] or [`Pattern::bind()`], you can explicitly specify which parts of your pattern 
should be treated as string literals, and not as regular expression special characters.

Prepared Patterns also understand that strings, that are supposed to be treated as string literals, are to be 
quoted with a delimiter, that was chosen with [Automatic Delimiters](delimiters.mdx).

## Use-case

When you need to use unsafe data in your patterns, it might be tempting to do something like this:

```php
// build the pattern
$pattern = Pattern::of('^https://' . $_GET['domain'] . '\.(com|net)');

// use the pattern
$pattern->test($string);
```

But you, dear reader, know that it's a terrible, terrible idea. `$_GET['domain']` may contain 
unexpected/malicious regular expression characters.

We need to treat each part of that pattern separately, we must:
 - `^https://` must be treated **as a regular expression**
 - `$_GET['domain']` must be treated **as a string**
 - `\.(com|net)` must be treated **as a regular expression** 

### With `Pattern::prepare()`

`Pattern::prepare()` accepts your pattern as an array. The array can contain either:

- `string` - that will be interpreted as a regular expression
- `array` - that values of which will be treated as string literals

```php
$input = $_GET['input'];

Pattern::prepare(["(My|Our) dog's name is ", [$input], '! I love ', [$input]]);
```

The code above means:

- Treat `"(My|Our) dog's name is "` as a regular expression
- Treat `$input` as a string literal
- Treat `'!'` as a regular expression

### With `Pattern::inject()`

`Pattern::inject()` allows you to specify `@` placeholder in your pattern, which
will later be populated with **safe** version of your parameter.

```php
$pattern = Pattern::inject("https?://@/index\.php", [$_GET['domain']]);

$pattern->test($string);
```

The code above means:

- Treat `https?://` and `/index\.php` as regexp
- Treat `@` as a string literal
- Replace `@` with `$_GET['domain']`, but handling all regexp special characters.

### With `Pattern::bind()`

`Pattern::bind()` is a bit more verbose version of `Pattern::inject()`.

```php
$pattern = Pattern::bind("(My|Our) dog's name is @name! @name is great!", [
    'name' => $_GET['input']
]);

$pattern->test($string);
```

For example, it allows you to reuse your parameters, when they're used more than once in the pattern.

The code above means:

- Treat `$_GET['input']` as a string literal
- Replace `@name` with `$_GET['input']`, but handling all regexp special characters.

## PCRE modifiers

Should there be a need for additional PCRE modifiers (flags), simply pass them as a last argument into prepared patterns.

```php
Pattern::prepare(["(My|Our) dog's name is ", [$input], "!"], 'mS');
```
```php
Pattern::inject("https?://@/index\.php", [$_GET["domain"]], 'mS');
```
```php
Pattern::bind("(My|Our) dog's name is @name!", ["name" => $_GET["input"]], 'mS');
```

## PCRE-styled patterns

Should there be a need for your own delimiters, or you just want to use PCRE style, simply use
`PatternBuilder::builder()->pcre()->` method, instead of `Pattern::` facade:

```php
PatternBuilder::builder()->pcre()->prepare(["/(My|Our) dog's name is ", [$input], "!/m"], 'S');
```
```php
PatternBuilder::builder()->pcre()->inject("/https?://@/index\.php/m", [$_GET["domain"]], 'S');
```
```php
PatternBuilder::builder()->pcre()->bind("/(My|Our) dog's name is @name!/m", ["name" => $name], 'S');
```

## Old-school pattern quoting

Have you chosen to work with regular PCRE functions, your code might look similar to this:

```php
preg_match('/(Pattern|pattern) with ' . preg_quote('quoted parts...', '/') . ' is ugly/');
```

Prepared Patterns address some of this approach flaws. They:

- automatically delimiter your input, so there's no need for specifying the delimiter again in [`preg_quote()`].
- are declarative. Meaning, you only need to _declare_ that you want those values to be treated as string literals.
- fix inconsistency with [`preg_quote()`] quoting different values since PHP 7.3

They also add additional functionality, that currently is utterly missing in PHP:

- Extended mode (enabled e.g. with [`x`] flag) ignores whitespaces, so large expressions can be split to multiple lines. [`preg_quote()`] 
  doesn't quote spaces, so user-input spaces are also going to be ignored - Prepared Patterns will however preserve them.

[`preg_quote()`]: https://www.php.net/manual/en/function.preg-quote.php
[`Pattern::prepare()`]: prepared-patterns.md#with-patternprepare
[`Pattern::inject()`]: prepared-patterns.md#with-patterninject
[`Pattern::bind()`]: prepared-patterns.md#with-patternbind

[`x`]: https://www.php.net/manual/en/reference.pcre.pattern.modifiers.php
