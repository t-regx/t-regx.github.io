---
id: count
title: Count occurrences
---

Sometimes, you might stumble upon a situation where an amount of occurrences is needed, but not the occurrences 
themselves. In that case, use `pattern()->count()`:

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
return pattern('[aeiouy]')->count('Computer');
```
<!--PHP-->
```php
return preg::match_all('/[aeiouy]/', 'Computer');
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--Result-Value-->

```php
3
```

Also, `MatchPattern` is [`\Countable`](https://www.php.net/manual/en/class.countable.php), so you can use PHP build-in methods, like `count()`:

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
$match = pattern('[aeiouy]')->match('Computer');

count($match);
```
<!--PHP-->
```php
preg::match_all('/[aeiouy]/', 'Computer', $match);

count($match[0]);
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--T-Regx:{return(last)}-->
<!--PHP:{return(last)}-->
<!--Result-Value-->

```php
3
```

## Unmatched

If your pattern does not match the subject, `count()` simply returns `0`.

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
return pattern('[0-9]')->count('Computer');
```
<!--PHP-->
```php
return preg::match_all('/[0-9]/', 'Computer');
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--Result-Value-->

```php
0
```

## Invalid

Every use of `pattern()` with invalid pattern will cause `CompileSafeRegexException`.

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
try {
    pattern('[aeiouy')->count('Computer');       // malformed pattern
}
catch (CompileSafeRegexException $ex) {
    echo $ex->getMessage();
}
```
<!--PHP-->
```php
try {
    preg::match_all('/[aeiouy/', 'Computer');    // malformed pattern
}
catch (CompileSafeRegexException $ex) {
    echo $ex->getMessage();
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

```text
preg_match_all(): Compilation failed: missing terminating ] for character class at offset 7
 
(caused by E_WARNING)
```

> In `PHP` snippet, `CompileSafeRegexException` is thrown because safe-regex `preg::match_all()` was used, instead
> of `preg_match_all()`. Vanilla PHP `preg_*()` method don't throw exceptions.

## Performance

You might be tempted to use `count()` to check whether your subject was matched by the pattern, since `count()` doesn't
return any matches...

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
$count = pattern('[aeiouy]')->count('Computer');
return $count > 0;
```
<!--PHP-->
```php
$count = preg::match_all('/[aeiouy]/', 'Computer');
return $count > 0;
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--Result-Value-->

```php
true
```

...but that would be wasteful. You're much better off using 
[`test()`](match.md#test-a-subject)/[`fails()`](match.md#test-a-subject):

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
return pattern('[aeiouy]')->test('Computer');
```
<!--PHP-->
```php
return preg::match('/[aeiouy]/', 'Computer') > 0;
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--Result-Value-->

```php
true
```

This is because `count()` will go through each occurrence of a pattern in a subject, counting it; whereas `test()` 
will return right after it finds the first occurrence.

> Under the hood, `count()` uses `preg::match_all()`, whereas `test()`/`fails()`/ use `preg::match()`.
