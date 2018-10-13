---
id: match
title: Match
---

## Test against a subject

If you only need to check whether a subject is matched by a pattern at least once use:

```php
pattern('[0-9]+')->matches("I'm 19 years old");
```

Or you can check whether is not matched by the pattern, not even once.

```php
pattern('[0-9]+')->fails("I'm 19 years old");
```

## Retrieve matches

```php
pattern('[0-9]+')->match("I'm 19 years old, I was born in 1999, on July 12")->all();
```
```bash
['19', '1999', '12']
```

You can also limit your matches

```php
pattern('[0-9]+')->match("I'm 19 years old")->only(2);
```
```bash
['19', '1999']
```
