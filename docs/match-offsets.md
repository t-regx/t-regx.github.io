---
id: match-offsets
title: Match offsets
---

There are several ways to read offsets of your matched occurrences and your capturing groups.

## Using `Match` details

If you use [`Match`](match-details.md) details object (like the one passed to `first()`, `forEach()` or `map()` callback) you can just use
`offset()` method.

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
pattern('\d+')->match('I was born in 1996')->first(function (Match $match) {
    return 'Match was found at ' . $match->offset();
});
```
<!--PHP-->
```php
preg::match_all('/\d+/', 'I was born in 1996', $match, PREG_OFFSET_CAPTURE);
return 'Match was found at ' . $match[0][0][1];
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--T-Regx:{return-at(0)}-->
<!--Result-Value-->

```php
'Match was found at 14'
```

> Remember that [`offset()`](match-details.md#offsets) is UTF-8 safe and returns offsets in characters, not bytes. 
> For bytes, consider using [`byteOffset()`](match-details.md#offsets) method.

> Use [`offset()`](match-details.md#offsets) with methods like [`mb_substr()`][1], and [`byteOffset()`](match-details.md#offsets) with methods like [`substr()`][2].

## Using inline `offsets()` method

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

In a similar manner you can get offsets of your capturing groups, either using [`Match`](match-details.md) details or an inline method.

These two snippets below are equal to each other.

### Using `Match` details

```php
$offset = pattern('(?<capital>[A-Z])[a-z]+')
    ->match('my name is Jhon Cena')
    ->first(function (Match $match) {
        return $match->group('capital')->offset();
    });
```
```php
11
```

### Using inline `offsets()` method

```php
pattern('(?<capital>[A-Z])[a-z]+')->match('my name is Jhon Cena')->group('capital')->offsets()->first();
```
```php
11
```

Both `offsets()->first()` and `group()->offsets()->first()` throw `SubjectNotMatchedException` if the subject isn't 
matched by your pattern.

[1]: https://www.php.net/manual/en/function.mb-substr.php
[2]: https://www.php.net/manual/en/function.substr.php
