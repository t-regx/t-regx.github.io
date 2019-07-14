---
id: replace-by-group
title: Replace by group
---

Method `replace()->by()->group()` can be used when you would just like to replace a whole match by one of its capturing group,
optionally handling what should happen when a group is not matched.

> Of course, `NonexistentGroupException` is thrown when `by()->group()` is used with a non-existent group. Likewise, 
> `\InvalidArgumentException` is thrown for a malformed group, e.g. `-2` or `"2name"`.

For example, you would only like to take the domain name from a link:
<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
$links = 'Links: www.google.com, http://socket.io, facebook.com, https://t-regx.com';

echo pattern('(https?://)?(www\.)?(?<domain>[\w-]+)\.(com|io)')
    ->replace($links)
    ->all()
    ->by()
    ->group('domain')
    ->orThrow(MyCustomException::class);
```
<!--PHP-->
```php
$links = 'Links: www.google.com, http://socket.io, facebook.com, https://t-regx.com';

echo preg::replace_callback('#(https?://)?(www\.)?(?<domain>[\w-]+)\.(com|io)#', function ($match) {
    if (!array_key_exists('domain', $match)) {
        // group is either un-matched or non-existent
        if (validateGroupExists('domain', $match)) {
            throw new MyCustomException();
        } else {
            throw new NonexistentGroupException('domain');
        }
    }
    if ($match['domain'] === '') {
        // group is either un-matched or matched an empty string
        if (!validateGroupMatched('domain', $match)) {
            throw new MyCustomException();
        }
    }
    return $match['domain'];
}, $links);
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--Result-Output-->

```text
Links: google, socket, facebook, t-regx
```

What happens when replacing with an unmatched group? There is a number of ways of reacting to unmatched groups:
 - `orIgnore()` - leaves the match unchanged
 - `orEmpty()` - matched occurrence is replaced with an empty string
 - `orReturn(string)` - match is replaced with the given argument 
 - `orElse(callable)` - uses a callback with [`Match`](match-details.md) argument, in order to evaluate a replacement
 - `orThrow()` - throws a default or a custom exception (just like [forFirst()->orThrow()](match-for-first.md))

> `orEmpty()` is the most performance-light method, because it uses `preg_replace()`, whereas `orReturn()`, `orIgnore()`, 
> `orElse()` and `orThrow()` use `preg_replace_callback()`.
