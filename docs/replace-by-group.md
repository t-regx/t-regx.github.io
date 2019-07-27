---
id: replace-by-group
title: Replace by group
---

Method `replace()->by()->group()` can be used when you would just like to replace a whole match by one of its capturing group,
optionally handling what should happen when a group is not matched.

This is, in fact, a shorthand for a rather common use of `callback()` replacing with a capturing group.

## Overview

There are several URL addresses in `$links` variable. Given a regular expression matching a URL, with a group 
capturing the URL domain, you can easily leave off only the domain in the matched links:

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
$links = 'My links are: www.google.com, http://socket.io, facebook.com, https://t-regx.com :)';

pattern('(https?://)?(www\.)?(?<domain>[\w-]+)\.(com|io)')
    ->replace($links)
    ->all()
    ->by()
    ->group('domain')
    ->orThrow();
```
<!--PHP-->
```php
$links = 'My links are: www.google.com, http://socket.io, facebook.com, https://t-regx.com :)';

return preg::replace_callback('#(https?://)?(www\.)?(?<domain>[\w-]+)\.(com|io)#', function ($match) {
    // This code is just a simplification.
    // The PHP equivalent is actually a bit more complicated. Please, see the PHP snippets below

    return $match['domain'];
}, $links);
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--T-Regx:{return-at(2)}-->
<!--Result-Value-->

```php
'My links are: google, socket, facebook, t-regx :)'
```

