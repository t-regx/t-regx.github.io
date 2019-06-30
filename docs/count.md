---
id: count
title: Count occurrences
---

Sometimes, you might stumble upon a situation where an amount of occurrences is needed, but not the occurrences 
themselves. In that case, use `pattern()->count()`:

```php
pattern('[aeiouy]')->count('Computer');
```
```php
3
```

You can get the same effect by calling:

```php
pattern('[aeiouy]')->match('Computer')->count();
```
```php
3
```

Also, `MatchPattern` is `\Countable` so you can use PHP build-in methods, like `count()`:

```php
$match = pattern('[aeiouy]')->match('Computer');

count($match);
```
```php
3
```

## Unmatched

If your pattern does not match the subject, `count()` simply returns `0`.

```php
pattern('[0-9]')->count('Computer');
```
```php
0
```

## Invalid

Every use of `pattern()` with invalid pattern will cause `MalformedPatternException`.

```php
try {
    pattern('[aeiouy')->count('Computer');
}
catch (MalformedPatternException $ex) {
    echo $ex->getMessage();
}
```
```text
Missing terminating ] for character class at offset 7
```

## Performance

You might be tempted to use `count()` to check whether your subject was matched by the pattern, since `count()` doesn't
return any matches...
```php
$count = pattern('[aeiouy]')->count('Computer');
return $count > 0
```
```php
true
```

...but that would be wasteful. You're much better off using 
[`test()`](match.md#test-a-subject)/[`fails()`](match.md#test-a-subject):

```php
pattern('[aeiouy]')->test('Computer')
```
```php
true
```

This is because `count()` will go through each occurrence of a pattern in a subject, counting it; whereas `test()` 
will return right after it finds the first occurrence.

> Under the hood, `count()` uses `preg::match_all()`, whereas `test()`/`fails()`/ use `preg::match()`.
