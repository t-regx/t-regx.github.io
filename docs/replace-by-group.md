---
id: replace-by-group
title: Replace by group
---

Method `replace()->by()->group()` can be used when you would just like to replace a whole match by one of its capturing group,
optionally handling what should happen when a group is not matched.

> Of course, `NonExistentGroupException` is thrown when `by()->group()` is used with a non-existent group. Likewise, 
> `\InvalidArgumentException` is thrown for a malformed group, e.g. `-2` or `"2name"`.

For example, you would only like to take the domain name from a link:

```php
<?php
$links = 'Links: www.google.com, http://socket.io, facebook.com, https://t-regx.com';

pattern('(https?://)?(www\.)?(?<domain>[\w-]+)\.(com|io)')
    ->replace($links)
    ->all()
    ->by()
    ->group('domain')
    ->orThrow();
```
```text
Links: google, socket, facebook, t-regx
```

There is a number of ways of reacting to unmatched groups.

What happens when replacing with an unmatched group:
 - `orIgnore()` - leaves the match unchanged
 - `orEmpty()` - match is replaced with an empty string
 - `orReturn(string)` - match is replaced with the given argument 
 - `orElse(callable)` - uses a callback with [`Match`](match-details.md) argument, in order to evaluate a replacement
 - `orThrow()` - throws a default or a custom exception (just like [forFirst()](match-for-first.md))

> `orEmpty()` is the most performance-light method, because it uses `preg_replace()`, whereas `orReturn()`, `orIgnore()`, 
> `orElse()` and `orThrow()` use `preg_replace_callback()`.
