---
id: replace-with
title: Replace with a constant value
---

After `replace()`, you need to explicitly use one of `first()`/`all()`/`only(int)` methods, to express how many
replacements should be done.

## Replace first

```php
$subject = 'I like Scandinavia: Sweden, Norway and Denmark'; 

pattern('[A-Z][a-z]+')->replace($subject)->first()->with('XXX');
```
```php
'I like Scandinavia: XXX, Norway and Denmark'
```

## Replace more

### `all()`

```php
$subject = 'I like Scandinavia: Sweden, Norway and Denmark'; 

pattern('[A-Z][a-z]+')->replace($subject)->all()->with('XXX');
```
```php
'I like Scandinavia: XXX, XXX and XXX'
```

### `only()`

```php
$subject = 'I like Scandinavia: Sweden, Norway and Denmark'; 

pattern('[A-Z][a-z]+')->replace($subject)->only(2)->with('XXX');
```
```php
'I like Scandinavia: XXX, XXX and Denmark'
```

---

Read on to learn more about replacing with [a callback](replace-callback.md).

## Regular expression references

Normally, had you passed a replacement to `preg_replace()`, that contains a backslash or a dollar sign followed by a 
number (eg. `\1` or `$2`) - that reference would be replaced by a corresponding capturing group (or by an empty string, 
if the group wasn't matched).

```php
preg::replace('/(\d+)cm/', '<$1>', 'I have 15cm and 192cm');
```
```text
I have <15> and <192>
```

Resolving such references won't happen with T-Regx.
 
This is done to relieve you from the [**brain strain**](overview.md#brain-strain). A programmer should be able to merely 
replace a string with a constant value without cognitive load about possible `\` or `$` hiding somewhere.

```php
pattern('(\d+)cm')->replace('I have 15cm and 192cm')->all()->with('<$1>');
```
```text
I have <$1> and <$1>
```

You can be sure, what's put into `with()` will certainly be present unchanged in your final result.

Some replacement strings containing a backslash or a dollar sign (like file system paths, URL addresses or even user input) 
might interfere with logic and cause bugs that are very hard to find.

> Neither of types of references are resolved: `$12`, `\12` nor `${12}`.

## Intentional references

If you, however, would like to intentionally use regular expression references and have validated your input 
against *an unexpected* `\` or `$` - feel free to use `withReferences()` which **will** resolve replacement references.

```php
pattern('(\d+)cm')->replace('I have 15cm and 192cm')->all()->withReferences('<$1>');
```
```text
I have <15> and <192>
```
