---
id: match-first
title: First occurrence
---

Matching a first occurrence in a string is the most common use-case.

## Return from `first()`

```php
pattern('[0-9]+')->match("I'm 19 years old")->first();
```

If a match is not found in a subject, `SubjectNotMatchedException` is thrown. This is done to relieve you from the 
[**brain strain**](overview.md#brain-strain). It's much easier to develop an application and *just assume* that this 
method **has** to return a value and go on. No more bothers  about empty arrays or a possible `null`/`false` hiding somewhere.

If you would like to control what should be done if the subject isn't matched with your pattern though; 
you can do it **explicitly** with [`forFirst()`](#forfirst).

## Use `first()` with callback

You can call an anonymous function for the first matched occurrence. In this example, we'll print the matched text to the 
standard output.

```php
pattern('\w+')->match("Apples are cool")->first(function (string $match) {
    echo $match;
});
```

### Match details

With `Match` details, you can gain access to useful information about the matched occurrence. 

```php
pattern('\w+')->match("Apples are cool")->first(function (Match $match) {
    echo $match->text();
    echo (string) $match;
});
```

> Casting `Match` to a string is the same as calling a `text()` method.

### Groups in match

Retrieving capturing groups from a match is really simple.

```php
pattern('(?<capital>[A-Z])[a-z]+')->match('hello there, General Kenobi')->first(Match $match) {
    $capital = $match->group('capital')->text();
    $capital = (string) $match->group('capital');
    
    return $capital;
});
```
```bash
'G'
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

Of course, `strtoupper` (or any other callback) is only invoked **if** your subject is matched with the pattern.

### Arbitrary return types

From within `first()` callback, you can return any value, including: objects, arrays, booleans and `null`.

```php
return pattern('\w+')->match("Apples are cool")->first('str_split');
```
```bash
['A', 'p', 'p', 'l', 'e', 's']
```

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
