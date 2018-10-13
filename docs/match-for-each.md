---
id: match-for-each
title: For Each
---


```php
pattern('[0-9]+')->match("I'm 19 years old")->forEach(function (Match $m) {
    return strlen($m->text());
});
```

Unfortunately, only since PHP 7.0 you can use keywords like `foreach` for method names.
 
That's why T-Regx also has a method
called `iterate()` which works exactly like `forEach()`, and can be used for pre PHP 7.0 environments:

```php
pattern('[0-9]+')->match("I'm 19 years old")->iterate(function (Match $m) {
    return strlen($m->text());
});
```
