---
title: What's new, new, new! Part 2
author: Daniel Wilkowski
authorFBID: 100001025937739
---

I've separated the library into `CleanRegex` and `SafeRegex`. The `SafeRegex` is an exact copy of all `preg_*()` methods 
(like `preg_match()`, `preg_replace()`). They're used like this:
 - `preg_match()` -> `preg::match()`
 - `preg_replace()` -> `preg::replace()`

I didn't want to use namespaces (like `\SafeRegex\preg_match`) because that would
mean the programmers reading the code would have to check the imported namespaces **every time** they look at the code. 
With double colon `::` it's obvious. Read on, for more details.

<!--truncate-->

`preg::*()` methods analyse warnings, return types of methods and result of `preg_last_error()`, and if they find that
the pattern or subject failed in some way, they throw an exception, instead of a warning or returning `null`.
I want developers to stop worrying about what **might** cause a bug, when they use regular expressions, and just
focus on the creative part. I want them to *feel*: "This code **has** to work, it would throw an exception otherwise".

And the `CleanRegex` is what it was - the API part, that's using `SafeRegex` never to care about warnings or returning 
`null`/`false`/`[]`/`''`.

That's it for today! :)
