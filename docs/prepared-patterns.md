---
id: prepared-patterns
title: Prepared Patterns
sidebar_label: Prepared Patterns - User input
---

If you use [`Pattern::inject()`] or `Pattern::template()`, you can explicitly specify which parts of your pattern 
should be treated as string literals, not as regular expression special characters.

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

### With `Pattern::inject()`

`Pattern::inject()` allows you to specify `@` placeholder in your pattern, in which
your value will be **safely** injected.

```php
$pattern = Pattern::inject("https?://@/index\.php", [$_GET['domain']]);

$pattern->test($string);
```

The code above means:

- Treat `https?://` and `/index\.php` as regexp
- Replace `@` with `$_GET['domain']`, but handling all regexp special characters.

## PCRE modifiers

Should there be a need for additional PCRE modifiers (flags), simply pass them as a last argument into prepared patterns.

```php
Pattern::inject("https?://@/index\.php", [$_GET["domain"]], 'mS');
```

## PCRE-styled patterns

Should there be a need for your own delimiters, or you just want to use PCRE style, simply use
`PcrePattern::`, instead of `Pattern::`:

```php
PcrePattern::inject("/https?://@/index\.php/m", [$_GET["domain"]], 'S');
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

# What about special cases

T-Regx prepared patterns understand that sometimes `"@"` placeholder shouldn't be treated as a placeholder, even
when using [`Pattern::inject()`]/`Pattern::template()`. These cases are:

- Character class: `\w+:[0-9@]`
- Perl quote: `\w+:\Q@\E`
- Control character: `\w+:\c@`
- Comment (when `x` flag is used): `\w+:#@\n`

When `@` appears in one of those fragments, it won't be treated as a placeholder, and values won't be injected into it.

[`preg_quote()`]: https://www.php.net/manual/en/function.preg-quote.php
[`Pattern::inject()`]: prepared-patterns.md#with-patterninject

[`x`]: https://www.php.net/manual/en/reference.pcre.pattern.modifiers.php
