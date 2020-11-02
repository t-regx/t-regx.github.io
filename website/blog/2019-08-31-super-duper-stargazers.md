---
title: The best Stargazers' Revolutions
author: Daniel Wilkowski
authorFBID: 100001025937739
---

[I have imagined this moment for a long time. Is it real?](/t-rix) Could it be T-Regx got **60** stars ? :D

But, what's new?

There is [`preg_grep()`] function for filtering an array by a pattern, unfortunately there's no flag or another 
method to filter it by keys (there is a T-Regx method [`forArray()->filterByKeys()`](/docs/filter#filter-by-keys), 
but there was no such solution in SafeRegex).

That's why we added `preg::grep_keys()`, which works exactly like [`preg_grep()`] but filters an array by keys, 
instead of values. It's going to be released in 0.9.2. 

[List of all changes incoming in 0.9.2 is available in ChangeLog.md][2], with `fluent()`, `unique()`, in-place 
replacements and more.

[`preg_grep()`]: https://www.php.net/manual/en/function.preg-grep.php
[2]: https://github.com/T-Regx/T-Regx/blob/develop/ChangeLog.md#incoming-in-092
