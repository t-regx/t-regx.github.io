---
id: match-map
title: Map occurrences
---

Mapping works a bit like a combination of [`all()`](match.md#many) and [`forEach()`](match-for-each.md). It returns all 
matched elements, after they have been iterated (and potentially altered) using `map()` callback 
(which accepts [`Match`](match-details.md) details).

## Map matched occurrences

So instead of returning all elements:
<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
pattern("[\w']+")->match("I'm 19 years old")->all();
```
<!--PHP-->
```php
preg::match_all("/[\w']+/", "I'm 19 years old", $matches);
return $matches[0];
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--T-Regx:{return(0)}-->
<!--Result-Value-->

```php
["I'm", '19', 'years', 'old']
```

...you can map them - to any other value, by callback:

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
pattern("[\w']+")->match("I'm 19 years old")->map(function (Match $match) {
    return strlen($match->text());
});
```
<!--PHP-->
```php
preg::match_all("/[\w']+/", "I'm 19 years old", $matches);
return array_map(function ($text) {
    return strlen($text);
}, $matches[0]);
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--T-Regx:{return(0)}-->
<!--Result-Value-->

```php
[3, 2, 5, 3]
```

## Variable callbacks

You can invoke `map()` with any valid PHP `callable` which accepts one string parameter (or no parameters) - just 
like [`first()`](match-first.md).

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
pattern("[\w']+")->match("I'm 19 years old")->map('strtoupper');
```
<!--PHP-->
```php
preg::match_all("/[\w']+/", "I'm 19 years old", $matches);
return array_map('strtoupper', $matches[0]);
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--T-Regx:{return(0)}-->
<!--Result-Value-->

```php
["I'M", "19", "YEARS", "OLD"]
```

## Arbitrary return types

Again, just like [`first()`](match-first.md), this method can return values of any type, including: objects, arrays, 
booleans and `null`.

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
pattern("[\w']+")->match("I'm 19 years old")->map('str_split');
```
<!--PHP-->
```php
preg::match_all("/[\w']+/", "I'm 19 years old", $matches);
return array_map('str_split', $matches[0]);
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--T-Regx:{return(0)}-->
<!--Result-Value-->

```php
[
  ['I', '\'', 'm'], 
  ['1', '9'], 
  ['y', 'e', 'a', 'r', 's'], 
  ['o', 'l', 'd']
]
```
<!--Result-Value:{return-semi}-->

## `flatMap()`

You can just as easily create a flattened map.

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
pattern("[\w']+")->match("I'm 19 years old")->flatMap('str_split');
```
<!--PHP-->
```php
preg::match_all("/[\w']+/", "I'm 19 years old", $matches);
return array_merge(...array_map('str_split', $matches[0]));
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--T-Regx:{return(0)}-->
<!--Result-Value-->

```php
[
  'I', '\'', 'm', '1', '9', 'y', 'e', 'a', 'r', 's', 'o', 'l', 'd'
]
```
<!--Result-Value:{return-semi}-->

Read more about [`flatMap()`](match-flat-map.md) on the next page.
