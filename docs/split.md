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

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
pattern('[ ,]{2}')->split('Cersei, Joffrey, Ilyn Payne, The Hound')->ex();
```
<!--PHP-->
```php
preg::split('/[ ,]{2}/', 'Cersei, Joffrey, Ilyn Payne, The Hound');
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--Result-Value-->

```php
['Cersei', 'Joffrey', 'Ilyn Payne', 'The Hound']
```

## Including the delimiter

Splitting a string, while including a delimiter is done using `inc()` method:

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
pattern('([ ,]{2})')->split('Cersei, Joffrey, Ilyn Payne, The Hound')->inc();
```
<!--PHP-->
```php
preg::split('/([ ,]{2})/', 'Cersei, Joffrey, Ilyn Payne, The Hound', -1, PREG_SPLIT_DELIM_CAPTURE);
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--Result-Value-->

```php
['Cersei', ', ', 'Joffrey', ', ', 'Ilyn Payne', ', ', 'The Hound']
```

## Filtering out empty values

If a delimiter appears twice in a subject without any characters in between - an empty string would be returned 
in that place:

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
pattern(',')->split('One,Two,,Three')->ex();
```
<!--PHP-->
```php
preg::split('/,/', 'One,Two,,Three');
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--Result-Value-->

```php
['One', 'Two', '', 'Three'];
//             ↑ 
//             empty string between delimiters
```
<!--Result-Value:{return-at(first)}-->

To avoid that, you can use `filter()->ex()` or `filter()->inc()` which utilize [`PREG_SPLIT_NO_EMPTY`][1] flag to filter out
empty strings:

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
pattern(',')->split('One,Two,,Three')->filter()->ex();
```
<!--PHP-->
```php
preg::split('/,/', 'One,Two,,Three', -1, PREG_SPLIT_NO_EMPTY);
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--Result-Value-->

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

This is because of [`preg_split()`][1] flag [`PREG_SPLIT_NO_EMPTY`][1] bad design. 

It promises to include the delimiter, but unfortunately, does so **only** with the part of the delimiter that's inside 
a capturing group. If there's no capturing group in the pattern, [`PREG_SPLIT_DELIM_CAPTURE`][1] has no effect 
(which makes no sense for us).

For that reason (and for the sake of [explicity](whats-the-point.md#t-regx-to-the-rescue)) - T-Regx won't allow you to use 
`split()->inc()` with a pattern that lacks an explicit capturing group:

 - To exclude the delimiter: use `ex()`
 - To include the delimiter: use `inc()` and add a capturing group:
   
   ```php
   pattern('(,)')->split('Cersei, Joffrey, Ilyn Payne, The Hound')->inc();
   //        ↑ 
   //        explicit capturing group
   ```

[1]: https://www.php.net/manual/en/function.preg-split.php
