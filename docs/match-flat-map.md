---
id: match-flat-map
title: Map with keys (Flat map)
---

There are cases when you would like to create a single list of all your matches. `flatMap()` is great for it.

## Making a flat map

```php
pattern('\w+')->match("I have 19 trains")->flatMap(function (Match $match) {
    return [
        $match->text(), strlen($match)
    ];
});
```
```php
['I', 1, 'have', 2, '19', 2, 'trains', 6]
```

## Return types

`flatMap()` only accepts an `array` as it's return type. Returning a single element and implicitly creating a one-element 
array under the hood would break our ["Explicity rule"](whats-the-point.md#t-regx-to-the-rescue). 

```php
pattern("\w+")->match("I like trains")->flatMap(function (Match $match) {
    return $match;  // <- throws InvalidReturnValueException
});
```

```php
pattern('\w+')->match("I like trains")->flatMap(function (Match $match) {
    return [$match];  // ok
});
```

## Variable callbacks

You can invoke `flatMap()` with any valid PHP `callable` which accepts one string parameter (or no parameters) - just 
like [`first()`](match-first.md) and [`map()`](match-map.md) - and returns `array`.

```php
pattern("[\w']+")->match("I'm 19 years old")->flatMap('str_split');
```
```php
[
  'I', '\'', 'm', '1', '9', 'y', 'e', 'a', 'r', 's', 'o', 'l', 'd'
]
```

The `callable` passed to `flatMap()` must return an array. `InvalidReturnValueException` is thrown, otherwise.

## Mapping with keys

```php
pattern("\w+")->match("Apples are cool")->flatMap(function (Match $match) {
    return [$match->text() => $match->offset()];
});
```
```php
[
    'Apples' => 0,
    'are'    => 7,
    'cool'   => 11
]
```

> Keep in mind that `flatMap()` uses `array_merge()` to flatten the results! So If you use `int` as a key, or even
a `string` with numeric values (like `'19'`) they will be **reindexed** by `array_merge()`.

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
```php
[
    'Apples'  => 0,
    'subject' => "I'm 19 years only",
    'are'     => 7,
    'cool'    => 11
]
```
