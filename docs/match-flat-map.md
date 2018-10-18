---
id: match-flat-map
title: Map with keys (Flat map)
---

There are cases when you would like to create a single list of all your matches. `flatMap()` is great for it.

## Making a flat map

```php
pattern('[0-9]+')->match("I'm 19 years old")->flatMap(function (Match $match) {
    return [
        $match->text(), strlen($match)
    ];
});
```
```
[ "I'm", 3, "19", 2, "years", 5, "old", 3 ]
```

## Return types

`flatMap()` only accepts an `array` as it's return type. Returning a single element and implicitly creating a 
one-element array under the hood would break our "Explicity rule".

```php
pattern('[0-9]+')->match("I'm 19 years old")->flatMap(function (Match $match) {
    return $match;  // <- throws InvalidReturnValueException
});
```

```php
pattern('[0-9]+')->match("I'm 19 years old")->flatMap(function (Match $match) {
    return [$match];  // ok
});
```

## Variable callbacks

You can invoke `flatMap()` with any valid PHP `callable` which accepts one string parameter (or no parameters) - just 
like [`first()`](match-first.md) and [`map()`](match-map.md).

```php
pattern('[0-9]+')->match("I'm 19 years old")->flatMap('str_split');
```
```
[
  'I', '\'', 'M', '1', '9', 'Y', 'E', 'A', 'R', 'S', 'O', 'L', 'D'
]
```

## Mapping with keys

```php
pattern("\w+")->match("Apples are cool")->flatMap(function (Match $match) {
    return [$match->text() => $match->offset()];
});
```
```bash
[
    Apples  => 0,
    are     => 7,
    cool    => 11
]
```

> Keep in mind that `flatMap()` uses `array_merge()` to flatten the results! So If you use `int` keys, or even
`string` keys with numeric values (like `'19'`) they will be **reindexed** by `array_merge()`.
 
 
## Duplicate keys

Duplicate keys are not allowed in PHP arrays, so they'll only appear once in the results.

```php
pattern("\w+")->match("Apples are cool")->flatMap(function (Match $match) {
    return [
        $match->text() => $match->offset(),
        'subject'      => $match->subject()
    ];
});
```
```bash
[
    Apples  => 0,
    subject => "I'm 19 years only",
    are     => 7,
    cool    => 11
]
```
