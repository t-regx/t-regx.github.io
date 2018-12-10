---
id: is-valid
title: Validate a pattern
---

## Validating

Validate a pattern is done with `is()->valid()` method.

```php
pattern('/I am a valid pattern/')->is()->valid();
```
```php
true
```

Neither `is()->valid()` nor `is()->usable()` methods throws an exception or issues a warning. They only return `true`/`false`.

```php
pattern('I am an invalid pattern')->is()->valid();
```
```php
false
```

## Usable pattern

Usable pattern is a valid, but not necessarily delimitered pattern. In other words, a usable pattern becomes valid after 
being [automatically delimitered](delimiters.md).

```php
pattern('/I am a usable pattern/')->is()->usable();
```
```php
true
```

The pattern doesn't have to be delimitered.

```php
pattern('I am still a usable pattern')->is()->usable();
```
```php
true
```

But it can't be invalid.

```php
pattern('I am (invalid')->is()->usable();
```
```php
false
```

## Delimitered pattern

Method `is()->delimitered()` is used to verify whether a pattern is delimitered or not.


```php
pattern('#I am delimitered#')->is()->delimitered();
```
```php
true
```

---

```php
pattern('I am not delimitered')->is()->delimitered();
```
```php
false
```

### Exception

Keep in mind, however, that an invalid (delimitered or not) pattern will 
throw `InvalidPatternException` with `is()->delimitered()`.

```php
try {
    pattern('I am (invalid')->is()->delimitered();
}
catch (InvalidPatternException $exception) {

}
```
