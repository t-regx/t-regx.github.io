---
id: pattern-building
title: Pattern building API
---

## Old-school pattern quoting

Have you chosen to work with regular PCRE functions, your code might look similar to this:

```php
preg_match('/(Pattern|pattern) with ' . preg_quote('quoted parts...', '/') . ' is ugly/');
```

Pattern builders address some of this approach flaws. They:

 - automatically delimiter your input, so there's no need for specifying `/` delimiter again in `preg_quote()`.
 - are declarative. Meaning, you only need to *declare* that you want those values to be treated as string literals.
 - fix inconsistency with `preg_quote()` returning different values since PHP 7.3

## Using pattern building

If you use `Pattern::prepare()` or `Pattern::inject()`, you can explicitly specify which parts of your pattern should be 
treated as string literals, and not as regular expression special characters.

Pattern builders also understand that strings that are supposed to be treated as string literals are to be quoted with a 
delimiter, that was chosen with [Automatic Delimiters](delimiters.md).

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
 - `$input` is assigned to `name`, so find `@name` in the pattern
 - Replace `@name` with `$input`, but handling all regexp special characters.
