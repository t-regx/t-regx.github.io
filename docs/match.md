---
id: match
title: Match a subject
---

Using `pattern()->match()` you can:
 - Test a subject against a pattern: [`matches()`](#test-a-subject)/[`fails()`](#test-a-subject)
 - Retrieve matches from the subject: [`first()`](#one)/[`all()`](#many)/[`only()`](#many)
 - Get capturing groups from matches: `group()`/`Match.group()`/`groups()`
 - Invoke callbacks for matches: [`first()`](match-first.md#use-first-with-callback)/[`forFirst()`](match-for-first.md)/[`forEach()`](match-for-each.md)/[`map()`](match-map.md)/[`flatMap()`](match-flat-map.md)

## Test a subject

If you only need to check whether a pattern matches the subject, use

```php
pattern('[0-9]+')->matches("I'm 19 years old");
```

...or to check whether it doesn't.

```php
pattern('[0-9]{3}')->fails("I'm 19 years old");
```

Of course `pattern()->match()` throws an exception if the pattern is invalid (or in case of any other error).

> You can also use `pattern()->match()->matches()` and `pattern()->match()->fails()`.

## Retrieve matches

### Many

You can easily retrieve matched occurrences of a pattern in your subject.

```php
pattern('[0-9]+')->match("I'm 19 years old. I was born in 1999, on May 12")->all();
```
```php
['19', '1999', '12']
```

You can also limit your matches.

```php
pattern('[0-9]+')->match("I'm 19 years old. I was born in 1999, on May 12")->only(2);
```
```php
['19', '1999']
```

### One

To get the first occurrence of a matched pattern, call [`first()`](match-first.md).

```php
pattern('\d+')->match("I'm 19 years old. I was born in 1999")->first();
```
```php
'19'
```

Read on the [next page](match-first.md) to learn more about [`first()`](match-first.md).

## Unmatched subject

### `all()`/`only()`

If you call `all()` or `only()` on a subject that isn't matched with your pattern, you'll receive an empty array.
```php
pattern('\d+')->match('Word')->all();
```
```php
[]
```

### `first()`

If, however, you call `first()` on a subject that isn't matched, `SubjectNotMatchedException` is thrown.

```php
try {
    return pattern('\d+')->match('Word')->first();
}
catch (SujectNotMatchedException $e) {
    // handle
}
```