Each matched link was replaced with `'domain'` capturing group. In this case, `'domain'` capturing group is not an
optional group (it's always going to be matched, when the whole pattern is matched), so the matched occurrence is 
always going to be replaced with it.

> Of course, `NonexistentGroupException` is thrown when `by()->group()` is used with a non-existent group. Likewise, 
> `\InvalidArgumentException` is thrown for a malformed group, e.g. `-2` or `"2name"`.

## Unmatched group

How do you handle unmatched/optional groups?
 
For example, a group `(?<name>\w+)?` is optional. For an occurrence with the optional `'name'` group that happened not 
to be matched,  you can chose either to ignore it (just don't replace the match), replace with a default or an empty 
string, or call a producer to return what should the match be replaced with.

You can also chose to throw an exception, if the unmatched group is not supposed to be optional, to ensure integrity.

 - `orIgnore()` - leaves the match unchanged
 - `orEmpty()` - matched occurrence is replaced with an empty string
 - `orReturn(string)` - match is replaced with the given argument 
 - `orElse(callable)` - uses a callback with [`Match`](match-details.md) argument, in order to evaluate a replacement
 - `orThrow()` - throws a default or a custom exception (just like [forFirst()->orThrow()](match-for-first.md))

> `orEmpty()` is the most performance-light method, because it uses `preg_replace()`, whereas `orReturn()`, `orIgnore()`, 
> `orElse()` and `orThrow()` use `preg_replace_callback()`.

---

Now, for the sake of this example, let's say a domain is an optional part of an URL address. Below, you'll find 4 
code snippets illustrating the usage of each of those:

### `orIgnore()`

Matched links with matched `'domain'` group are replaced with it. Links without matched optional groups, however, 
are simply left as they were (ignored):

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
$links = 'My links are: www.google.com, http://.io, facebook.com, https://.com :)';

pattern('(https?://)?(www\.)?(?<domain>[\w-]+)?\.(com|io)')->replace($links)
    ->all()
    ->by()->group('domain')->orIgnore();
```
<!--PHP-->
```php
$links = 'My links are: www.google.com, http://.io, facebook.com, https://.com :)';

return preg::replace_callback('#(https?://)?(www\.)?(?<domain>[\w-]+)?\.(com|io)#', function ($match) {
    validateGroupName('domain');
    if (!array_key_exists('domain', $match)) {
        // group is either un-matched or non-existent
        if (validateGroupExists('domain', $match)) {
            return $match[0];
        } else {
            throw new NonexistentGroupException('domain');
        }
    }
    if ($match['domain'] === '') {
        // group is either un-matched or matched an empty string
        if (!validateGroupMatched('domain', $match)) {
            return $match[0];
        }
    }
    return $match['domain'];
}, $links);
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--T-Regx:{return-at(2)}-->
<!--Result-Value-->

```php
'My links are: google, http://.io, facebook, https://.com :)'
```

### `orEmpty()`

Matched links with matched `'domain'` group are replaced with it. Links without matched optional groups, however, 
are replaced with an empty string:

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
$links = 'My links are: www.google.com, http://.io, facebook.com, https://.com :)';

pattern('(https?://)?(www\.)?(?<domain>[\w-]+)?\.(com|io)')->replace($links)
    ->all()
    ->by()->group('domain')->orEmpty();
```
<!--PHP-->
```php
$links = 'My links are: www.google.com, http://.io, facebook.com, https://.com :)';

return preg::replace_callback('#(https?://)?(www\.)?(?<domain>[\w-]+)?\.(com|io)#', function ($match) {
    validateGroupName('domain');
    if (!array_key_exists('domain', $match)) {
        // group is either un-matched or non-existent
        if (validateGroupExists('domain', $match)) {
            return '';
        } else {
            throw new NonexistentGroupException('domain');
        }
    }
    // Check between unmatched and matched-empty is unnecessary
    return $match['domain'];
}, $links);
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--T-Regx:{return-at(2)}-->
<!--Result-Value-->

```php
'My links are: google, , facebook,  :)'
```

### `orReturn(string)`

Matched links with matched `'domain'` group are replaced with it. Links without matched optional groups, however, 
are replaced with a given parameter string:

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
$links = 'My links are: www.google.com, http://.io, facebook.com, https://.com :)';

pattern('(https?://)?(www\.)?(?<domain>[\w-]+)?\.(com|io)')->replace($links)
    ->all()
    ->by()->group('domain')->orReturn('UNKNOWN');
```
<!--PHP-->
```php
$links = 'My links are: www.google.com, http://.io, facebook.com, https://.com :)';

return preg::replace_callback('#(https?://)?(www\.)?(?<domain>[\w-]+)?\.(com|io)#', function ($match) {
    validateGroupName('domain');
    if (!array_key_exists('domain', $match)) {
        // group is either un-matched or non-existent
        if (validateGroupExists('domain', $match)) {
            return 'UNKNOWN';
        } else {
            throw new NonexistentGroupException('domain');
        }
    }
    if ($match['domain'] === '') {
        // group is either un-matched or matched an empty string
        if (!validateGroupMatched('domain', $match)) {
            return 'UNKNOWN';
        }
    }
    return $match['domain'];
}, $links);
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--T-Regx:{return-at(2)}-->
<!--Result-Value-->

```php
'My links are: google, UNKNOWN, facebook, UNKNOWN :)'
```

### `orElse(callable)`

Matched links with matched `'domain'` group are replaced with it. Links without matched optional groups, however, 
are then passed to the producer, which result is then replaced in place of the link:

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
$links = 'My links are: www.google.com, http://.io, facebook.com, https://.com :)';

pattern('(https?://)?(www\.)?(?<domain>[\w-]+)?\.(com|io)')->replace($links)
    ->all()
    ->by()->group('domain')->orElse(function (Match $match) {
        return "Not found **$match**";
    });
```
<!--PHP-->
```php
$links = 'My links are: www.google.com, http://.io, facebook.com, https://.com :)';

$producer = function (array $match) {
    return "Not found **{$match[0]}**";
};

return preg::replace_callback('#(https?://)?(www\.)?(?<domain>[\w-]+)?\.(com|io)#', function ($match) use ($producer) {
    validateGroupName('domain');
    if (!array_key_exists('domain', $match)) {
        // group is either un-matched or non-existent
        if (validateGroupExists('domain', $match)) {
            return $producer($match);
        } else {
            throw new NonexistentGroupException('domain');
        }
    }
    if ($match['domain'] === '') {
        // group is either un-matched or matched an empty string
        if (!validateGroupMatched('domain', $match)) {
            return $producer($match);
        }
    }
    return $match['domain'];
}, $links);
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--T-Regx:{return-at(2)}-->
<!--Result-Value-->

```php
'My links are: google, Not found **http://.io**, facebook, Not found **https://.com** :)'
```

### `orThrow()`

You can either call this method without parameters, or with your custom exception class name (just like [`forFirst()`](match-for-first.md) parameter):

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
$links = 'My links are: www.google.com, http://socket.io, facebook.com, https://t-regx.com :)';

pattern('(https?://)?(www\.)?(?<domain>[\w-]+)?\.(com|io)')->replace($links)
    ->all()
    ->by()->group('domain')->orThrow(MyCustomException::class);
```
<!--PHP-->
```php
$links = 'My links are: www.google.com, http://socket.io, facebook.com, https://t-regx.com :)';

return preg::replace_callback('#(https?://)?(www\.)?(?<domain>[\w-]+)?\.(com|io)#', function ($match) {
    validateGroupName('domain');
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
<!--T-Regx:{return-at(2)}-->
<!--Result-Value-->

```php
'My links are: google, socket, facebook, t-regx :)'
```

Of course, for subject `$links` equal to `'My links are: www..com'` (optional group `'domain'` is unmatched) - `MyCustomException` would be thrown.

## Identity

As mentioned, `replace()->by()->group()` is just a short-hand for `replace()->callback()`. 

The below `by()->group()` code:

```php
pattern('(https?://)?(www\.)?(?<domain>[\w-]+)\.(com|io)')->replace($links)
    ->all()
    ->by()->group('domain')->orXXX();
```

is identical to:

```php
pattern('(https?://)?(www\.)?(?<domain>[\w-]+)\.(com|io)')->replace($links)
    ->all()
    ->callback(function (Match $match) {
        return $match->group('domain')->orXXX();
    });
```
