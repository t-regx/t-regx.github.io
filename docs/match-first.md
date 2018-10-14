---
id: match-first
title: First occurrence
---

Matching a first occurrence in a string is the most common usecase.

```php
pattern('[0-9]+')->match("I'm 19 years old")->first();
```

If a match is not found in a subject, `SubjectNotMatchedException` is thrown. This is done to relieve you of 
[**brain strain**](overview.md#brain-strain). It's much easier to develop an application and *just assume* that this method **has** to return
a value and go on. No more bothering  with empty arrays or possible `null`/`false` hiding somewhere.

If you would like to control what should be done if the subject isn't matched by your pattern though, 
you can do it **explicitly** with [`forFirst()`](#forfirst).

## Match details

With `Match` details, you can gain access to useful information about the matched occurrence.

### Matched text

In this example we'll print the matched text to the standard output.

```php
pattern('\w+')->match("Apples are cool")->first(function (Match $match) {
    echo $match->text();
});
```

You can also cast `Match` to string with the same effect.

```php
pattern('\w+')->match("Apples are cool")->first(function (Match $match) {
    echo (string) $match;
});
```

### Return value

It's also possible to return your custom value from within `first()` callback. This custom value will be then returned 
from `first()` function.

```php
$value = pattern('\w+')->match("Apples are cool")->first(function (Match $match) {
    return [
        $match->text(), 
        $match->text(),
        $match->text()
    ];
});

$value // ['Apples', 'Apples', 'Apples']
```

### Variable callbacks

You can call `first()` for any valid PHP `callable` which accepts one string parameter (or no parameters).

```php
return pattern('\w+')->match("Apples are cool")->first('strtoupper');
```
```bash
APPLES
```

Of course `strtoupper` (or any other callback) is only invoked **if** your subject matches the pattern.

### Arbitrary return types

From within `first()` callback, you can return any value, including: objects, arrays, booleans and `null`.

```php
return pattern('\w+')->match("Apples are cool")->first('str_split');
```
```bash
['A', 'p', 'p', 'l', 'e', 's']
```

### Groups in match

## Inline groups

## `forFirst()`

This method allows you to explicitly specify how to handle an unmatched subject. Just chain `forFirst()` with
one of the following `orReturn()`, `orElse` or `orThrow()`.

```php
$func = function () {
    return 'Yay';
};

echo pattern('\w+')->match('Dog')->forFirst($func)->orReturn('Aw, man :/');
```
```bash
Yay
```

Read on to learn more about [`forFirst()`](match-for-first.md)
