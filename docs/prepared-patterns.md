---
id: prepared-patterns
title: Prepared Patterns - User input
---

## Using prepared patterns

If you use `Pattern::prepare()` or `Pattern::inject()`, you can explicitly specify which parts of your pattern should be
treated as string literals, and not as regular expression special characters.

Prepared Patterns also understand that strings that are supposed to be treated as string literals are to be quoted with a
delimiter, that was chosen with [Automatic Delimiters](delimiters.mdx).

### With `Pattern::prepare()`

`Pattern::prepare()` accepts your pattern as an array. Said array can contain either:

- `string` - that will be interpreted as a regular expression
- `array` - that values of which will be treated as string literals

```php
$input = $_GET['input'];

Pattern::prepare(["(My|Our) dog's name is ", [$input], '!']);
```

The code above means:

- Treat `"(My|Our) dog's name is "` as a regular expression
- Treat `$input` as a string literal
- Treat `'!'` as a regular expression

### With `Pattern::inject()`

For a bit cleaner pattern, consider using `Pattern::inject()`.

It replaces a **placeholder** in the pattern with values treated as string literals.

```php
$input = $_GET['input'];

Pattern::inject("(My|Our) dog's name is @name!", [
    'name' => $input
]);
```

The code above means:

- Treat `$input` as a string literal
- Replace `@name` with `$input`, but handling all regexp special characters.

### Usage

And that's it! Prepared patterns are exactly alike to regular `pattern()`/`Pattern::of()`. Below snippets are identical:

```php
Pattern::prepare(["(My|Our) dog's name is ", [$input], '!'])->match($subject)->first();
```

```php
Pattern::of("(My|Our) dog's name is Barky!")->match($subject)->first();
```

except for the fact that `$input` can be user-input, guaranteed to be safe.

## Old-school pattern quoting

Have you chosen to work with regular PCRE functions, your code might look similar to this:

```php
preg_match('/(Pattern|pattern) with ' . preg_quote('quoted parts...', '/') . ' is ugly/');
```

Prepared Patterns address some of this approach flaws. They:

- automatically delimiter your input, so there's no need for specifying `/` delimiter again in [`preg_quote()`].
- are declarative. Meaning, you only need to _declare_ that you want those values to be treated as string literals.
- fix inconsistency with [`preg_quote()`] returning different values since PHP 7.3

They also add additional functionality, that currently is utterly missing in PHP:

- un-quoting values inside `\Q` and `\E`, which indicate quote in PHP regular expressions.
- flag `x` ignores whitespaces, so large expressions can be split to multiple lines. [`preg_quote()`] doesn't quote spaces,
  so user-input spaces are also going to be ignored - Prepared Patterns will however preserve them.

This is done to relieve you from the [**brain strain**](overview.mdx#brain-strain).

Basically,

- [`preg_quote()`] is procedural - you take care of everything by yourself
- Prepared Patterns are declarative - we take care of everything **for** you

[`preg_quote()`]: https://www.php.net/manual/en/function.preg-quote.php
