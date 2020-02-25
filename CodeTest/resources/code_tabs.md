---
id: delimiters
title: Automatic delimiters
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 

```php
pattern('[A-Z][a-z]+')->match($subject)->first();
```

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 

```php
pattern('[A-Z][a-z]+')->match($subject)->first();
```

## Is pattern delimited

You can check whether a pattern is delimited with `is()->delimited()` method.

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
pattern('[A-Z][a-z]+')->is()->delimitered();
pattern('#[A-Z][a-z]+#')->is()->delimitered();
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--T-Regx:{multiline-return}-->
<!--Result-Value-->

```php
false
true
```
<!--Result-Value:{multiline-return}-->

## Adding delimiters

To change undelimited pattern into a delimited one - use `delimiter()` method;

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
pattern('Welcome/Or not')->delimiter();
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--T-Regx:{echo-at(0)}-->
<!--Result-Output-->

```text
#Welcome/Or not#
```

## Flags

Either pass a second argument to the [`pattern()`](introduction.md#entry-points)/[`Pattern::of()`](introduction.md#entry-points):

```php
pattern('[A-Z][a-z]+', 'i')->match($subject)->first();
```

or use a regular delimited pattern with a flag:

```php
pattern('/[A-Z][a-z]+/i')->match($subject)->first();
```

## I want to break it

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.