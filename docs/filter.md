---
id: filter
title: Filter an array
---

Filtering an array, returns a new array with only the values that match the pattern.

Available methods for `pattern()->forArray()` are:
 - [`filter()`](#filter-a-regular-array) - filters an array by values (regular array)
 - [`filterAssoc()`](#filter-an-associative-array) - filters an array by values, preserving keys (associative array)
 - [`filterByKeys()`](#filter-by-keys) - filters an array by keys

## Filter a regular array

Method `filter()` filters an array and returns values **re-indexed** to match the removed elements (unlike `array_filter()`).

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
pattern('[A-Z][a-z]+$')
    ->forArray([
        'Mark',
        'Robert',
        'lorem impsum',
        'Jane',
        'FooBar123'
    ])
    ->filter();
```
<!--PHP-->
```php
$input = [
    'Mark',
    'Robert',
    'lorem impsum',
    'Jane',
    'FooBar123'
];
array_values(preg::grep("/[A-Z][a-z]+$/", $input));
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--T-Regx:{return(first)}-->
<!--PHP:{return(last)}-->
<!--Result-Value-->

```php
['Mark', 'Robert', 'Jane']
```

More precisely it returns `[0 => 'Mark', 1 => 'Robert', 2 => 'Jane']`, even though original key for `'Jane'` was `3`.

## Filter an associative array

Method `filterAssoc()` works similarly to `filter()`, but it preserves the array keys:

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
pattern('[A-Z][a-z]+$')
    ->forArray([
        'm' => 'Mark',
        'r' => 'Robert',
        'l' => 'lorem impsum',
        'j' => 'Jane',
        's' => 'FooBar123'
    ])
    ->filterAssoc();
```
<!--PHP-->
```php
$input = [
    'm' => 'Mark',
    'r' => 'Robert',
    'l' => 'lorem impsum',
    'j' => 'Jane',
    's' => 'FooBar123'
];
preg::grep("/[A-Z][a-z]+$/", $input);
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--T-Regx:{return(first)}-->
<!--PHP:{return(last)}-->
<!--Result-Value-->

```php
['m' => 'Mark', 'r' => 'Robert', 'j' => 'Jane']
```

## Filter by keys

With `filter()` and `filterAssoc()`, only array values are being used to filter the array. With `filterByKeys()`, it's the array keys that are used to filter the array. The corresponding values (which can be of type `mixed`) are returned unchanged:

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
pattern('[A-Z][a-z]+$')
    ->forArray([
        'Mark'          => 'm',
        'Robert'        => 'r',
        'lorem impsum'  => 'l',
        'Jane'          => 'j',
        'FooBar123'     => 'f'
    ])
    ->filterByKeys();
```
<!--PHP-->
```php
$input = [
    'Mark'         => 'm',
    'Robert'       => 'r',
    'lorem impsum' => 'l',
    'Jane'         => 'j',
    'FooBar123'    => 'f'
];
$filteredKeys = preg::grep("/[A-Z][a-z]+$/", array_keys($input));
array_intersect_key($input, array_flip($filteredKeys));
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--T-Regx:{return(first)}-->
<!--PHP:{return(last)}-->
<!--Result-Value-->

```php
['Mark' => 'm', 'Robert' => 'r', 'Jane' => 'j']
```
