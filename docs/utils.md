---
id: utils
title: T-Regx Utilities
---

T-Regx provides some little utility methods that aren't present in PHP:

 - [`Pattern::unquote(string)`](quote.mdx) - unquote a quoted pattern
 - [`pattern()->valid()`](valid.mdx) - safely validate a pattern
 - `GroupName::isValid(mixed)` - checks whether a string is a valid group name
 - `preg::last_error_msg()` - return the last error message in human-readable form

### `Pattern::unquote($s)`

[`Pattern::unquote(string)`](quote.mdx) is simply a reverse function to `Pattern::quote()` and
of course `preg_quote()`/`preg::quote()`.

### `pattern()->valid()`

When using `pattern('\d+')` or `Pattern::of('\d+')`, you can call `valid()`, before calling other methods
to verify whether the pattern used is a valid one or not.

### `GroupName::isValid()`

`GroupName::isValid()` accepts either a group index or a group name, and checks whether
it can be used as a group. In other words, it's the method it can be thought of as a
function validating inputs of [`Detail.group()`](match-groups.md).

`GroupName::isValid()` called with anything of type other than `int` or `string`, 
simply returns `false`.

### `preg::last_error_msg()`

It returns the last error as a human-readable `string`.

```php
@preg_match('/pattern/u', "\xc3\x28");   // Cause an UTF8 error

preg::last_error_msg(); // 'Malformed UTF-8 characters, possibly incorrectly encoded'
```

You never have to use this method, when using `pattern()`/ `Pattern::of()`, `Pattern::pcre()` or even `preg::match()` 
(instead of `\preg_match()`), since every exception thrown will already have a descriptive exception message.

When using vanilla-PHP methods, however (e.g. `\preg_match()`) the last error can be looked up using `preg_last_error()`, 
which returns an error code (`int`) of the error.

| Value | Constant                   |
| ----- | ---------------------------|
| `0`   | `PREG_NO_ERROR`              |
| `1`   | `PREG_BAD_UTF8_ERROR`        |
| `2`   | `PREG_INTERNAL_ERROR`        |
| `3`   | `PREG_BACKTRACK_LIMIT_ERROR` |
| `4`   | `PREG_RECURSION_LIMIT_ERROR` |
| `5`   | `PREG_BAD_UTF8_OFFSET_ERROR` |
| `6`   | `PREG_JIT_STACKLIMIT_ERROR`  |

Integers, however, aren't very readable. That's why there's `preg::lsat_error_msg()`, which returns the last error
in human readable form.
