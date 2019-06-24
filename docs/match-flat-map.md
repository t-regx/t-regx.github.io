---
id: match-flat-map
title: Map with keys (Flat map)
---

There are cases when you would like to create a single list of all your matches. `flatMap()` is great for it.

## Making a flat map

Method `flatMap()` is basically method `map()`, from which you can return multiple values.

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
pattern('\w+')->match('I have 19 trains')->flatMap(function (Match $match) {
    return [
        $match->text(), strlen($match)
    ];
});
```
<!--PHP-->
```php
preg::match_all("/\w+/", 'I have 19 trains', $matches);
return array_merge(...array_map(function (string $text) {
    return [
        $text, strlen($text)
    ];
}, $matches[0]));
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--T-Regx:{return(0)}-->
<!--Result-Value-->

```php
['I', 1, 'have', 4, '19', 2, 'trains', 6]
```

## Return types

`flatMap()` only accepts an `array` as its return type. Returning a single element and implicitly creating a one-element 
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
['I', '\'', 'm', '1', '9', 'y', 'e', 'a', 'r', 's', 'o', 'l', 'd']
```

The [`callable`](https://www.php.net/manual/en/language.types.callable.php) passed to `flatMap()` must return an array. 
`InvalidReturnValueException` is thrown, otherwise.

## Mapping with keys

Because `flatMap()` receives an array from its callback, it's possible to also return an associative array with
specified keys:

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
pattern("\w+")->match("Apples are cool")->flatMap(function (Match $match) {
    return [$match->text() => $match->offset()];   // offset is UTF-8 safe
});
```
<!--PHP-->
```php
preg::match_all("/\w+/", "Apples are cool", $matches, PREG_OFFSET_CAPTURE);
return array_merge(...array_map(function (array $match) {
    return [$match[0] => $match[1]];    // offset is given in bytes
}, $matches[0]));
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--T-Regx:{return(0)}-->
<!--Result-Value-->

```php
[
    'Apples' => 0,
    'are'    => 7,
    'cool'   => 11
]
```
<!--Result-Value:{return-semi}-->

> Keep in mind that `flatMap()` uses `array_merge()` to flatten the results! So If you use `int` as a key, or even
a `string` with numeric values (like `'19'`) they will be **reindexed** by `array_merge()`.

> `Match.offset()` returns offset as a [valid UTF-8 sequence](match-details.md#offsets), whereas `preg::match_all` 
> counts them as [bytes](match-details.md#offsets). To return bytes number with T-Regx as well, 
> use [`byteOffset()`](match-details.md#offsets).

## Duplicate keys

Duplicate keys are not allowed in PHP arrays, so they'll only appear once in the results.

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
pattern("\w+")->match("Apples are cool")->flatMap(function (Match $match) {
    return [
        $match->text() => $match->offset(),   // offset is UTF-8 safe
        'subject'      => $match->subject()
    ];
});
```
<!--PHP-->
```php
$subject = 'Apples are cool';
preg::match_all("/\w+/", $subject, $matches, PREG_OFFSET_CAPTURE);
return array_merge(...array_map(function (array $match) use ($subject) {
    return [
        $match[0] => $match[1],   // offset is given in bytes
        'subject' => $subject
    ];   
}, $matches[0]));
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--T-Regx:{return(0)}-->
<!--Result-Value-->

```php
[
    'Apples'  => 0,
    'subject' => "Apples are cool",
    'are'     => 7,
    'cool'    => 11
]
```
<!--Result-Value:{return-semi}-->
