---
id: match-for-each
title: Iterate/For Each
---

It's possible to easily iterate matched occurrences with `forEach()`.

## Iterate with `forEach()`

You can call `forEach()` with a callback that's invoked with [`Match`](match-details.md) details just like 
[`first()`](match-first.md) and [`forFirst()`](match-for-first.md).

```php
pattern('[0-9]+')->match("I'm 19 years old")->forEach(function (Match $m) {
    echo 'I matched' . $m->text();
});
```

## PHP Support

Unfortunately, only since PHP 7.0 you can use keywords like `foreach` for method names.

### Use `iterate()`

That's why T-Regx also has a method called `iterate()` which works exactly like `forEach()`, and can be used for pre 
PHP 7.0 environments:

```php
pattern('[0-9]+')->match("I'm 19 years old")->iterate(function (Match $m) {
    echo 'I matched' . $m->text() . ' at offset ' . $m->offset();
});
```
