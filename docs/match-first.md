---
id: match-first
title: Get the first match
---

Matching a first occurrence in a string is the most common usecase.

```php
pattern('[0-9]+')->match("I'm 19 years old")->first();
```

If a match is not found in a subject, `SubjectNotMatchedException` is thrown. This is done to relieve you of 
**cognitive stress**. It's much easier to develop an application and *just assume* that this method **has** to return
a value and go on. No more bothering  with empty arrays or possible `null`/`false` hiding somewhere.

If you would like to control what should be done if the subject isn't matched by your pattern though, 
you can do it **explicitly** with `forFirst()`.

## `forFirst()`

This method allows you to explicitly specify how to handle an unmatched subject. Just chain `forFirst()` with
one of the following `orReturn()`, `orElse` or `orThrow()`.

```php
$func = function () {
    return 'Yay';
};

echo pattern('\w+')->match('Dog')->forFirst($func)->orReturn('Aw, man :/');
```
```bash
Yay
```

Read on to learn more about [`forFirst()`](match-for-first.md)
