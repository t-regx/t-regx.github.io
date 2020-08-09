---
id: handling-user-input
title: Handling user input
---

Prepared Patterns allow you to confidently use user-input or unsafe data that might contain regular expression special
characters. It's also integrated with [Automatic Delimiters](delimiters.mdx), so they're quoted with regard to the delimiter
that was chosen automatically for you.

There are two entry points for prepared patterns:

- [`Pattern::prepare()`](prepared-patterns.md#with-pattern-prepare)
- [`Pattern::inject()`](prepared-patterns.md#with-pattern-inject)

You can read about each of them in the next section, but for now, let's cover the basics.

## Why handling user input is important

Let's say, you would like to search a subject for `My dog's name is Barky`, where the dog's name is user input.

```php
$input = $_GET['name'];

Pattern::of("(My|Our) dog's name is " . $input . '!');
```

Immediately though, you can see that `$input` can contain regexp special characters and mess with your pattern.

If, by accident, `$input` had a value of `B(arky` - you would receive an exception `missing ) at offset 31`

```php
Pattern::of("(My|Our) dog's name is (Barky!");
```

They need to be escaped!

Read on, to learn about proper handling of user input.

## Why not just `preg_quote()`

Good question.

The same reason why good programmers use Prepared SQL Statements, instead of `mysql_real_escape_string()`.
They allow you to separate regular expression from unsafe data, which helps with making the pattern safer:

- delimiters become an implementation detail, about which programmer doesn't have to care
- some flags (e.g. `x`) require spaces and whitespaces to also be quoted, which [`preg_quote()`] doesn't quote
- inside comments (`\Q` and `\E`), values shouldn't be quoted! This would cause double quotation, which [`preg_quote()`] does
  _(kinda how `>` becomes `&amp;gt;` when double quoted)_.
- [`preg_quote()`] doesn't quote comments before PHP 7.1.3

[`preg_quote()`]: https://www.php.net/manual/en/function.preg-quote.php
