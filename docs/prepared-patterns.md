---
id: prepared-patterns
title: Prepared Patterns - User input
---

If you use `Pattern::bind()` or `Pattern::inject()`, you can explicitly specify which parts of your pattern 
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

Because:
 - `^https://` must be treated **as a regular expression** 

    > Character `^` must mean "start of the string"
 - `$_GET['domain']` must be treated **as a string** 

    > If there's `.` in the string, it **must not** mean "any character" (like regex would).
    > Any special meaning of regex symbols (like `.`, `?`) must be revoked.
 - `\.(com|net)` must be treated **as a regular expression** 

    > Expression `(com|net)` must be an alteration.

That's a use-case for prepared patterns.

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

## Old-school pattern quoting

Have you chosen to work with regular PCRE functions, your code might look similar to this:

```php
preg_match('/(Pattern|pattern) with ' . preg_quote('quoted parts...', '/') . ' is ugly/');
```

Prepared Patterns address some of this approach flaws. They:

- automatically delimiter your input, so there's no need for specifying the delimiter again in [`preg_quote()`].
- are declarative. Meaning, you only need to _declare_ that you want those values to be treated as string literals.
- fix inconsistency with [`preg_quote()`] returning different values since PHP 7.3

They also add additional functionality, that currently is utterly missing in PHP:

- flag `x` ignores whitespaces, so large expressions can be split to multiple lines. [`preg_quote()`] doesn't quote spaces,
  so user-input spaces are also going to be ignored - Prepared Patterns will however preserve them.

[`preg_quote()`]: https://www.php.net/manual/en/function.preg-quote.php
