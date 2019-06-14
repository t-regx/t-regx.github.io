---
id: match-for-each
title: Iterate/For Each
---

It's possible to easily iterate matched occurrences with `forEach()`.

## Iterate with `forEach()`

You can call `forEach()` with a callback that's invoked with [`Match`](match-details.md) details just like 
[`first()`](match-first.md) and [`forFirst()`](match-for-first.md).

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
pattern('\w+')->match('Apples are cool')->forEach(function (string $text) {
    echo "I matched $text";
});
```
<!--PHP-->
```php
if (preg::match_all('/\w+/', 'Apples are cool', $matches)) {
    foreach ($matches[0] as $text) {
        echo "I matched $text";
    }
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

> Of course, `forEach()` accepts [Match](match-details.md) details, but [Match](match-details.md) can be cast to `(string)`.

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
