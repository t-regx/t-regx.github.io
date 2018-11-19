---
id: split
title: Split a string
---

T-Regx also allows to split a string by regular expression. You need to explicitly specify whether to:
 - Include a delimiter or not
 - Filter out empty cuts or not

To include a delimiter while splitting a string use `inc()`. To exclude it, use `ex()`. To filter out empty cuts, prepend
`ex()`/`inc()` with chained `filter()`.

## Excluding the delimiter

Splitting a string, while excluding a delimiter is done using `ex()` method:
```php
pattern('[ ,]{2}')->split('Cersei, Joffrey, Ilyn Payne, The Hound')->ex();
```
```php
['Cersei', 'Joffrey', 'Ilyn Payne', 'The Hound']
```

## Including the delimiter

Splitting a string, while including a delimiter is done using `inc()` method:
```php
pattern('([ ,]{2})')->split('Cersei, Joffrey, Ilyn Payne, The Hound')->inc();
```
```php
['Cersei', ', ', 'Joffrey', ', ', 'Ilyn Payne', ', ', 'The Hound']
```

## Filtering out empty values

If a delimiter appears twice in a subject without any characters in between - an empty string would be returned 
in that place:

```php
pattern(',')->split('One,Two,,Three')->ex();
```
```php
['One', 'Two', '', 'Three'];
//             ↑ 
//             empty string between delimiters
```

To avoid that, you can use `filter()->ex()` or `filter()->inc()` which utilize `PREG_SPLIT_NO_EMPTY` flag to filter out
empty strings:

```php
pattern(',')->split('One,Two,,Three')->filter()->ex();
```
```php
['One', 'Two', 'Three'];
```

## Cleaning the mess after PHP

If `split()->inc()` is used, but without any [capturing group](match-groups.md):

```php
pattern(',')->split('Cersei, Joffrey, Ilyn Payne, The Hound')->inc();
//       ↑ 
//       no capturing group
```
...then `MissingSplitDelimiterGroupException` will be thrown. 

This is because of `preg_split()` flag `PREG_SPLIT_DELIM_CAPTURE` bad design. 

It promises to include the delimiter, but unfortunately, does so **only** with the part of the delimiter that's inside 
a capturing group. If there's no capturing group in the pattern, `PREG_SPLIT_DELIM_CAPTURE` has no effect 
(which makes no sense for us).

For that reason (and for the sake of [explicity](whats-the-point#t-regx-to-the-rescue)) - T-Regx won't allow you to use 
`split()->inc()` with a pattern that lacks an explicit capturing group:

 - To exclude the delimiter: use `ex()`
 - To include the delimiter: use `inc()` and add a capturing group:
   
   ```php
   pattern('(,)')->split('Cersei, Joffrey, Ilyn Payne, The Hound')->inc();
   //        ↑ 
   //        explicit capturing group
   ```
