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

```php
$subject = 'I like Scandinavia: Sweden, Norway and Denmark'; 

pattern('[A-Z][a-z]+')->replace($subject)->first()->callback(function (Match $m) {
    return strtoupper($m->text());
});
```
```php
'I like Scandinavia: SWEDEN, Norway and Denmark'
```

> Of course, the callback is only invoked **if** your subject is matched with the pattern.

## Replace more

### `all()`

```php
$subject = 'I like Scandinavia: Sweden, Norway and Denmark'; 

pattern('[A-Z][a-z]+')->replace($subject)->all()->callback(function (Match $m) {
   return strtoupper($m->text());
});
```
```php
'I like Scandinavia: SWEDEN, NORWAY and DENMARK'
```

### `only()`

```php
$subject = 'I like Scandinavia: Sweden, Norway and Denmark'; 

pattern('[A-Z][a-z]+')->replace($subject)->only(2)->callback('strtoupper');
```
```php
'I like Scandinavia: SWEDEN, NORWAY and Denmark'
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
    return strval(2);                // ok
    return true ? 'true' : 'false';  // ok
    return (string) $match;          // ok
    return null ? '' : $something;   // ok
});
```

## Variable callbacks

You can call `replace()->callback()` for any valid PHP `callable` which accepts one string parameter (or no parameters) 
and returns `string`.

```php
pattern('\w+')->replace('Apples are cool')->first()->callback('strtoupper');
```
```php
'APPLES are cool'
```

> In this example `Match` will be cast to string, which is the same as calling `Match.text()` method.
