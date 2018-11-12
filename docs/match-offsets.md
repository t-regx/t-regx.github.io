---
id: match-offsets
title: Match offsets
---

## Using `Match` details

If you use `Match` details object (like the one passed to `first()`, `forEach()` or `map()` callback) you can just use
`offset()` method.

```php
$offset = pattern('\d+')->match('I was born in 1996')->first(function (Match $match) {
    return 'Match was found at ' . $match->offset();
});
```

> Remember that `offset()` is UTF-8 safe and returns offsets in characters, not bytes. For bytes, consider using `byteOffset()` method.

## Use inline `offsets()` method

### Many

If you only want to get offsets of your matches, use `offsets()->all()`.

```php
pattern('[0-9]+')->match("I'm 19 years old. I was born in 1999, on May 12")->offsets()->all();
```
```php
[4, 32, 45]
```

You can also limit your matches.

```php
pattern('[0-9]+')->match("I'm 19 years old. I was born in 1999, on May 12")->offsets()->only(2);
```
```php
[4, 32]
```

### One

To only get offset of the first occurrence of a matched pattern, call `offsets()->first()`.

```php
pattern('\d+')->match("I was born in 1999")->offsets()->first();
```
```php
14
```

As any other `first()` method, it throws `SubjectNotMatchedException` if the subject isn't matched by your pattern.

## Group offsets

In a similar manner you can get offsets of your capturing groups, either using `Match` details or an inline method.

These two snippets below are equal to each other.

### `Match` details

```php
$offset = pattern('(?<capital>[A-Z])[a-z]+')
    ->match('my name is Jhon Cena')
    ->first(function (Match $match) {
        return $match->group('capital')->offset();
    });
```

### Inline `offsets()` method

```php
pattern('(?<capital>[A-Z])[a-z]+')->match('my name is Jhon Cena')->group('capital')->offsets()->first();
```
```php
11
```

Both `offsets()->first()` and `group()->offsets()->first()` throw `SubjectNotMatchedException` if the subject isn't 
matched by your pattern.
