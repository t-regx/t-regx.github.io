---
id: match-map
title: Map
---

Mapping matches works a bit like a combination of `all()` and `forEach()`. It returns all matched elements, after they've
been iterated using `map()` callback (which accepts `Match` details).

## Map matched occurrences

So instead of returning all elements:

```php
pattern("[0-9A-Za-z']+")->match("I'm 19 years old")->all();
```
```
["I'm", "19", "years", "old"]
```

...you can map them - to any other value:

```php
pattern('[0-9]+')->match("I'm 19 years old")->map(function (Match $m) {
    return strlen($m->text());
});
```
```
[3, 2, 5, 3]
```

## Variable callbacks

You can invoke `map()` with any valid PHP `callable` which accepts one string parameter (or no parameters) - just 
like [`first()`](match-first.md).

```php
pattern('[0-9]+')->match("I'm 19 years old")->map('strtoupper');
```
```
["I'M", "19", "YEARS", "OLD"]
```

## Arbitrary return types

Again, just like [`first()`](match-first.md), this method allows for any return type, including: objects, arrays, 
booleans and `null`.

```php
pattern('[0-9]+')->match("I'm 19 years old")->map('str_split');
```
```
[
  ['I', '\'', 'M'], 
  ['1', '9'], 
  ['Y', 'E', 'A', 'R', 'S'], 
  ['O', 'L', 'D']
]
```

## `flatMap()`

You can just as easily create a flattened map.

```php
pattern('[0-9]+')->match("I'm 19 years old")->flatMap('str_split');
```
```
[
  'I', '\'', 'M', '1', '9', 'Y', 'E', 'A', 'R', 'S', 'O', 'L', 'D'
]
```

Read more about [`flatMap()`](match-flat-map.md) on the next page.
