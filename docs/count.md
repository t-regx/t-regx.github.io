---
id: count
title: Count occurrences
---

Sometimes, you might stumble upon a situation where an amount of occurrences is needed, but not the occurrences
themselves. In that case, use `pattern()->count()`:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
defaultValue="T-Regx"
values={[
{ label: 'T-Regx', value: 'T-Regx', },
{ label: 'PHP', value: 'PHP', },
]
}>
<TabItem value="T-Regx">

```php
return pattern('[aeiouy]')->count('Computer');
```

</TabItem>
<TabItem value="PHP">

```php
return preg::match_all('/[aeiouy]/', 'Computer');
```

</TabItem>
</Tabs>

<!--Result-Value-->

```php
3
```

Also, `MatchPattern` is [`\Countable`](https://www.php.net/manual/en/class.countable.php), so you can use PHP build-in methods, like `count()`:

<Tabs
defaultValue="T-Regx"
values={[
{ label: 'T-Regx', value: 'T-Regx', },
{ label: 'PHP', value: 'PHP', },
]
}>
<TabItem value="T-Regx">

```php
$match = pattern('[aeiouy]')->match('Computer');

count($match);
```

</TabItem>
<TabItem value="PHP">

```php
preg::match_all('/[aeiouy]/', 'Computer', $match);

count($match[0]);
```

</TabItem>
</Tabs>

<!--T-Regx:{return-at(last)}-->
<!--PHP:{return-at(last)}-->
<!--Result-Value-->

```php
3
```

## Unmatched

If your pattern does not match the subject, `count()` simply returns `0`.

<Tabs
defaultValue="T-Regx"
values={[
{ label: 'T-Regx', value: 'T-Regx', },
{ label: 'PHP', value: 'PHP', },
]
}>
<TabItem value="T-Regx">

```php
return pattern('[0-9]')->count('Computer');
```

</TabItem>
<TabItem value="PHP">

```php
return preg::match_all('/[0-9]/', 'Computer');
```

</TabItem>
</Tabs>

<!--Result-Value-->

```php
0
```

## Invalid

Every use of `pattern()` with invalid pattern will cause `CompileSafeRegexException`.

<Tabs
defaultValue="T-Regx"
values={[
{ label: 'T-Regx', value: 'T-Regx', },
{ label: 'PHP', value: 'PHP', },
]
}>
<TabItem value="T-Regx">

```php
try {
    pattern('[aeiouy')->count('Computer');       // malformed pattern
}
catch (CompileSafeRegexException $ex) {
    echo $ex->getMessage();
}
```

</TabItem>
<TabItem value="PHP">

```php
try {
    preg::match_all('/[aeiouy/', 'Computer');    // malformed pattern
}
catch (CompileSafeRegexException $ex) {
    echo $ex->getMessage();
}
```

</TabItem>
</Tabs>

```text
preg_match_all(): Compilation failed: missing terminating ] for character class at offset 7
```

(caused by E_WARNING)

> In `PHP` snippet, `CompileSafeRegexException` is thrown because safe-regex `preg::match_all()` was used, instead
> of `preg_match_all()`. Vanilla PHP `preg_*()` method don't throw exceptions.

## Performance

You might be tempted to use `count()` to check whether your subject was matched by the pattern, since `count()` doesn't
return any matches...

<Tabs
defaultValue="T-Regx"
values={[
{ label: 'T-Regx', value: 'T-Regx', },
{ label: 'PHP', value: 'PHP', },
]
}>
<TabItem value="T-Regx">

```php
$count = pattern('[aeiouy]')->count('Computer');
return $count > 0;
```

</TabItem>
<TabItem value="PHP">

```php
$count = preg::match_all('/[aeiouy]/', 'Computer');
return $count > 0;
```

</TabItem>
</Tabs>

<!--Result-Value-->

```php
true
```

...but that would be wasteful. You're much better off using
[`test()`](match.md#test-a-subject)/[`fails()`](match.md#test-a-subject):

<Tabs
defaultValue="T-Regx"
values={[
{ label: 'T-Regx', value: 'T-Regx', },
{ label: 'PHP', value: 'PHP', },
]
}>
<TabItem value="T-Regx">

```php
return pattern('[aeiouy]')->test('Computer');
```

</TabItem>
<TabItem value="PHP">

```php
return preg::match('/[aeiouy]/', 'Computer') > 0;
```

</TabItem>
</Tabs>

<!--Result-Value-->

```php
true
```

This is because `count()` will go through each occurrence of a pattern in a subject, counting it; whereas `test()`
will return right after it finds the first occurrence.

> Under the hood, `count()` uses `preg::match_all()`, whereas `test()`/`fails()`/ use `preg::match()`.
