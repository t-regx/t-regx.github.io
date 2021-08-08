---
id: handling-user-input
title: Handling user input
---

Prepared Patterns allow you to confidently use user-input or unsafe data that might contain regular expression special characters. It's also
integrated with [Automatic Delimiters](delimiters.mdx), so they're quoted with regard to the delimiter that was chosen automatically for
you.

You can either use `Pattern::template()` which is a fully-fledged prepared pattern builder, or you can settle
for easy and quick [`Pattern::inject()`](prepared-patterns.md#with-patterninject).

You can read about each of them in the next section, but for now, let's cover the basics.

## Why handling user input is important

Let's say, you would like to search a subject for `"My dog's name is Barky"`, where the dog's name is user input.
Maybe you created a web application which allows anyone to search their dogs.

```php
$input = $_GET['name'];

Pattern::of("(My|Our) dog's name is " . $input . '!');
```

Immediately though, you can see that `$input` may contain [special characters] (like `.`, `?`) that might interfere with your pattern. It also
poses a threat to ReDOS attack, if the unsafe values aren't handled properly. More over, someone might actually try
to be malicious by hand and might want to deliberate break your pattern.

For example, given query param `?name=(Barky!`, this is what the pattern might end up looking:

```php
Pattern::of("(My|Our) dog's name is (Barky!");
```

If, by accident, `$input` had a value of `B(arky` - you would receive an exception `missing ) at offset 31`, but that's
not everything. If you simply try to use malformed patterns, T-Regx throws and exception and you're done.
However, with access to injecting malicious expressions, other, more harmful structures can be added, for example:

- Complex look-aheads and look-arounds (`(?!<`)
- Recursive patterns (`(?R)`)
- Structures prone to catastrophic backtracking

Such harmful structures can realistically pose ReDos attacks treats to your application and your server.

Read on, to learn about proper handling of user input.

## Why not just [`preg_quote()`]

Good question.

The same reason why good programmers use Prepared SQL Statements, instead of `mysql_real_escape_string()`. They allow you to separate
regular expression from unsafe data, which helps with making the pattern safer:

- it's *declarative*, means you only need to *declare* how would you like the data to be used.
- delimiters become an implementation detail - one less thing to worry about.
- Extended mode (e.g. with [`x`] flag, or in-pattern construct) require spaces and whitespaces to also be quoted, which [`preg_quote()`]
  doesn't quote at all!
- [`preg_quote()`] doesn't quote comments in PHP 7.1 and before, in T-Regx this is handled on all PHP versions.

[`preg_quote()`]: https://www.php.net/manual/en/function.preg-quote.php
[`x`]: https://www.php.net/manual/en/reference.pcre.pattern.modifiers.php
[`mysql_real_escape_string()`]: https://stackoverflow.com/questions/41787064/mysql-real-escape-string-not-working-for-me
[special characters]: https://www.php.net/manual/en/reference.pcre.pattern.syntax.php
