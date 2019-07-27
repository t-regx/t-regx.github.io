---
id: replace-callback
title: Replace with callback
---

After `replace()`, you need to explicitly use one of `first()`/`all()`/`only(int)` methods, to express how many
replacements should be done.

Callback passed to `replace()->callback()` will only be invoked:
 - for `all()` - as many times as there are occurrences matched in the subject.
 - for `only(int)` - the same as `all()`, but up to an `int` limit.
 - for `first()` - once if an occurrence is matched; or not at all if it's not.

## Replace first

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
$subject = 'I like scandinavia: Sweden, Norway and Denmark'; 

pattern('[A-Z][a-z]+')->replace($subject)->first()->callback(function (Match $m) {
    return strtoupper($m->text());
});
```
<!--PHP-->
```php
$subject = 'I like scandinavia: Sweden, Norway and Denmark'; 

preg::replace_callback('/[A-Z][a-z]+/', function (array $m) {
    return strtoupper($m[0]);
}, $subject, 1);
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--T-Regx:{return-at(2)}-->
<!--PHP:{return-at(2)}-->
<!--Result-Value-->

```php
'I like scandinavia: SWEDEN, Norway and Denmark'
```

> Of course, the callback is only invoked **if** your subject is matched with the pattern.

## Replace more

### `all()`

Replacing all matched occurrences is the most common use-case:

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
$subject = 'I like scandinavia: Sweden, Norway and Denmark'; 

pattern('[A-Z][a-z]+')->replace($subject)->all()->callback(function (Match $m) {
    return strtoupper($m->text());
});
```
<!--PHP-->
```php
$subject = 'I like scandinavia: Sweden, Norway and Denmark'; 

preg::replace_callback('/[A-Z][a-z]+/', function (array $m) {
    return strtoupper($m[0]);
}, $subject);
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--T-Regx:{return-at(2)}-->
<!--PHP:{return-at(2)}-->
<!--Result-Value-->

```php
'I like scandinavia: SWEDEN, NORWAY and DENMARK'
```

### `only()`

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
$subject = 'I like scandinavia: Sweden, Norway and Denmark'; 

pattern('[A-Z][a-z]+')->replace($subject)->only(2)->callback('strtoupper');
```
<!--PHP-->
```php
$subject = 'I like scandinavia: Sweden, Norway and Denmark'; 

// This code is actually impossible in Vanilla-PHP.
// In T-Regx, Match details can be cast to string - that's the matched text
// In Vanilla, $match is an array, which won't cast to string that easily

// preg::replace_callback('/[A-Z][a-z]+/', 'strtoupper', $subject, 2);

preg::replace_callback('/[A-Z][a-z]+/', function (array $m) {
    return strtoupper($m[0]);
}, $subject, 2);
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--T-Regx:{return-at(last)}-->
<!--PHP:{return-at(8)}-->
<!--Result-Value-->

```php
'I like scandinavia: SWEDEN, NORWAY and Denmark'
```

## Return types

`replace()->callback()` only accepts `string` as it's return type. 

We believe that returning anything, that's not a string can **be a sign of a bug**! Moreover, converting them silently 
would break our ["Explicity rule"](whats-the-point#t-regx-to-the-rescue).

```php
pattern('\w+')->replace("Apples are cool")->first()->callback(function (Match $match) {
    return 2;       // <- throws InvalidReturnValueException
    return true;    // <- throws InvalidReturnValueException
    return $match;  // <- throws InvalidReturnValueException
    return null;    // <- throws InvalidReturnValueException
});
```

### Explicit string

If you'd like to replace an occurrence with a numeric value (for example `'12'`), an empty string or `'true'`/`'false'` 
literals - just return them **explicitly**.

```php
pattern('\w+')->replace("Apples are cool")->first()->callback(function (Match $match) {
    return strval(2);                          // ok
    return true ? 'true' : 'false';            // ok
    return (string) $match;                    // ok
    return null ? '' : $something;             // ok
    return $match->group('captured');          // ok, if group exists and was matched
    return $match->group('captured')->text();  // ok, if group exists and was matched
});
```

## Variable callbacks

You can call `replace()->callback()` for any valid PHP `callable` which accepts one string parameter (or no parameters) 
and returns `string`.

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
pattern('\w+')->replace('Apples are cool')->first()->callback('strtoupper');
```
<!--PHP-->
```php
// This code is actually impossible in Vanilla-PHP.
// In T-Regx, Match details can be cast to string - that's the matched text
// In Vanilla, $match is an array, which won't cast to string that easily

// preg::replace_callback('/\w+/', 'strtoupper', $subject, 1);

preg::replace_callback('/\w+/', function (array $m) {
    return strtoupper($m[0]);
}, 'Apples are cool', 1);
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--PHP:{return-at(-3)}-->
<!--Result-Value-->

```php
'APPLES are cool'
```

> In this example, [`Match`](match-details.md) will be cast to string, which is the same as calling `Match.text()` method.
