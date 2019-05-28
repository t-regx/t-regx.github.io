---
id: filter
title: Filter an array
---

Filtering an array, returns a new array with only the values that match the pattern.

## Filter a regular array

Method `filter()` filters an array and returns values **re-indexed** to match the removed elements (like `array_filter()`).

```php
$input = [
     'Mark',
     'Robert',
     'asdf',
     'Jane',
     'Stan123'
];
pattern('[A-Z][a-z]+$')->forArray($input)->filter();
```
```php
['Mark', 'Robert', 'Jane']
```

More precisely it returns `[0 => 'Mark', 1 => 'Robert', 2 => 'Jane']`, even though original key for `'Jane'` was `3`.

## Filter an associative array

Method `filterAssoc()` works similarly to `filter()`, but it preserves the input keys:

```php
$input = [
     'm' => 'Mark',
     'r' => 'Robert',
     'a' => 'asdf',
     'j' => 'Jane',
     's' => 'Stan123'
];
pattern('[A-Z][a-z]+$')->forArray($input)->filterAssoc();
```
```php
['m' => 'Mark', 'r' => 'Robert', 'j' => 'Jane']
```

## Filter by keys

With `filter()` and `filterAssoc()`, only array values are being used to filter the array. With `filterByKeys()`, it's the array keys that are used to filter the array. The corresponding values (which can be of type `mixed`) are returned unchanged:

```php
$input = [
     'Mark'    => 'm',
     'Robert'  => 'r',
     'asdf'    => 'a',
     'Jane'    => 'j',
     'Stan123' => 's'
];
pattern('[A-Z][a-z]+$')->forArray($input)->filterByKeys();
```
```php
['Mark' => 'm', 'Robert' => 'r', 'Jane' => 'j']
```
